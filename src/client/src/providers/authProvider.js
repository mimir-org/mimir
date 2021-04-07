import { MsalAuthProvider, LoginType } from 'react-aad-msal';

// 'api://xxx/user_impersonation'
const regularScopes = [ "openid","user.read", "profile"];

const regularMsalConfig = {
    auth: {
        clientId: process.env.REACT_APP_APP_ID,
        authority: 'https://login.microsoftonline.com/' + process.env.REACT_APP_TENANT_ID,
        redirectUri: process.env.REACT_APP_REDIRECT_URI,
        postLogoutRedirectUri: process.env.REACT_APP_REDIRECT_LOGOUT_URI
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true
    }
}

const authenticationParameters = {
    scopes: regularScopes
};

const commonMsalOptions = {
    loginType: LoginType.Popup,
    tokenRefreshUri: window.location.origin + '/'
}

export const authProvider = new MsalAuthProvider(regularMsalConfig, authenticationParameters, commonMsalOptions)
