import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as OAuth from 'oauth-1.0a';
/*
  Generated class for the CustomersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomersProvider {

  _URL = "http://localhost/wordpress/wp-json/wc/v2/customers" ;
  
  constructor(public http: HttpClient) {
  }

  public addNewCustmer(custmer) {
   
      return this.http.post(this._URL,custmer);
  }

}
