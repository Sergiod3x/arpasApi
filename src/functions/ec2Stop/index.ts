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
				path: 'stopMachine/{machineId}',
				request: {
					parameters: {
						paths: {
							machineId: true,
						},
					}
				},
				authorizer: {
					name: "authorizer",
					type: "token",
					identitySource: "method.request.header.Authorization",
					identityValidationExpression: "Bearer (.*)",
					resultTtlInSeconds: 0,
				},
			}
		},
	],
};


