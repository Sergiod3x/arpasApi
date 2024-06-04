import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    authorizerPublicKey:
      "${cf:${self:service}-${self:provider.stage}-output.AuthorizerPublicKey}",
  },
  events: [],
};
