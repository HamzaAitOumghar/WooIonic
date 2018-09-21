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
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization":"Basic " + btoa('ck_856a139df3131d377fdb4dac1c11c23e44c771b3' + ':' + 'cs_85ce234c3245036db5c6dfddb029d3008b5fc9be')
      })
    };
      return this.http.post(this._URL,custmer,httpOptions);
  }

}
