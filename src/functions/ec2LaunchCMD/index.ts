import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.call`,
  environment: {
    sshPrivateKey:
      "${cf:${self:service}-${self:provider.stage}-output.SSMMoonwardKey}",
    bucketInput:
      "${cf:${self:service}-${self:provider.stage}-output.S3BucketPaymentProviderUpload}",
  },
  role: "${cf:${self:service}-${self:provider.stage}-output.IAMLambdaProxyRole}",
  vpc: {
    securityGroupIds: [
      "${cf:${self:service}-${self:provider.stage}-output.SGLambdaProxy}",
    ],
    subnetIds: [
      "${cf:${self:service}-${self:provider.stage}-output.SubnetLambdaProxy1aPrivate}",
      "${cf:${self:service}-${self:provider.stage}-output.SubnetLambdaProxy1bPrivate}",
    ],
  },
  events: [
    {
      http: {
        method: 'put',
        path: '/',
        integration: 'lambda'
      }
    },
  ],
};