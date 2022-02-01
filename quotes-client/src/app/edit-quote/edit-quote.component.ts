import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import {QuotesService} from "../quotes.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-quote',
  templateUrl: './edit-quote.component.html',
  styleUrls: ['./edit-quote.component.scss']
})
export class EditQuoteComponent implements OnInit {
  quote = {
    title: '',
    author: ''
  };

  id:string | null = '' ;

  constructor(private quotesService: QuotesService, private activatedRoute: ActivatedRoute, private router: Router, private snakBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.id);
    if (this.id){
      this.quotesService.getQuote(this.id).subscribe(data => {
        this.quote = data;
      })
    }
  }

  onSave(form: NgForm) {
    console.log(form)
    const data = form.value;
    if(this.id){
        this.quotesService.updateQuote(this.id, data).subscribe(data => {
          console.log(data)
          this.snakBar.open('Quote Updated');
          this.router.navigateByUrl('/quotes');
          setTimeout(() =>{
            this.snakBar.dismiss()
          },2000)
        })
    }else {
      this.quotesService.createQuote(data).subscribe((data) => {
        console.log(data);
        this.snakBar.open('Quote Created');
        this.router.navigateByUrl('/quotes');
        setTimeout(() =>{
          this.snakBar.dismiss()
        },2000)
      });
    }
  }
}
