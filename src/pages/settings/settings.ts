import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';

import { CurrencyProvider } from '../../providers/currency';
import { CurrencyListPage } from '../../pages/currency-list/currency-list';
import { AppPreferences } from '@ionic-native/app-preferences';



@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})

export class SettingsPage {

  hint: boolean;
  curencySymbol: string;


  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private CurrencyProvider: CurrencyProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private appPreferences: AppPreferences) {
  }

  ionViewDidEnter() {
    this.curencySymbol = this.navParams.get('curencySymbol');
    
    let loading = this.loadingCtrl.create({
      content: 'Loading ...'
    });
    loading.present();


    if (this.curencySymbol == null) {
      this.appPreferences.fetch('USER_SELECTED_CURRENCY').then((currency: string) => {
        this.curencySymbol = currency;
      }).catch((err) => {
        loading.dismiss();
      });
    }

    this.getHint().then(function () {
      loading.dismiss();
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

  openCurrencyList() {
    let profileModal = this.modalCtrl.create(CurrencyListPage, { curencySymbol: this.curencySymbol });
    profileModal.present();

    //this.navCtrl.push(CurrencyListPage);
  }

  savePreferencesHint() {
    this.appPreferences.store('HINT', '' + this.hint);
  }

  getHint() {
    return new Promise((resolve, reject) => {
      this.appPreferences.fetch('HINT').then((res) => {
        this.hint = res;
        resolve();
      }).catch((err) => {
        let alert = this.alertCtrl.create({
          title: 'Communication Error',
          subTitle: 'Oops, something has gone wrong',
          buttons: ['Dismiss']
        });
        alert.present();
        reject();
      });
    });
  }

}
