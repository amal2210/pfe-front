import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListOfCompanyService {

  constructor(private http: HttpClient) { }

  getlistofCompany() {
    return this.http.get(environment.baseUrl + "/entreprise/")
  }
  getOnebyCompany(id: any) {
    return this.http.get(environment.baseUrl + `/entreprisee/${id}`)

  }
  addCompany(company: any) {

    console.log(environment.baseUrl + `/entreprise/`)
    console.log("company : ", company)
    return this.http.post(environment.baseUrl + `/entreprise/`, company)
  }

  deleteCompany(id: any) {
    return this.http.delete(environment.baseUrl + `/entreprise/${id}`)
  }
  updateCompany(id: any, company: any) {


    return this.http.put(environment.baseUrl + `/entreprise/${id}`, company)
  }
  upload(file: any) {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file);

    return this.http.post(environment.baseUrl + `/api/upload`, formData)
  }
  review(review: any) {
    return this.http.post(environment.baseUrl + `/reviews/add`, review)

  }
  dashboardcompany(token: any) {
    return this.http.get(environment.baseUrl + `/dashboard/entreprise/${token}`)
  }

 

}