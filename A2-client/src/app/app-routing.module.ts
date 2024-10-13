import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { SearchComponent } from "./search/search.component";
import { FundraiserComponent } from "./fundraiser/fundraiser.component";
import { DonationComponent } from "./donation/donation.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'fundraiser/:id',
    component: FundraiserComponent
  },
  {
    path: 'donation/:id',
    component: DonationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
