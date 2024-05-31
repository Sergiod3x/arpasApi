const AWS = require('aws-sdk');
const ec2 = new AWS.EC2();

export const call: any = async (_event, _context, _callbackent): Promise<any> => {
  // let sshPrivateKey = _event.key; 
  // let command = _event.command;
  let instanceId = "i-07ec7be845dc07a6e";


  const params = {
    InstanceIds: [instanceId]
  };

  try {
    // Avvia l'istanza EC2
    const data = await ec2.startInstances(params).promise();
    console.log('Success', data.StartingInstances);
    return true;

    // return {
    //   statusCode: 200,
    //   body: JSON.stringify(data)
    // };
  } catch (err) {
    console.log('Error', err);
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    };
  }





};























// import { v4 as uuidv4 } from 'uuid';

// const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');
// const { DynamoDB } = require('@aws-sdk/client-dynamodb');

// let documentClient = DynamoDBDocument.from(new DynamoDB());
// const PROOF_ALIAS = "PROOF"


// export const call: any = async (_event, _context, _callback): Promise<any> => {
//     console.log('in addAddress with ', JSON.stringify(_event));

//     const userId = _event.user
//     console.log('with userId: ', userId);

//     try {
//       //create address to dynamodb
//       var addressParams = {
//           TableName: process.env.TABLE_NAME,
//           Item: {
//               user: userId,
//             //   address: PROOF_ALIAS,
//               chain: _event.chain,
//               alias: PROOF_ALIAS,
//               challenge_uuid: uuidv4(),
//               is_resolved: false             
//           }
//       };
//       console.log('with addressParams: ', addressParams);
//       const addressResult = await documentClient.put(addressParams);
//       console.log('create address with: ', addressResult)
//       return addressParams.Item
//   } catch (err: any) {

//       console.log('with err: ', err);
//       return err.message

//   }

// }