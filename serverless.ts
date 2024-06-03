import hello from "@functions/hello";
import type { AWS } from "@serverless/typescript";

// import ec2Start from "@functions/ec2Start";
// import ec2Stop from "@functions/ec2Stop";
// import ec2Reboot from "@functions/ec2Reboot";
import ec2LaunchCMD from "@functions/ec2LaunchCMD";

const DEFAULT_STAGE = "dev";
const DEFAULT_REGION = "eu-west-1";

const serverlessConfiguration: AWS = {
  service: "arpasApi",
  frameworkVersion: "3",
  plugins: ["serverless-webpack","simple-ssh"],
  provider: {
    name: "aws",
    stage: "${opt:stage, self:custom.defaultStage}",
    region: "eu-west-1",
    runtime: "nodejs16.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              // "dynamodb:*",
              "lambda:*",
              // "cognito-idp:*",
              // "appsync:*",
              "ec2:*",
            ],
            Resource: "*",
          }
        ]
      }
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  functions: {
    hello,
    // ec2Start,
    // ec2Stop,
    // ec2Reboot,
    ec2LaunchCMD
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node16",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
      external: ["simple-ssh"],
    },
    webpack: {
			webpackConfig: "./webpack.config.js",
			includeModules: true,
		},
    //   packager: 'yarn',
    // },
    package: {
      individually: true,
      include: [
        "node_modules/cpu-features/build/Release/cpufeatures.node",
        "node_modules/ssh2/lib/protocol/crypto/build/Release/sshcrypto.node"
      ],
    },
    defaultStage: DEFAULT_STAGE,
    defaultRegion: DEFAULT_REGION,
  },
};

module.exports = serverlessConfiguration;
