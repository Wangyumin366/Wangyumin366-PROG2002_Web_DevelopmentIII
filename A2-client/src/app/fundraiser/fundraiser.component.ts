import {Component, OnInit} from '@angular/core';
import {Donation, Fundraiser, FundraiserServiceService} from "../fundraiser-service.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-fundraiser',
  templateUrl: './fundraiser.component.html',
  styleUrl: './fundraiser.component.css'
})
export class FundraiserComponent implements OnInit {
  fundraiser: Fundraiser|undefined;
  donations: Donation[] = [];

  constructor(
    private fundraiserService: FundraiserServiceService,
    private route: ActivatedRoute
  ) {

    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.fundraiserService.getFundraiserById(params.id).subscribe(res => {
          this.fundraiser = res;
        }, err => {
          console.log(err)
        })

        this.fundraiserService.getDonations(params.id).subscribe(res => {
          this.donations = res;
        }, err => {
          console.log(err)
        })
      }
    })

  }

  ngOnInit(): void {
  }
}
