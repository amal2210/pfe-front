import { HttpClient } from '@angular/common/http';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private httpclient: HttpClient) { }


  getOffre() {
    //  + "?token=dsdsdsdsd"
    if (localStorage.getItem('token') == null) {
      return this.httpclient.get(environment.baseUrl + "/offre")

    }
    else {
      return this.httpclient.get(environment.baseUrl + "/offre?token=" + localStorage.getItem('token'))

    }
  }
  getOffrebyskill(id: any) {
    debugger
    return this.httpclient.get(environment.baseUrl + `/offrebyskill/${id}`)
  }
  getOffreById(id: any) {
    return this.httpclient.get(environment.baseUrl + `/offree/${id}`)

  }
  addOffre(offre: any) {

    console.log(environment.baseUrl + `/offre/`)
    console.log("offre : ", offre)
    return this.httpclient.post(environment.baseUrl + `/offre/`, offre)
  }

  deleteOffre(id: any) {
    return this.httpclient.delete(environment.baseUrl + `/offre/${id}`)
  }

  updateOffre(id: any, offre: any) {
    return this.httpclient.put(environment.baseUrl + `/offre/${id}`, offre)
  }
  addfavoris(id: any, token: any) {
    return this.httpclient.get(environment.baseUrl + `/favoris/add/${id}/${token}`,)
  }
  getfavoris(token: any) {
    return this.httpclient.get(environment.baseUrl + `/favoris/by/user/${token}`)
  }
  filter(offre:any){
    return this.httpclient.post(environment.baseUrl + `/offre`,offre)
  }
  deletefavoris(id:any,token:any){
    
    return this.httpclient.get(environment.baseUrl + `/favoris/delete/${token}/${id}`)
  }

}