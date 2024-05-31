import type { AWS } from "@serverless/typescript";

import ec2Start from "@functions/ec2Start";

const DEFAULT_STAGE = "dev";
const DEFAULT_REGION = "eu-west-1";

const serverlessConfiguration: AWS = {
  service: "arpasApi",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-webpack"],
  provider: {
    name: "aws",
    stage: "${opt:stage, self:custom.defaultStage}",
    region: "eu-west-1",
    runtime: "nodejs16.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  functions: {
    ec2Start,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node18",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
      external: ["ssh2-sftp-client"],
    },
    package: {
      individually: true,
    },
    defaultStage: DEFAULT_STAGE,
    defaultRegion: DEFAULT_REGION,
  },
  // @ts-ignore
};

module.exports = serverlessConfiguration;

