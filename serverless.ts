import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import appsync from "appsync";
import ec2Stop from '@functions/ec2Stop';
import ec2Status from '@functions/ec2Status';
import ec2Start from '@functions/ec2Start';

const DEFAULT_STAGE = "dev";
const DEFAULT_REGION = "eu-west-1";

const serverlessConfiguration: AWS = {
  service: 'arpasapi',
  frameworkVersion: '3',
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
			{
				Effect: "Allow",
				Action: [
					// "states:*",
					// "dynamodb:query",
					// "dynamodb:getItem",
					// "dynamodb:putItem",
					// "dynamodb:updateItem",
					"dynamodb:*",
					"lambda:*",
					"cognito-idp:*",
					"appsync:*",
					"ec2:*",
					// "ses:SendEmail",
					// "iot:*",
					// "iotsitewise:*",
					// "kms:*",
					// "sns:*"
				],
				Resource: "*",
			},
		],
    stage: "${opt:stage, self:custom.defaultStage}",
		region: "${opt:region, self:custom.defaultRegion}" as any,
		memorySize: 256,
    timeout: 60,
  },
  // import the function via paths
  functions: { 
	hello,
	ec2Start,
	ec2Stop,
	ec2Status
   },
  package: { individually: true },
  plugins: ["serverless-esbuild", "serverless-webpack", "serverless-appsync-plugin", "serverless-step-functions", "serverless-plugin-scripts", "serverless-prune-plugin"],
	// prune: {
	// 	automatic: true,
	// 	number: 5,
	// },
	custom: {
		scripts: {
			hooks: {
				"offline:start:init": 'ejs-cli "mappingTemplates/**/*.vtl" --out dist/',
				"package:initialize": 'ejs-cli "mappingTemplates/**/*.vtl" --out dist/',
			},
		},
		webpack: {
			webpackConfig: "./webpack.config.js",
			includeModules: true,
		},
		appSync: appsync,

		serviceNameShort: "arpasApi",
		serviceCamelCase: "Arpas",
		defaultStage: DEFAULT_STAGE,
		defaultRegion: DEFAULT_REGION,
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: ["aws-sdk"],
			target: "node14",
			define: { "require.resolve": undefined },
			platform: "node",
			concurrency: 10,
		},
	},
};

module.exports = serverlessConfiguration;
