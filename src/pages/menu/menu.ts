import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';

import * as WC from 'woocommerce-api';
import { ProductByCategoryPage } from '../product-by-category/product-by-category';
import { SignUpPage } from '../sign-up/sign-up';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  homePage;
  WooCommerce:any;
  categories: any[]=[];
  @ViewChild('content') childNavCtrl:NavController;

  loggedIn:boolean;
  user:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage : Storage,public modalCtrl:ModalController) {
    this.user={};
    this.homePage = HomePage;
    this.WooCommerce=WC({
      url:"http://localhost/wordpress",
      consumerKey:"ck_856a139df3131d377fdb4dac1c11c23e44c771b3",
      consumerSecret:"cs_85ce234c3245036db5c6dfddb029d3008b5fc9be",
      wpAPI: true,
      version: "wc/v2"
    });

    this.WooCommerce.getAsync("products/categories").then(
      (data)=>{
 
          let temp:any[] = JSON.parse(data.body);

          for(let i=0;i<temp.length;i++){
            if(temp[i].parent==0){

                if(temp[i].slug=="clothing"){
                  temp[i].icon="shirt";
                }
                else if(temp[i].slug=="music"){
                  temp[i].icon="musical-notes";
                }
                else if(temp[i].slug=="posters"){
                  temp[i].icon="image";
                }
                else{
                  temp[i].icon="help-circle";
                }


              this.categories.push(temp[i]);
            }
          } 

        },
      (err)=>{
        console.log(err);
      }
    )


  }

  ionViewDidEnter() {
    
    this.storage.ready().then(
      ()=>{
        this.storage.get("userLoginInfo").then((userLoginInfo)=>{
            if(userLoginInfo!=null){
              console.log("User logged in ! !");
              this.user=userLoginInfo.user;
              console.log(this.user);
              this.loggedIn=true;
              
            }
            else{
              console.log("no user found");
              this.user={};
              this.loggedIn=false;

              
            }
        });
      }
    )

  }
  openCategory(c){
    this.childNavCtrl.setRoot(ProductByCategoryPage,{"category":c})

  }
  openPage(pageName:string){
    if(pageName=="signup"){
      this.navCtrl.push(SignUpPage);
    }
    if(pageName=="login"){
      this.navCtrl.push(LoginPage);
    }
    if(pageName=="cart"){
      let model=this.modalCtrl.create(CartPage);
      model.present();
    }
    if(pageName=="logout"){
      this.storage.remove("userLoginInfo").then(()=>{
        this.user={};
        this.loggedIn=false;
      });
    }
    

  }

}
