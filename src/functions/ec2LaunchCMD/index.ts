import { handlerPath } from '@libs/handler-resolver';
// import type { AWS } from "@serverless/typescript";
// import * as path from 'path';
// const fs = require('fs')

// const privateKeyPath = path.resolve(__dirname, '../../keys/key.pem');
// const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

// const decryptedAuthorizedPrivateKey = (
//   await ssm
//     .getParameter({
//       Name: authorizerPrivateKey,
//       WithDecryption: true,
//     })
//     .promise()
// ).Parameter.Value;

// console.log("${cf:${self:service}-${self:provider.stage}-output.demoStack-prod-ec2xPrivateKeyC}")

export default {
  handler: `${handlerPath(__dirname)}/handler.call`,
  environment: {
    ACCOUNT_ID: "${aws:accountId}",
    // sshPrivateKey: AWS,
    // sshPrivateKey: privateKey,
    sshPrivateKey: "${cf:${self:service}-${self:provider.stage}-output.ec2xPrivateKeyC}",
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