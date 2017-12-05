import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { CurrencyProvider } from '../../providers/currency';
import { AppPreferences } from '@ionic-native/app-preferences';
import { SettingsPage } from '../../pages/settings/settings';
import { TabsPage } from '../../pages/tabs/tabs';


@Component({
  selector: 'page-currency-list',
  templateUrl: 'currency-list.html',
})
export class CurrencyListPage {
  currencies: any;
  curencySymbol: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private CurrencyProvider: CurrencyProvider, 
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private appPreferences: AppPreferences) {
    this.currencies = null;
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CurrencyListPage');
  }

  ionViewDidEnter() {
    this.curencySymbol = this.navParams.get('curencySymbol');

    let loading = this.loadingCtrl.create({
      content: 'Loading ...'
    });
    loading.present();
    
    this.CurrencyProvider.getCurrenciesList().then((result) => {
      loading.dismiss(); 
      this.currencies = result;
    }).catch((err) => {
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Communication Error',
        subTitle: 'Oops, something has gone wrong',
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }

  savePreferencesCurrency(currency: string){ 
    this.appPreferences.store('USER_SELECTED_CURRENCY',''+ currency);
    //this.navCtrl.push(SettingsPage, { curencySymbol: currency });
    this.navCtrl.setRoot(TabsPage);
  }
}
