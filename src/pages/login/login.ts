import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;


  constructor(public navCtrl: NavController,public storage:Storage, public navParams: NavParams, public http: HttpClient, private toast: ToastController, private alert: AlertController) {
    this.username = "";
    this.password = "";
  }

  login() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };
    this.http.get("http://localhost/wordpress/api/auth/generate_auth_cookie/?insecure=cool&username=" + this.username + "&password=" + this.password, httpOptions).subscribe(
      (data:any) => {
        if(data.status=="error"){
          this.toast.create({
            message: "invalid username or password",
            duration: 5000
          }).present();
          return ;
        }

        this.storage.set("userLoginInfo", data).then(
          (resp) => {
            this.alert.create({
              title: "Login Successful",
              message: "You have been logged in successfully",
              buttons: [{
                text: "Ok",
                handler: () => {
                  if (this.navParams.get("next")) {
                    this.navCtrl.push(this.navParams.get("next"));
                  }
                  else {
                    this.navCtrl.pop();
                  }
                }
              }]
            }).present();;
          }
        );

      },
      (err) => {
        this.toast.create({
          message: err,
          duration: 5000
        }).present();

      }
    );

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
