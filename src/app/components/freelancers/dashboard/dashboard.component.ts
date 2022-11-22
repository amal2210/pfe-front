import { Component, OnInit } from '@angular/core';
import { FreelancersService } from 'src/app/services/freelancers.service';
import { ListOfCompanyService } from 'src/app/services/list-of-company.service';
import { CondidatService } from 'src/app/services/condidat.service';
import { JobService } from 'src/app/services/job.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit {
  company: any
  freelancer: any
  condidature: any
  id = this.activatedRoute.snapshot.params['id']
  offres: any
  resdashboard:any=[]
  constructor(private entre: ListOfCompanyService, private free: FreelancersService,
    private condidatser: CondidatService, private offre: JobService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getcompany()
    this.getdashboard()
   
  }
  getcompany() {
    this.entre.getlistofCompany().subscribe((res: any) => {
      this.company = res
      console.log("list of company", this.company)
    })
  }

  getdashboard() {
    this.condidatser.dashboard(localStorage.getItem('token')).subscribe((res: any) => {
      if(res.status==true){
        this.resdashboard = res
        
        console.log(this.resdashboard )
      }else
        {
Swal.fire({
  icon:'error',
  title:res.message
})
        }
      
     
      console.log("list of dashboard", this.resdashboard)
    })
  }


 


  getcondidat() {
    this.condidatser.getCondidatureById(this.id).subscribe((res: any) => {
      this.condidature = res.filter((el:any)=>el.freelancer.user)
      console.log("list of condidat", this.condidature)
    })
  }
  getoffre() {
    this.offre.getOffre().subscribe((res: any) => {
      this.offres = res
      console.log("list of off", this.offres)
    })
  }



  isrolecompany() {
    return localStorage.getItem('role') == "ROLE_COMPANY" ? true : false
  }
  isroleREE() {
    return localStorage.getItem('role') == "ROLE_FREELANCER" ? true : false
  }
}
