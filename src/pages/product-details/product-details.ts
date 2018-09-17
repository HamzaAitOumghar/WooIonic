import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';



@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  product: any;  
  WooCommerce:any;
  reviews: any[]=[] ;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product=this.navParams.get("product");

    this.WooCommerce=WC({
      url:"http://localhost/wordpress",
      consumerKey:"ck_856a139df3131d377fdb4dac1c11c23e44c771b3",
      consumerSecret:"cs_85ce234c3245036db5c6dfddb029d3008b5fc9be",
      wpAPI: true,
      version: "wc/v2"
    });

    this.WooCommerce.getAsync('products/'+this.product.id+'/reviews').then(
      (data)=>{
        this.reviews=JSON.parse(data.body);
        console.log("reviews");
        console.log(this.reviews);
        
        
      },
      (err)=>{
          console.log(err);
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

}
