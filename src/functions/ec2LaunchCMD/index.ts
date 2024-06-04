import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.call`,
  environment: {
    ACCOUNT_ID: "${aws:accountId}",
    sshPrivateKey: "${cf:demoStack-prod-output.ec2xPrivateKeyC}",
  },
  events: [
		{
			http: {
				method: 'get',
				path: 'ec2cmd/{machineIp}/{user}/{cmd}',
				request: {
					parameters: {
						paths: {
							machineIp: true,
              user: true,
              cmd: true
						},
					}
				},
			}
		},
	],
};