export interface InitializeOptions {
  /**
   * Facebook App ID, provided by Facebook
   */
  facebookAppId?: string;
  /**
   * The app's client ID, found and created in the Google Developers Console.
   * Common for Android or iOS.
   * The default is defined in the configuration.
   * @example xxxxxx-xxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
   * @since 3.1.0
   */
  googleClientId?: string;
  /**
   * Apple Client ID, provided by Apple
   */
  appleClientId?: string;
  /**
   * Twitter Client ID, provided by Twitter
   */
  twitterClientId?: string;
  /**
   * Twitter Client Secret, provided by Twitter
   */
  twitterClientSecret?: string;
}

export interface FacebookLoginOptions {
  /**
   * Permissions
   * @description select permissions to login with
   */
  permissions: string[];
}

export interface GoogleLoginOptions {

  /**
   * Specifies the scopes required for accessing Google APIs
   * The default is defined in the configuration.
   * @example ["profile", "email"]
   * @see [Google OAuth2 Scopes](https://developers.google.com/identity/protocols/oauth2/scopes)
   */
  scopes?: string[];

  /**
   * Set if your application needs to refresh access tokens when the user is not present at the browser.
   * In response use `serverAuthCode` key
   *
   * @default false
   * @since 3.1.0
   * */
  grantOfflineAccess?: boolean;
}

export interface GoogleLoginResponse {
  accessToken: AccessToken | null;
  profile: {
    fields: readonly string[];
  }
}

export interface AppleLoginOptions {
  /**
   * Scopes
   * @description select scopes to login with
   */
  scopes?: string[];
  /**
   * Redirect URI
   * @description redirect URI
   */
  redirectURI: string;
  /**
   * Nonce
   * @description nonce
   */
  nonce?: string;
  /**
   * State
   * @description state
   */
  state?: string;
}

export interface AppleLoginResponse {
  user: string | null;
  email: string | null;
  givenName: string | null;
  familyName: string | null;
  identityToken: string;
  authorizationCode: string;
}

export interface LoginOptions {
  /**
   * Provider
   * @description select provider to login with
   */
  provider: "facebook" | "google" | "apple" | "twitter";
  /**
   * Payload
   * @description payload to login with
   */
  payload: FacebookLoginOptions | GoogleLoginOptions | AppleLoginOptions;
}

export interface LoginResult {
  /**
   * Provider
   * @description select provider to login with
   */
  provider: "facebook" | "google" | "apple" | "twitter";
  /**
   * Payload
   * @description payload to login with
   */
  result: FacebookLoginResponse | GoogleLoginResponse | AppleLoginResponse;
}

export interface AccessToken {
  applicationId?: string;
  declinedPermissions?: string[];
  expires?: string;
  isExpired?: boolean;
  lastRefresh?: string;
  permissions?: string[];
  token: string;
  userId?: string;
}

export interface FacebookLoginResponse {
  accessToken: AccessToken | null;
  profile: {
    fields: readonly string[];
  }
}

export interface CurrentUserResponse {
  /**
   * Provider
   * @description select provider to login with
   */
  provider: "facebook" | "google" | "apple" | "twitter";
  /**
   * Payload
   * @description payload to login with
   */
  result: FacebookLoginResponse | GoogleLoginResponse | AppleLoginResponse;
}

export interface SocialLoginPlugin {
  /**
   * Initialize the plugin
   * @description initialize the plugin with the required options
   */
  initialize(options: InitializeOptions): Promise<void>;
  /**
   * Login with the selected provider
   * @description login with the selected provider
   */
  login(options: LoginOptions): Promise<LoginResult>;
  /**
   * Logout
   * @description logout the user
   */
  logout(options: LoginOptions): Promise<void>;
  /**
   * Get the current access token
   * @description get the current access token
   */
  getCurrentUser(): Promise<CurrentUserResponse>;
  /**
   * Refresh the access token
   * @description refresh the access token
   */
  refresh(options: LoginOptions): Promise<void>;
}
