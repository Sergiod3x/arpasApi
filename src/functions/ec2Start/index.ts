import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.call`,
  environment: {
    ACCOUNT_ID: "${aws:accountId}",
  },
  events: [
		{
			http: {
				method: 'get',
				path: 'startMachine/{machineId}',
				request: {
					parameters: {
						paths: {
							machineId: true,
						},
					}
				},
			}
		},
	],
};


