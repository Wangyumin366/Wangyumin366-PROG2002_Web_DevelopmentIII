import {Component, OnInit} from '@angular/core';
import {Category, Fundraiser, FundraiserServiceService} from "../fundraiser-service.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  fundraisers: Fundraiser[] = [];
  categories: Category[] = [];

  organizer: string = "";
  city: string = "";
  category: number = 0;

  isSearch = false;

  constructor(private fundraiserService: FundraiserServiceService) {
  }

  ngOnInit(): void {
    this.fundraiserService.getCategories().subscribe(res => {
      this.categories = res;
    }, err => {
      console.log(err)
    })
  }

  doSearch(): void {
    if (this.organizer==""&&this.city==""&&this.category==0) {
      alert("You must enter one of organizer/city/category")
      return
    }
    this.isSearch = true
    this.fundraiserService.searchForFundraisers(this.organizer, this.city, this.category).subscribe(res => {
      this.fundraisers = res;
    })
  }

  clearChechboxes(): void {
    this.organizer = "";
    this.city = "";
    this.category = 0;
    this.fundraisers = [];
    this.isSearch = false;
  }
}
