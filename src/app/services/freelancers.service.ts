import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FreelancersService {

  constructor(private http: HttpClient) { }

  getFreelancer() {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(environment.baseUrl + "/freelance/")
  }
 
  updateFree(id: any, data: any) {
    return this.http.put(environment.baseUrl + `/freelance/${id}`, data)

  }


}
