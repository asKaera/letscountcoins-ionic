import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Inject, forwardRef } from '@angular/core';
import { Config,LoadingController, AlertController } from 'ionic-angular';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatAll'
import 'rxjs/add/operator/share'


@Injectable()
export class CurrencyProvider {

constructor(private http: HttpClient, private alertCtrl: AlertController,private loadingCtrl: LoadingController) {
    
  }


    getCurrenciesList() {
        let url = './assets/currencies.1.json';
        let httpClient = this.http;

        return new Promise((resolve, reject) => {
            this.http.get<ICurrency[]>(url)
            .subscribe(
                data => {
                    resolve(data);
                },
                
                // Errors will call this callback instead:
                (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                        // A client-side or network error occurred. Handle it accordingly.
                        console.log('An error occurred: ' + err.error.message);
                    } else {
                        // The backend returned an unsuccessful response code.
                        // The response body may contain clues as to what went wrong,
                        console.log('Backend returned code: ' + err.status + ', msg: ' + err.message);
                    }
                    reject();
                }
            )
        });
    }
    
    getRestartGame(){

    }

}
export interface ICurrency {
    symbol: string;
    name: string;
    symbol_prefix: string,
    symbol_suffix: string,
    decimal_digits: number;
    rounding: number;
    code: string;
    name_plural: string;
    nominal: number[];
}
 