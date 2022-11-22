import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CondidatService } from 'src/app/services/condidat.service';
import { FreelancersService } from 'src/app/services/freelancers.service';
import { JobService } from 'src/app/services/job.service';
import { ListOfCompanyService } from 'src/app/services/list-of-company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  offres: any
  company: any
  condidatures: any
  dash:any
  freelancers: any
  token = localStorage.getItem("token")

  userconnect = localStorage.getItem("user_id")
  id = this.activatedRoute.snapshot.params['id']
  constructor(

    private activatedRoute: ActivatedRoute,
    private offreservice: JobService,
    private condidatureSer: CondidatService,
    private freelancerservice: FreelancersService,
    private comser: ListOfCompanyService) { }

  ngOnInit(): void {
  
  }
 
 
  getdashboard() {
    this.comser.dashboardcompany(localStorage.getItem('token')).subscribe((res: any) => {
      if(res.status==true){
        this.dash = res
        
        console.log(this.dash )
      }else
        {
Swal.fire({
  icon:'error',
  title:res.message
})
        }
      
     
      console.log("list of dashboard", this.dash)
    })
  }


  isrolecompany() {
    return localStorage.getItem('role') == "ROLE_COMPANY" ? true : false
  }
  isroleREE() {
    return localStorage.getItem('role') == "ROLE_FREELANCER" ? true : false
  }
}