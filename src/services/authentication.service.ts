import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../environments/environment';
import { constants } from '../constants';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private redirect_uri = environment.redirectUri;
  private clientId = environment.spotifyClientId;
  private clientSecret = environment.spotifyClientSecret;
  private authorizeUrl = constants.spotifyAuthorizeUrl;
  private authenticateUrl = constants.spotifyAuthenticateUrl;
  private scope = constants.authorizationScope;
  private token = null;

  constructor(private httpClient: HttpClient) {}

  public getToken() {
    return this.token;
  }

  public authorize() {
    window.location.href = this.authorizeUrl + this.getAuthorizationParameters();
  }

  private getQueryParameter(url: string, parameter: string) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
  }

  private generateState() {
    return Math.random().toString(36);
  }

  private getAuthorizationParameters() {
    return `?client_id=${this.clientId}&response_type=code&redirect_uri=${this.redirect_uri}&state=${this.generateState()}&scope=${this.scope}`;
  }

  public async authenticate() {
    let data = await this.postAuthentication(
      this.getQueryParameter(window.location.href, 'code')
    );

    this.token = data['access_token'];
    console.log('Token: ' + this.token);
  }

  private async postAuthentication(code: string) {
    let body = this.getAuthenticationParameters(code);
    let headers = this.getAuthenticationHeaders();

    return this.httpClient.post(
      this.authenticateUrl, body, {headers: headers}
    ).toPromise();
  };

  private getAuthenticationParameters(code) {
    return `grant_type=authorization_code&code=${code}&redirect_uri=${this.redirect_uri}`
  };

  private getAuthenticationHeaders() {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  };
}
