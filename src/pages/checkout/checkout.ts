import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';


/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  newOrder: any;
  paymentMethods: any[]=[];
  paymentMethod: any;
  billing_shipping_same: boolean;
  WooCommerce: any;
  userInfo: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,public alert:AlertController,private payPal: PayPal) {
    this.newOrder = {};
    this.newOrder.shipping = {};
    this.newOrder.billing = {};
    this.billing_shipping_same = false;
    this.paymentMethod="";

    this.paymentMethods = [
      { method_id: "bacs", method_title: "Direct Bank Transfer" },
      { method_id: "cheque", method_title: "Cheque Payment" },
      { method_id: "cod", method_title: "Cash on Delivery" },
      { method_id: "paypal", method_title: "PayPal" }
    ];

    if (this.billing_shipping_same) {
      this.newOrder.shipping_address = this.newOrder.billing_address;
    }

    this.WooCommerce = WC({
      url: "http://localhost/wordpress",
      consumerKey: "ck_856a139df3131d377fdb4dac1c11c23e44c771b3",
      consumerSecret: "cs_85ce234c3245036db5c6dfddb029d3008b5fc9be",
      wpAPI: true,
      version: "wc/v2"
    });

    this.storage.get("userLoginInfo").then((userLoginInfo) => {
      this.userInfo = userLoginInfo;
      let email = userLoginInfo.user.email;
      this.WooCommerce.getAsync("customers?email=" + email).then(
        (data) => {
          let test = JSON.parse(data.body);
          this.newOrder = test[0];

        }
      )
    });

  }


  setBillingToShipping() {
    this.billing_shipping_same = !this.billing_shipping_same;

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }


  placeOrder() {
    let orderItem: any[] = [];
    let data: any = {};
    let paymentData: any = {};


    for (var p of this.paymentMethods){
        if(p.method_id==this.paymentMethod){
          paymentData=p;
        }
    }

    data = {
      payment_method: paymentData.method_id,
      payment_method_title: paymentData.method_title,
      set_paid: true,
      billing: this.newOrder.billing,
      shipping: this.newOrder.shipping,
      customer_id: this.userInfo.user.id || '',
      line_items: orderItem
    };

    if (paymentData.method_id == "paypal") {
      //
    } else {
      this.storage.get("cart").then((cart) => {
        console.log(cart);

        Object.keys(cart).forEach(function (element) {
          orderItem.push({
            product_id: cart[element].product.id,
            quantity: cart[element].qty
          });
        });
        data.line_items = orderItem;

        this.WooCommerce.postAsync("orders", data).then((resp) => {
            let response = JSON.parse(resp.body);

          this.alert.create({
              title: "Order Placed Successfully",
              message: "Your order has been placed successfullly. yout order number is : "+response.number,
              buttons:[{
                text: "OK",
                handler: ()=>{
                  this.navCtrl.setRoot(HomePage); 
                }

              }]
            }).present();

        })

      });
    }



  }
}
