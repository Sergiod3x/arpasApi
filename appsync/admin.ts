import * as AdminModule from "./admin/admin";

export const admin = {
  name: "${self:custom.serviceNameShort}-${self:provider.stage}",
  authenticationType: "AMAZON_COGNITO_USER_POOLS",
//   additionalAuthenticationProviders: [
//     { authenticationType: "AWS_IAM" },
//     { authenticationType: "API_KEY" },
//   ],
//   userPoolConfig: {
//     awsRegion: "${opt:region, self:custom.defaultRegion}",
//     defaultAction: "ALLOW",
//     userPoolId:
//       "${cf:cdk-${self:service}-${self:provider.stage}.CognitoAdminUserPoolId}",
//   },
//   logConfig: {
//     loggingRoleArn:
//       "${cf:cdk-${self:service}-${self:provider.stage}.RoleAppSyncLogs}",
//     level: "ALL",
//     excludeVerboseContent: false,
//   },
  schema: ["schemas/admin/schema.graphql"],
  mappingTemplatesLocation: "dist/mappingTemplates",
  mappingTemplates: [...AdminModule.mappingTemplates],
  dataSources: [...AdminModule.dataSource],
//   substitutions: { ...AdminModule.substitutions },
};