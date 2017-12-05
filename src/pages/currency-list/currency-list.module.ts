import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrencyListPage } from './currency-list';

@NgModule({
  declarations: [
    CurrencyListPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrencyListPage),
  ],
})
export class CurrencyListPageModule {}
