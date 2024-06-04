import { handlerPath } from "@libs/handler-resolver";



export default {
  handler: `${handlerPath(__dirname)}/handler.call`,
  environment: {
    ACCOUNT_ID: "${aws:accountId}",
    sshPrivateKey: "${cf:${self:service}-${self:provider.stage}-output.Ec2PrivateKey}",
  },
  events: [
    {
      http: {
        method: "get",
        path: "ec2cmd/{machineIp}/{user}/{cmd}",
        request: {
          parameters: {
            paths: {
              machineIp: true,
              user: true,
              cmd: true,
            },
          },
        },
        authorizer: {
          name: "authorizer",
          type: "token",
          identitySource: "method.request.header.Authorization",
          identityValidationExpression: "Bearer (.*)",
          resultTtlInSeconds: 0,
        },
      },
    },
  ],
};
