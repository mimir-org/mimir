import { Configuration, RedirectRequest } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
    auth: {
        clientId: "0c174c7e-e018-41a2-ba84-3d4b4544a16f",
        authority: "https://login.microsoftonline.com/" + process.env.REACT_APP_TENANT_ID,
        redirectUri: "/",
        postLogoutRedirectUri: "/"
    }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: RedirectRequest = {
    scopes: ["User.Read", "openid", "profile", "api://2967244a-662f-4462-82bd-7f9bca0a3683/access_as_user"]
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
