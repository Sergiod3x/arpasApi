const mappingTemplatesPath = "admin/organization";

export const mappingTemplates = [

	{
		field: "startEc2",
		type: "Mutation",
		request: `${mappingTemplatesPath}/Mutation.startEc2.request.vtl`,
		response: `${mappingTemplatesPath}/Mutation.startEc2.response.vtl`,
		dataSource: "ec2Start"
	  },  
	  {
		field: "stopEc2",
		type: "Mutation",
		request: `${mappingTemplatesPath}/Mutation.stopEc2.request.vtl`,
		response: `${mappingTemplatesPath}/Mutation.stopEc2.response.vtl`,
		dataSource: "ec2Stop"
	  },  
	  {
		field: "statusEc2",
		type: "Mutation",
		request: `${mappingTemplatesPath}/Mutation.statusEc2.request.vtl`,
		response: `${mappingTemplatesPath}/Mutation.statusEc2.response.vtl`,
		dataSource: "ec2Status"
	  },  
// 	{
// 		field: "listOrganizations",
// 		type: "Query",
// 		request: `${mappingTemplatesPath}/Query.listOrganizations.request.vtl`,
// 		response: `${mappingTemplatesPath}/Query.listOrganizations.response.vtl`,
// 		dataSource: "organization_datasource",
// 	},
	
	
	
];

export const dataSource = [
	{
		type: "AWS_LAMBDA",
		name: "ec2Start",
		config: {
		  functionName: "ec2Start"
		}
	  },  
	  {
		type: "AWS_LAMBDA",
		name: "ec2Stop",
		config: {
		  functionName: "ec2Stop"
		}
	  },  
	  {
		type: "AWS_LAMBDA",
		name: "ec2Status",
		config: {
		  functionName: "ec2Status"
		}
	  },  
	// {
	// 	type: "AMAZON_DYNAMODB",
	// 	name: "organization_datasource",
	// 	description: "organization_datasource",
	// 	config: {
	// 		tableName: "${cf:${self:service}-${self:provider.stage}-output.DynamoDBTableOrganization}",
	// 		serviceRoleArn: "${cf:${self:service}-${self:provider.stage}-output.AppsyncRole}",
	// 	},
	// },
	// {
	// 	type: "HTTP",
	// 	name: "StepFunctionsDataSource",
	// 	config: {
	// 		endpoint: "https://sync-states.${self:provider.region}.amazonaws.com/",
	// 		serviceRoleArn: "${cf:${self:service}-${self:provider.stage}-output.AppsyncRole}",
	// 		authorizationConfig: {
	// 			authorizationType: "AWS_IAM",
	// 			awsIamConfig: {
	// 				signingRegion: "${self:provider.region}",
	// 				signingServiceName: "states",
	// 			},
	// 		},
	// 	},
	// },
	
];

// export const substitutions = { 
// 	STATEMACHINEARN: "arn:aws:states:${self:provider.region}:${aws:accountId}:stateMachine:add-organization-${self:service}-${self:provider.stage}", 
// LICENSES_MANAGER_STATEMACHINEARN: "arn:aws:states:${self:provider.region}:${aws:accountId}:stateMachine:licenses-manager-${self:service}-${self:provider.stage}",
// };

export const schema = [
	"schemas/admin/schema.graphql"
  ]