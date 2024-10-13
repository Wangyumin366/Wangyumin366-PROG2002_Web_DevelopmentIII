import { Component } from '@angular/core';
import {Fundraiser, FundraiserServiceService} from "../fundraiser-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  fundraisers: Fundraiser[] = [];

  constructor(private fundraiserService: FundraiserServiceService) {
  }

  ngOnInit(): void {
    this.fundraiserService.getFundraisers().subscribe(res => {
      this.fundraisers = res;
    }, err => {
      console.log(err)
    })
  }
}
