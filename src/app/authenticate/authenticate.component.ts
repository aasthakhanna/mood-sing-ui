import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {
  private color = null;

  constructor(
    public authenticationService: AuthenticationService,
    public clientService: ClientService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.authenticationService.authenticate();
    this.router.navigate(['/mood']);
  }
}
