import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Fundraiser {
  FUNDRAISER_ID: number;
  ORGANIZER: string;
  CAPTION: string;
  TARGET_FUNDING: number;
  CURRENT_FUNDING: number;
  CITY: string;
  CATEGORY_ID: number;
  ACTIVE: boolean;
  NAME?: string;
}

export interface Category {
  CATEGORY_ID: number;
  NAME: string;
}

export interface Donation {
  DONATION_ID?: number;
  DATE: Date;
  AMOUNT: number;
  GIVER: string;
  FUNDRAISER_ID: number;
}

@Injectable({
  providedIn: 'root'
})
export class FundraiserServiceService {
  host = "http://localhost:8080";

  constructor(
    private httpClient: HttpClient
  ) {

  }

  getCategories() : Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.host}/categories`)
  }

  getFundraisers() : Observable<Fundraiser[]> {
    return this.httpClient.get<Fundraiser[]>(`${this.host}/fundraisers`)
  }

  getAdminFundraisers() : Observable<Fundraiser[]> {
    return this.httpClient.get<Fundraiser[]>(`${this.host}/admin/fundraisers`)
  }

  searchForFundraisers(
    ORGANIZER: string,
    CITY: string,
    CATEGORY_ID: number
  ) : Observable<Fundraiser[]> {
    return this.httpClient.get<Fundraiser[]>(`${this.host}/fundraisers/search?ORGANIZER=${ORGANIZER}&CITY=${CITY}&CATEGORY_ID=${CATEGORY_ID}`)
  }

  getFundraiserById(FUNDRAISER_ID: number) : Observable<Fundraiser> {
    return this.httpClient.get<Fundraiser>(`${this.host}/fundraisers/` + FUNDRAISER_ID)
  }

  addFundraiser(FUNDRAISER: Fundraiser) : Observable<any> {
    return this.httpClient.post<any>(`${this.host}/fundraisers`, FUNDRAISER)
  }

  editFundraiser(FUNDRAISER_ID: number, FUNDRAISER: Fundraiser) : Observable<any> {
    return this.httpClient.put<any>(`${this.host}/fundraisers/` + FUNDRAISER_ID, FUNDRAISER)
  }

  deleteFundraiser(FUNDRAISER_ID: number) : Observable<any> {
    return this.httpClient.delete<any>(`${this.host}/fundraisers/` + FUNDRAISER_ID)
  }

  getDonations(FUNDRAISER_ID: number) : Observable<Donation[]> {
    return this.httpClient.get<Donation[]>(`${this.host}/fundraisers/donations/` + FUNDRAISER_ID)
  }

  addDonation(DONATION: Donation) : Observable<any> {
    return this.httpClient.post<any>(`${this.host}/fundraisers/donations`, DONATION)
  }
}

