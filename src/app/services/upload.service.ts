import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadfile(file: any) {

    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file, file.name);
    return this.http.post(environment.baseUrl + "/api/upload", formData);
  }


  updateFile(object: any) {


    return this.http.post(environment.baseUrl + "/api/upload/url", object);
  }
  submitCondidature(object: any) {
    return this.http.post(environment.baseUrl + "/api/submitCondidature/add", object)
  }




}
