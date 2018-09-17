import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import * as WC from 'woocommerce-api';
import { ProductDetailsPage } from '../product-details/product-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products:any[];
  page:number;
  moreProducts:any[];


  constructor(public navCtrl: NavController,public toast : ToastController) {
    this.page=2;  
    this.WooCommerce=WC({
        url:"http://localhost/wordpress",
        consumerKey:"ck_856a139df3131d377fdb4dac1c11c23e44c771b3",
        consumerSecret:"cs_85ce234c3245036db5c6dfddb029d3008b5fc9be",
        wpAPI: true,
        version: "wc/v2"
      });
      this.WooCommerce.getAsync("products").then(
        (data)=>{
          this.products=JSON.parse(data.body);
         },(err)=>{
          console.log(err);
        }
      );
      this.loadMoreProducts(null);
  }

  loadMoreProducts(event){

    if(event==null){
        this.page=2;
        this.moreProducts=[];
    }
    else{
      this.page++;
    }

    this.WooCommerce.getAsync("products?page="+this.page).then(
      (data)=>{
        this.moreProducts=this.moreProducts.concat(JSON.parse(data.body));
        if(event !=null){
          event.complete();
        }

        if(JSON.parse(data.body).length<10){
          event.enable(false);
          this.toast.create({
              message: "No More Products !",
              duration : 2000
            }).present();
        }
      },(err)=>{
        console.log(err);
      }
    );
  }

  openProductPage(prod){
    this.navCtrl.push(ProductDetailsPage,{"product":prod})
  }

}
