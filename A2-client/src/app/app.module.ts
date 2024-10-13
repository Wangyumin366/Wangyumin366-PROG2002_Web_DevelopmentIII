import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { FundraiserComponent } from './fundraiser/fundraiser.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { DonationComponent } from './donation/donation.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateFundraiserComponent } from './create-fundraiser/create-fundraiser.component';
import { EditFundraiserComponent } from './edit-fundraiser/edit-fundraiser.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    FundraiserComponent,
    DonationComponent,
    AdminHomeComponent,
    CreateFundraiserComponent,
    EditFundraiserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
