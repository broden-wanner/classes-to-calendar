declare namespace google {
  export const accounts: Accounts;

  export interface Accounts {
    oauth2: OAuth2;
  }

  export interface OAuth2 {
    initTokenClient(config: TokenClientConfig): OAuth2Client;
    revoke(token: string, callback: () => void);
  }

  export interface TokenClientConfig {
    client_id: string;
    scope: string;
    callback: (t: TokenResponse) => void;
  }

  export interface TokenResponse {
    access_token: string;
    expire_time: string;
  }

  export class OAuth2Client {
    requestAccessToken(): void;
  }
}
