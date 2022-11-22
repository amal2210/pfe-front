import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FreelancersService } from 'src/app/services/freelancers.service';
import { JobService } from 'src/app/services/job.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashbord-condidate',
  templateUrl: './dashbord-condidate.component.html',
  styleUrls: ['./dashbord-condidate.component.css']
})
export class DashbordCondidateComponent implements OnInit {
  offres: any
  user_id=localStorage.getItem('user_id')
  token = localStorage.getItem('token')
  info: any=[]
  freelancers:any
  attr=false
  id = this.activatedRoute.snapshot.params['id']
res1:any
  constructor(private offre: JobService,private router:Router,
    private auth: AuthServiceService,private activatedRoute:ActivatedRoute,
    private free :FreelancersService
  ) { }

  ngOnInit(): void {
    this.getAllOffre()
    this.getinfo()
    
  }
  getinfo() {
    this.auth.gettoken(this.token).subscribe((res: any) => {

      if (res.status == true) {
        this.info = res.user
        
        console.log("c e s mes info",  this.info)
        
        
      
      }
    })
  }
  getAllOffre() {
    this.offre.getOffre().subscribe((res: any) => {
      this.offres = res
      console.log("list of offres", this.offres)
    })
  }
  isrolecompany() {
    return localStorage.getItem('role') == "ROLE_COMPANY" ? true : false
  }
  isroleREE() {
    return localStorage.getItem('role') == "ROLE_FREELANCER" ? true : false
  }

  isConnect() {

    return localStorage.getItem('state') == "1" ? true : false

  }
 
  descativercompte(){
    Swal.fire({
      title: 'Êtes-vous sûr de désactiver votre compte?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33 ',
      cancelButtonColor: '#28b661',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'OUI, désactiver!'
      
    }).then((result) => {
      if (result.isConfirmed) {
   
    this.auth.desactivercompte(this.user_id).subscribe((res :any)=> {
                  if (res.status==true)
                  { 
                  Swal.fire(
                    '',
                    'votre compte a été desactivé avec succés',
                    'success'
                  )
                  localStorage.clear()
                  this.router.navigateByUrl('**')
                  }
                else{

                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: res.message,
                    showConfirmButton: false,
                    
                  })
              
                }})
              }
     
  })}
  
  
  
}
