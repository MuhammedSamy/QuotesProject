import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuotesService } from '../quotes.service';
import {Observable, tap} from "rxjs";
import {Quote} from "./quote";

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {
  public quotes: Observable<Quote[]> | any ;
  // public subscribtion: any ;
  public colorsArray: any[] = [];

  constructor(private quotesService: QuotesService) { }

  ngOnInit(): void {
    // this.subscribtion = this.quotesService.getData().subscribe(
    //   (data)=>{
    //     console.log(data);
    //     this.quotes = data;
    //   })
    //loop with tap to get quotes data so i get length and update color of the avatar only in initialization
    this.quotes = this.quotesService.getData().pipe(tap(data => {
      for (let i =0; i< data.length; i++){
        this.colorsArray.push(this.getRandomColor());
      }
    }));
    // this.quotes = this.quotesService.getData()
    // console.log(this.quotes.length);
    //   for (let i =0; i< this.quotes.length; i++){
    //     this.colorsArray.push(this.getRandomColor());
    //   }
  }

  getRandomColor(): { background: String }{
    const letters = `0123456789ABCDEF`;
    let color = `#`
    for(let i=0; i<6;i++){
      color += letters[Math.floor(Math.random()*16)];
    }
    return { background:color };
  }

  // ngOnDestroy(){
  //   this.subscribtion.unsubscribe();
  // }

  onDelete(id: string) {
    console.log(id);
    this.quotesService.deleteQuote(id).subscribe(data => {
      this.quotes = this.quotesService.getData()
      console.log('Quote deleted');
    });
  }
}
