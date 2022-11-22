import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CondidatService {
  token = localStorage.getItem('token')
  constructor(private http: HttpClient) { }

  getCondidature() {


    return this.http.post(environment.baseUrl + "/condidature", { 'token': this.token })
  }
  getCondidatureById(id: any) {
    return this.http.get(environment.baseUrl + `/condidaturee/${id}`)

  }
  updateCondidat(id: any, data: any) {


    console.log("ok url of  ", environment.baseUrl + `/condidature/${id}`, data)
    return this.http.put(environment.baseUrl + `/condidature/${id}`, data)
  }
  addcondidature(data: any) {


    console.log("ok url of  ", environment.baseUrl + `/condidature/`, data)
    return this.http.post(environment.baseUrl + `/condidature/`, data)
  }
  acceptcondidature(id: any) {


    return this.http.get(environment.baseUrl + `/api/condidature/accepter/${id}`, id)
  }



  refusercondidature(id: any) {


    return this.http.get(environment.baseUrl + `/api/condidature/refuser/${id}`, id)
  }
  supprimer(id: any) {
    return this.http.delete(environment.baseUrl + `/condidature/${id}`)
  }

  dashboard(token: any) {
    return this.http.post(environment.baseUrl + `/dashboard/freelance`, { 'token': token })

  }
  addtask(object: any) {
    return this.http.post(environment.baseUrl + `/suivie/projet/create`, object)

  }
  gettask(object: any) {

    return this.http.post(environment.baseUrl + `/suivie/projet/list`, object)
  }

  updatetask(object:any){
    

    return this.http.post(environment.baseUrl + `/suivie/projet/update`, object)
  }
  removetask(id:any){
  
    return this.http.get(environment.baseUrl + `/suivie/projet/delete/${id}`)
  }
  
  

  deposerurl(object:any){
  
    return this.http.post(environment.baseUrl + `/api/deposer/url`,object)
  }
}