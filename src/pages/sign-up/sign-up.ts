import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { CustomersProvider } from '../../providers/customers/customers';


@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  newUser: any = {};
  billing_shipping_same: any;
  WooCommerce;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: ToastController,private customersService:CustomersProvider) {
    this.WooCommerce = WC({
      url: "http://localhost/wordpress",
      consumerKey: "ck_856a139df3131d377fdb4dac1c11c23e44c771b3",
      consumerSecret: "cs_85ce234c3245036db5c6dfddb029d3008b5fc9be",
      wpAPI: true,
      version: "wc/v2"
    });
    
    //this.WooCommerce.setHeaders( 'Content-Type', 'application/x-www-form-urlencoded' );
    this.newUser.billing_address = {};
    this.newUser.shipping_address = {};
    this.billing_shipping_same = false;
  }

  setBillingToShipping() {
    this.billing_shipping_same = !this.billing_shipping_same;
  }

  ionViewDidLoad() {
  }
  signUp() {
    let customerData = {
      "email": this.newUser.email,
      "first_name": this.newUser.first_name,
      "last_name": this.newUser.last_name,
      "username": this.newUser.username,
      "billing": {
        "first_name": this.newUser.first_name,
        "last_name": this.newUser.last_name,
        "company": "",
        "address_1": this.newUser.billing_address.address_1,
        "address_2": this.newUser.billing_address.address_2,
        "city": this.newUser.billing_address.city,
        "state": this.newUser.billing_address.state,
        "postcode": this.newUser.billing_address.postcode,
        "country": this.newUser.billing_address.country,
        "email": this.newUser.email,
        "phone": this.newUser.billing_address.phone
      },
      "shipping": {
        "first_name": this.newUser.first_name,
        "last_name": this.newUser.last_name,
        "company": "",
        "address_1": this.newUser.shipping_address.address_1,
        "address_2": this.newUser.shipping_address.address_2,
        "city": this.newUser.shipping_address.city,
        "state": this.newUser.shipping_address.state,
        "postcode": this.newUser.shipping_address.postcode,
        "country": this.newUser.shipping_address.country
      }
    };

    if (this.billing_shipping_same) {
      customerData.shipping = customerData.billing;
    }

      var data = {
        email: 'john.doe@example.com',
        first_name: 'John',
        last_name: 'Doe',
        username: 'john.doe',
        billing: {
          first_name: 'John',
          last_name: 'Doe',
          company: '',
          address_1: '969 Market',
          address_2: '',
          city: 'San Francisco',
          state: 'CA',
          postcode: '94103',
          country: 'US',
          email: 'john.doe@example.com',
          phone: '(555) 555-5555'
        },
        shipping: {
          first_name: 'John',
          last_name: 'Doe',
          company: '',
          address_1: '969 Market',
          address_2: '',
          city: 'San Francisco',
          state: 'CA',
          postcode: '94103',
          country: 'US'
        }
      };

      
      // this.customersService.addNewCustmer(customerData).subscribe(
      //   (data)=>{
      //     console.log(data)
      //   },(err)=>{
      //     console.log(err);
          
      //   }
      // )

     this.WooCommerce.postAsync("customers",data).then((data2) => {
       console.log("Hello");
       console.log(data2);

     }).catch((err) => {
       console.log("Hello2");
      
       console.log(err);
     });
  }
  checkEmail() {
    let validEmail = false;
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (reg.test(this.newUser.email)) {
      //email valid

      this.WooCommerce.getAsync("customers/email/" + this.newUser.email).then(
        (data) => {
          let res = JSON.parse(data.body);

          console.log(res);


          if (res.data.status = 404) {
            validEmail = true;
            console.log("valid Email")
            this.toast.create({
              message: "Email is valid !",
              duration: 3000,
            }).present();
          }
          else {
            validEmail = false;
            console.log("non Valid Email");
            this.toast.create({
              message: "Email Already Exists  !",
              duration: 3000,
            }).present();
          }


        }
      )


    }
    else {
      validEmail = false;
      console.log(validEmail);
      this.toast.create({
        message: "Email is invalid !",
        duration: 3000,
      }).present();
    }
  }

}
