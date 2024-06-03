import { handlerPath } from '@libs/handler-resolver';
// import pem from "./keys/key.pem";
import * as path from 'path';
const fs = require('fs')

const privateKeyPath = path.resolve(__dirname, './keys/key.pem');
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

// const keyFilePath = path.join("/tmp", "key.pem")

export default {
  handler: `${handlerPath(__dirname)}/handler.call`,
  environment: {
    ACCOUNT_ID: "${aws:accountId}",
    sshPrivateKey: privateKey,
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