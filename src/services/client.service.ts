import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { AuthenticationService } from './authentication.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private moodSingApiUrl = environment.moodSingApiUrl;

  constructor(
    private authenticationService: AuthenticationService,
    private httpClient: HttpClient
  ) {}

  public async getColor() {
    // TODO: implement some sort of security on this
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authenticationService.getToken()
    });
  
    let response = await this.httpClient.get(this.moodSingApiUrl + '/getColor', {headers: headers}).toPromise();
    return response['color'];
  };
}
