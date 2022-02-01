import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Quote} from "./quotes/quote";
import {environment} from "../environments/environment";
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(private http: HttpClient) { }

  getData():Observable<Quote[]>{
    return this.http.get<Quote[]>(baseUrl+'/quotes')
      .pipe(tap(data => console.log('Quotes',data)));
  }

  getQuote(id: string): Observable<Quote>{
    return this.http.get<Quote>(`${baseUrl}/quotes/${id}`)
  }

  createQuote(quote:Quote): Observable<Quote> {
     return this.http.post<Quote>(`${baseUrl}/quotes`,quote);
  }

  updateQuote(id: string, data: Quote): Observable<Quote> {
    return this.http.put<Quote>(`${baseUrl}/quotes/${id}`,data);
  }

  deleteQuote(id: string) {
    return this.http.delete<Quote>(`${baseUrl}/quotes/${id}`);
  }
}
