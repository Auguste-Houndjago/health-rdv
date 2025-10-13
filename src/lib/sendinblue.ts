import SibApiV3Sdk from "sib-api-v3-sdk";

declare global {
  // On déclare la variable globale pour TypeScript
  var sendinblueClient: SibApiV3Sdk.ApiClient | undefined;
}

// On utilise le singleton global
export const sendinblueClient = global.sendinblueClient || (() => {
  const client = SibApiV3Sdk.ApiClient.instance;
  client.authentications["api-key"].apiKey = process.env.SENDINBLUE_API_KEY;
  
  // @ts-ignore
  if (process.env.NODE_ENV !== "production") global.sendinblueClient = client;

  return client;
})();
