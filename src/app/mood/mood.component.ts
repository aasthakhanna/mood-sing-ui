import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.scss']
})
export class MoodComponent implements OnInit {
  private color = null; 

  constructor(
    public clientService: ClientService,
    public router: Router
  ) {}

  async ngOnInit() {
    this.color = await this.clientService.getColor();
  }

  public getColor() {
    return this.color;
  }
}
