import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import * as WC from 'woocommerce-api';


/**
 * Generated class for the ProductByCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-product-by-category',
  templateUrl: 'product-by-category.html',
})
export class ProductByCategoryPage {

  WooCommerce:any;
  productsFiltred:any[];
  page: number;
  category: any;
 
 
  constructor(public navCtrl: NavController, public navParams: NavParams,public toast : ToastController) {
    
    this.page=1; 
    this.category = this.navParams.get("category"); 
    this.WooCommerce=WC({
      url:"http://localhost/wordpress",
      consumerKey:"ck_856a139df3131d377fdb4dac1c11c23e44c771b3",
      consumerSecret:"cs_85ce234c3245036db5c6dfddb029d3008b5fc9be",
      wpAPI: true,
      version: "wc/v2"
    });

    this.WooCommerce.getAsync("products?filter[category]="+this.category.slug).then(
      (data)=>{
         this.productsFiltred=JSON.parse(data.body);
         console.log(this.productsFiltred[0]);
        }
      ,(err)=>{
        console.log(err);
        
      }
    );
  }

  ionViewDidLoad() {
    
  }
  loadMoreProducts(event){

    this.page++;
    console.log("Page : "+this.page);

    this.WooCommerce.getAsync("products?filter[category]="+this.category.slug+"&page="+this.page).then(
      (data)=>{
        let temp=JSON.parse(data.body);
       

        this.productsFiltred=this.productsFiltred.concat(JSON.parse(data.body));
        event.complete();
        
       
        if(temp.length<10){
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

}
