import { ISignInRequest, ISignInResponse } from '~/interfaces/interface.auth';
import { IHttpClient } from '~/interfaces/interface.httpClient';

export class AuthService {
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async signIn(data: ISignInRequest) {
    return this.httpClient.post<ISignInResponse>(`auth/signIn`, data);
  }
}
