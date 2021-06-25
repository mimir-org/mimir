import {
    MsalAuthProvider,
    LoginType
} from "react-aad-msal";

const regularScopes = [
    "api://" + process.env.REACT_APP_APP_ID + "/user_impersonation",
    "openid",
    "user.read",
    "profile",
];

const regularMsalConfig = {
    auth: {
        clientId: process.env.REACT_APP_APP_ID,
        authority: "https://login.microsoftonline.com/" + process.env.REACT_APP_TENANT_ID,
        redirectUri: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    },
};

const authenticationParameters = {
    scopes: regularScopes,
};

export const requestParameters = {
    scopes: regularScopes,
    redirectUri: window.location.origin + "/auth.html"
};

const commonMsalOptions = {
    loginType: LoginType.Redirect,
    tokenRefreshUri: window.location.origin + "/auth.html",
};

export const authProvider = new MsalAuthProvider(
    regularMsalConfig,
    authenticationParameters,
    commonMsalOptions
);