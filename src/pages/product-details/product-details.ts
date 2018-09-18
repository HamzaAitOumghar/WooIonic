import { Component } from '@angular/core';
import { NavController, NavParams, ToastController ,ModalController} from 'ionic-angular';
import * as WC from 'woocommerce-api';


import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  product: any;  
  WooCommerce:any;
  reviews: any[]=[] ;


  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public toast : ToastController,public modalCtrl:ModalController) {
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

  addCartProduct(product){
    this.storage.get("cart").then(
        (data)=>{

            if(data==null || data.length==0){
              data=[];
              data.push({
                "product":product,
                "qty":1,
                "amount": parseFloat(product.price)
              });
            }
            else{
                let added = 0;
                for(let i=0 ; i<data.length;i++){
                    
                      if(product.id==data[i].product.id){
                        console.log("product is alredy in the cart");
                        let qty = data[i].qty;
                        data[i].qty=qty+1;
                        data[i].amount=parseFloat(data[i].amount)+parseFloat(data[i].product.price) ;
                        added=1;

                      }

                }
                if(added==0){
                  data.push({
                    "product":product,
                    "qty":1,
                    "amount": parseFloat(product.price)
                  });
                }
            }
            this.storage.set("cart",data).then(
              ()=>{
                console.log("Cart Updated");
                console.log(data);

                this.toast.create({
                  message: "Cart Has been updated",
                  duration : 2000
                }).present();
                
              }
            );
        }
    );
  }

  openCart(){
    this.modalCtrl.create(CartPage).present();
  }

}
