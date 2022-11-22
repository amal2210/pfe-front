import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListcategorieService {


  constructor(private http: HttpClient) { }

  getcat() {
    // var reqHeader = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': 'Bearer ' + localStorage.getItem('token')
    // });
    return this.http.get(environment.baseUrl + "/categorie")
  }
  getcatById(id: any) {
    return this.http.get(environment.baseUrl + `/categoriee/${id}`)

  }
}