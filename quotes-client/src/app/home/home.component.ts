import { Component, OnInit } from '@angular/core';
import {QuotesService} from "../quotes.service";
import {Observable} from "rxjs";
import {Quote} from "../quotes/quote";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: Quote | undefined ;
  constructor(private quotesService: QuotesService) { }

  ngOnInit(): void {
    this.quotesService.getData().subscribe((data ) => {
      this.quote = data[0];
    })
  }

}
