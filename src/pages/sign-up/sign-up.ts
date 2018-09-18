import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  newUser:any={};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.newUser.billing_address={};
    this.newUser.shipping_address={};
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

}
