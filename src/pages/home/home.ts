import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { CurrencyProvider, ICurrency } from '../../providers/currency';
import { AppPreferences } from '@ionic-native/app-preferences';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  price: string = '';
  coinsTotal = 0;
  hint: string;
  selectedICoins: Array<Coin> = [];
  private index = 0;
  selectedICurrency: ICurrency;
  userPrefCurrency = "EUR";
  showHint: boolean = false;

  constructor(public navCtrl: NavController,
    public atrCtrl: AlertController,
    private appPreferences: AppPreferences,
    private alertCtrl: AlertController,
    private currencyProvider: CurrencyProvider) {

    this.beginNewGame();
  }

  ionViewDidEnter() {
    this.appPreferences.fetch('USER_SELECTED_CURRENCY').then((currency: string) => {
      this.readHintPreference().then((hintPref: string) => {
        this.showHint = (hintPref == 'true');

        if (this.userPrefCurrency != currency) {
          this.userPrefCurrency = currency;
          this.beginNewGame();
        }
      });
    }).catch((err) => {
      this.readHintPreference().then((hintPref: string) => {
        this.showHint = (hintPref == 'true');

        if (this.userPrefCurrency != 'EUR') {
          this.userPrefCurrency = 'EUR';
          this.beginNewGame();
        }
      });
    });
  }

  readHintPreference() {
    return new Promise((resolve, reject) => {
      this.appPreferences.fetch('HINT').then((res) => {
        resolve(res);
      }).catch((err) => {
        resolve('true');
      });
    });
  }

  getRandomPrice() {
    let randomPrice = 0;
    console.log(randomPrice);
    //number of samples from array nominals
    let n = Math.floor(Math.random() * (Math.floor(6) - Math.ceil(1)) + 1) + Math.ceil(1);
    for (var i = 0; i < n; i++) {
      let min = Math.ceil(0);
      let max = Math.floor(this.selectedICurrency.nominal.length);
      let randomChosenNominalIndex = Math.floor(Math.random() * (max - min)) + min;
      randomPrice += this.selectedICurrency.nominal[randomChosenNominalIndex];
    }
    return randomPrice / 100;
  }

  formatter(value) {
    var valueNumber = new Number(value);
    return valueNumber.toFixed(2);
  }

  showResult() {
    if (this.price == this.formatter(this.coinsTotal)) {
      let alert = this.atrCtrl.create({
        cssClass: 'alert-success',
        title: 'You WON!',
        buttons: [{
          text: 'New Game',
          handler: data => {
            this.beginNewGame();
          }
        }]
      });
      alert.present();
    } else {
      let alert = this.atrCtrl.create({
        title: 'You LOSE!',
        cssClass: 'alert-danger',
        buttons: [{
          text: 'New Game',
          handler: data => {
            this.beginNewGame();
          }
        }]
      });
      alert.present();
    }
  }

  beginNewGame() {
    this.processCurrencyJson().then((item: ICurrency) => {
      this.selectedICurrency = item;
      this.price = this.formatter(this.getRandomPrice());
      this.coinsTotal = 0;
      this.hint = this.formatter(this.coinsTotal);
      this.selectedICoins = [];
    }).catch((err) => {
      console.log('ops!');
      let alert = this.alertCtrl.create({
        title: 'Configuration Error',
        subTitle: 'Oops, something has gone wrong',
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }

  //read CurrenciesList, compare userPrefCurrency with object property and assign it 
  processCurrencyJson() {
    var userCurr = this.userPrefCurrency;
    return new Promise((resolve, reject) => {
      this.currencyProvider.getCurrenciesList().then((result: ICurrency[]) => {
        var success = false;
        result.forEach((item: ICurrency) => {
          if (item.code == userCurr) {
            success = true;
            resolve(item);
          }
        });

        if (!success) {
          reject();
        }
      }).catch((err) => {
        reject();
      });
    });
  }

  addCoinToArray(currencyCode, nominal) {
    let coin = { id: this.index++, coinCode: currencyCode, coinNominal: nominal }
    this.selectedICoins.push(coin);
  }


  removeCoin(id) {
    for (var i = 0; i < this.selectedICoins.length; i++) {
      if (this.selectedICoins[i].id == id) {
        this.coinsTotal -= this.selectedICoins[i].coinNominal / 100;
        this.hint = this.formatter(this.coinsTotal);

        this.selectedICoins.splice(i, 1);
      }
    }
  }

  getImageSourceByNominal(currencyCode, nominal) {
    return "assets/img/" + currencyCode + "/" + nominal + ".png";
  }

  createCoin(currencyCode, nominal) {
    this.coinsTotal += nominal / 100;
    this.hint = this.formatter(this.coinsTotal);
    this.addCoinToArray(currencyCode, nominal);
  }
}

export interface Coin {
  id: number;
  coinNominal: number;
  coinCode: string;
} 