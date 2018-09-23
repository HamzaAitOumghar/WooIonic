import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuPage } from '../pages/menu/menu';
import {  ProductByCategoryPage} from '../pages/product-by-category/product-by-category';
import { ProductDetailsPage } from '../pages/product-details/product-details';

import { IonicStorageModule } from '@ionic/storage';
import { CartPage } from '../pages/cart/cart';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { HttpClientModule } from '@angular/common/http';
import { LoginPage } from '../pages/login/login';
import { HTTP } from '@ionic-native/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    ProductByCategoryPage,
    ProductDetailsPage,
    CartPage,
    SignUpPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    ProductByCategoryPage,
    ProductDetailsPage,
    CartPage,
    SignUpPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HTTP
  ]
})
export class AppModule {}
