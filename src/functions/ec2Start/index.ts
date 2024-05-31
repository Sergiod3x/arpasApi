import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.call`,
  environment: {
    ACCOUNT_ID: "${aws:accountId}",
    sshPrivateKey: "privatissima",
    // sshPrivateKey:
    //   "${cf:${self:service}-${self:provider.stage}-output.SSMMoonwardKey}",
    // TABLE_NAME: "${cf:${self:service}-${self:provider.stage}-output.DynamoDBTableAddress}"
  },
  // role: "${cf:${self:service}-${self:provider.stage}-output.IAMLambdaProxyRole}",
  // vpc: {
  //   securityGroupIds: [
  //     "${cf:${self:service}-${self:provider.stage}-output.SGLambdaProxy}",
  //   ],
  //   subnetIds: [
  //     "${cf:${self:service}-${self:provider.stage}-output.SubnetLambdaProxy1aPrivate}",
  //     "${cf:${self:service}-${self:provider.stage}-output.SubnetLambdaProxy1bPrivate}",
  //   ],
  // },
  events: [
		{
			http: {
				method: 'get',
				path: 'startMachine',
				request: {
					parameters: {
						paths: {
							serial: false,
						},
					}
				},
			}
		},
	],
};


