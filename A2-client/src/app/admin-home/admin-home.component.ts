import { Component } from '@angular/core';
import {Fundraiser, FundraiserServiceService} from "../fundraiser-service.service";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  fundraisers: Fundraiser[] = [];

  constructor(private fundraiserService: FundraiserServiceService) {
  }

  ngOnInit(): void {
    this.fundraiserService.getAdminFundraisers().subscribe(res => {
      this.fundraisers = res;
    }, err => {
      console.log(err)
    })
  }
}
