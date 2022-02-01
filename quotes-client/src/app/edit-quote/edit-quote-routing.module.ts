import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditQuoteComponent } from './edit-quote.component';

const routes: Routes = [{ path: '', component: EditQuoteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditQuoteRoutingModule { }
