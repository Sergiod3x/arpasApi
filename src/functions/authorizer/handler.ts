const jwt = require("jsonwebtoken");

export const handler = async (event) => {
  let authorizerPublicKey = process.env.authorizerPublicKey;
  console.log("authorizerPublicKey", authorizerPublicKey);

  var effect = "";
  let payload: any = {};

  //retrieve the token from the event
  var token = event.authorizationToken.slice("Bearer ".length);


  try {
    payload = jwt.verify(token, authorizerPublicKey, { algorithm: "RS256" });
    effect = "Allow";
  } catch (error) {
    effect = "Deny";
    console.log(error);
  }

  // get the resource
  var resource = event.methodArn;

  //construct a response which basically it will be a policy
  var authResponse: any = {};
  authResponse.principalId = "user";
  var policyDocument: any = {};
  policyDocument.Version = "2012-10-17";
  policyDocument.Statement = [];
  var statement1: any = {};
  statement1.Action = "execute-api:Invoke";
  statement1.Effect = effect;
  statement1.Resource = resource;
  policyDocument.Statement[0] = statement1;
  authResponse.policyDocument = policyDocument;

  const context = {};
  authResponse.context = context;

  console.log(statement1.Effect);

  // return the response
  return authResponse;
};

export const main = handler;