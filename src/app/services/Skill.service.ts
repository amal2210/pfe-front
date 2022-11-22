import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class SkillService {

    constructor(private http: HttpClient) { }

    getskill() {
        return this.http.get(environment.baseUrl + "/skill");
    }
    getoneSkill(id: any) {
        return this.http.get(environment.baseUrl + `/skill/${id}`);

    }
    addskill(skill: any) {

        console.log(environment.baseUrl + `/skill/`);
        console.log("skill : ", skill);
        return this.http.post(environment.baseUrl + `/skill/`, skill);
    }

    deleteSKill(id: any) {
        return this.http.delete(environment.baseUrl + `/skill/${id}`);
    }
    updateSkill(id: any, skill: any) {
        return this.http.put(environment.baseUrl + `/entreprise/${id}`, skill);
    }
}
