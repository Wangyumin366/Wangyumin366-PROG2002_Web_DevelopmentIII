import { Component } from '@angular/core';
import {Donation, Fundraiser, FundraiserServiceService} from "../fundraiser-service.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent {
  fundraiser: Fundraiser|undefined;

  fundraisers: Fundraiser[] = [];

  giver: string = "";
  amount: number = 5;

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
      }
    })
  }

  ngOnInit(): void {
  }

  doDonate(): void {
    if (this.giver=="") {
      alert("You must enter giver")
      return
    }
    if (!/^\b([5-9]\d*(\.\d+)?|[1-9]\d+(\.\d+)?|0*[5-9](\.\d+)?)\b$/.test(""+this.amount)) {
      alert("You must enter correct amount, and minimum of donation is 5 AUD")
      return
    }
    const donation: Donation = {
      DATE: new Date(),
      AMOUNT: this.amount,
      GIVER: this.giver,
      FUNDRAISER_ID: this.fundraiser!.FUNDRAISER_ID
    }
    this.fundraiserService.addDonation(donation).subscribe(res => {
      alert("Thank you for your donation to " + this.fundraiser!.ORGANIZER)
      this.clear()
    }, err => {
      console.log(err)
    })
  }

  clear(): void {
    this.giver = "";
    this.amount = 5;
  }
}
