import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    authorizerPublicKey: "${cf:demoStack-prod-authorizerKey.}",
  },
  events: [],
};