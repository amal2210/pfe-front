import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { BehaviorSubject, map, tap, Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  constructor(private http: HttpClient) {

  }
  postRegister(object: any) {
    return this.http.post(environment.baseUrl + "/api/register", { object })
  }

  registerFree(object: any) {
    return this.http.post(environment.baseUrl + "/register/freelance", { object })
  }
  postLogin(object: any) {
    return this.http.post(environment.baseUrl + "/api/login", { object })


  }


  gettoken(token: any) {
    return this.http.post(environment.baseUrl + "/api/token", { token: token })
  }
  changepassword(password: any) {
    return this.http.put(environment.baseUrl + "/api/changer/password", password)
  }
  getToken() {
    return localStorage.getItem('token')
  }



  forgetpassword(object: any) {

    return this.http.post(environment.baseUrl + "/api/forget/password", object)
  }

 

  getprofil(token: any) {
    return this.http.get(environment.baseUrl + `/api/my/profil/${token}`)
  }
  updateprofil(token: any, term: any) {
    return this.http.put(environment.baseUrl + `/api/my/profil/${token}`, term)
  }
 
  logout() {
   return localStorage.removeItem('token')

  }

desactivercompte(id:any){
 
  return this.http.get(environment.baseUrl + `/admin/desactiverCompte/${id}`)
}
}