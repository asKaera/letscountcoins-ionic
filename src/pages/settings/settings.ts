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
        loading.dismiss();
      }).catch((err) => {
        console.warn('AppPreferences not available (browser mode), using default currency');
        this.curencySymbol = 'USD'; // Default currency for browser
        loading.dismiss();
      });
    } else {
      // Currency already set, just dismiss loading
      this.getHint().then(() => {
        loading.dismiss();
      }).catch((err) => {
        loading.dismiss();
        console.error('Error getting hint:', err);
      });
    }
  }

  openCurrencyList() {
    try {
      console.log('Opening currency list with symbol:', this.curencySymbol);
      let profileModal = this.modalCtrl.create(CurrencyListPage, { curencySymbol: this.curencySymbol });
      profileModal.present();
    } catch (error) {
      console.error('Error opening currency list:', error);
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Could not open currency list: ' + error.message,
        buttons: ['OK']
      });
      alert.present();
    }
  }

  savePreferencesHint() {
    this.appPreferences.store('HINT', '' + this.hint).catch((err) => {
      console.warn('AppPreferences not available (browser mode), hint not saved');
    });
  }

  getHint() {
    return new Promise<void>((resolve, reject) => {
      this.appPreferences.fetch('HINT').then((res) => {
        this.hint = res === 'true' || res === true;
        resolve();
      }).catch((err) => {
        console.warn('AppPreferences not available (browser mode), using default hint value');
        this.hint = true; // Default hint value for browser
        resolve(); // Resolve instead of reject so the app doesn't crash
      });
    });
  }

}
