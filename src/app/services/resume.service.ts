import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor(private http: HttpClient) { }

  getEducation() {

    return this.http.get(environment.baseUrl + "/formation")
  }
  getformationbyid(id: any) {

    return this.http.get(environment.baseUrl + `/formationn/${id}`)
  }
  addEDucation(formation: any) {

    console.log(environment.baseUrl + `/formation/`)
    console.log("experience  : ", formation)
    return this.http.post(environment.baseUrl + `/formation/`, formation)
  }
  deleteeducation(id: any) {
    return this.http.delete(environment.baseUrl + `/formation/${id}`)
  }

  updatefor(id: any, formation: any) {
    return this.http.put(environment.baseUrl + `/formation/${id}`, formation)
  }

  /*************************************************************** */

  addExperience(experience: any) {

    console.log(environment.baseUrl + `/experience/`)
    console.log("experience  : ", experience)
    return this.http.post(environment.baseUrl + `/experience/`, experience)
  }
  getExperience() {

    return this.http.get(environment.baseUrl + "/experience/")
  }
  getExperiencebyid(id: any) {

    return this.http.get(environment.baseUrl + `/experiencee/${id}`)
  }
  deleteexp(id: any) {
    return this.http.delete(environment.baseUrl + `/experience/${id}`)
  }

  updateexp(id: any, experience: any) {
    return this.http.put(environment.baseUrl + `/experience/${id}`, experience)
  }
  /*********************************************************************** */



  /***************************************************************************** */
  addCompetence(competence: any) {

    console.log(environment.baseUrl + `/competence/`)
    console.log("competence  : ", competence)
    return this.http.post(environment.baseUrl + `/competence/`, competence)
  }

  getCompetence() {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(environment.baseUrl + "/competence/",)
  }
  getCompetencebyid(id: any) {

    return this.http.get(environment.baseUrl + `/competencee/${id}`)
  }
  delcompetence(id: any) {
    let token = localStorage.getItem('token');
    return this.http.delete(environment.baseUrl + `/competence/${id}/${token}`)
  }

  updatecomp(id: any, competence: any) {
    return this.http.put(environment.baseUrl + `/competence/${id}`, competence)
  }

  /*********************************************************** */
  addlangue(langue: any) {


    return this.http.post(environment.baseUrl + `/langue/`, langue)
  }

  getlangue() {

    return this.http.get(environment.baseUrl + "/langue/")
  }
  getlanguebyid(id: any) {

    return this.http.get(environment.baseUrl + `/languebyid/${id}`)
  }





  deletelangue(id: any) {
    return this.http.delete(environment.baseUrl + `/langue/${id}`)
  }

  updatelangue(id: any, langue: any) {
    return this.http.put(environment.baseUrl + `/langue/${id}`, langue)
  }


}
