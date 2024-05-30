import * as AdminModule from "./admin/admin";

export const admin = {
	name: "${self:custom.serviceNameShort}-${self:provider.stage}",
	authenticationType: "AMAZON_COGNITO_USER_POOLS",mn