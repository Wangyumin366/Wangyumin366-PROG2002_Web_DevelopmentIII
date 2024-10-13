import { Component } from '@angular/core';
import {Category, Fundraiser, FundraiserServiceService} from "../fundraiser-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-fundraiser',
  templateUrl: './create-fundraiser.component.html',
  styleUrl: './create-fundraiser.component.css'
})
export class CreateFundraiserComponent {
  categories: Category[] = [];
  fundraiser: Fundraiser = {
    FUNDRAISER_ID: 0,
    ORGANIZER: "",
    CAPTION: "",
    TARGET_FUNDING: 100,
    CURRENT_FUNDING: 0,
    CITY: "",
    CATEGORY_ID: 0,
    ACTIVE: true,
  }

  constructor(
    private fundraiserService: FundraiserServiceService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.fundraiserService.getCategories().subscribe(res => {
      this.categories = res;
    }, err => {
      console.log(err)
    })
  }

  doCreate(): void {
    if (this.fundraiser.ORGANIZER==="") {
      alert("Please enter ORGANIZER!");
      return;
    }
    if (this.fundraiser.CAPTION==="") {
      alert("Please enter CAPTION!");
      return;
    }
    if (this.fundraiser.ORGANIZER==="") {
      alert("Please enter ORGANIZER!");
      return;
    }
    if (!this.isNumber(this.fundraiser.TARGET_FUNDING) || this.fundraiser.TARGET_FUNDING < 0) {
      alert("Please enter correct TARGET_FUNDING format!");
      return;
    }
    if (!this.isNumber(this.fundraiser.CURRENT_FUNDING) || this.fundraiser.CURRENT_FUNDING < 0) {
      alert("Please enter correct CURRENT_FUNDING format!");
      return;
    }
    if (this.fundraiser.CITY==="") {
      alert("Please enter CITY!");
      return;
    }
    if (this.fundraiser.CATEGORY_ID===0) {
      alert("Please enter CATEGORY_ID!");
      return;
    }
    if (this.fundraiser.ACTIVE as any ===-1) {
      alert("Please enter ACTIVE!");
      return;
    }

    this.fundraiser.CATEGORY_ID = Number(this.fundraiser.CATEGORY_ID)

    this.fundraiserService.addFundraiser(this.fundraiser).subscribe(res => {
      alert("Fundraiser has been successfully created!")
      this.router.navigate(['/admin'])
    }, err => {
      console.log(err)
    })
  }

  clear(): void {
    this.fundraiser = {
      FUNDRAISER_ID: 0,
      ORGANIZER: "",
      CAPTION: "",
      TARGET_FUNDING: 100,
      CURRENT_FUNDING: 0,
      CITY: "",
      CATEGORY_ID: 0,
      ACTIVE: true,
    }
  }

  isNumber(value: any) {
    return typeof value === 'number' && !isNaN(value);
  }
}
