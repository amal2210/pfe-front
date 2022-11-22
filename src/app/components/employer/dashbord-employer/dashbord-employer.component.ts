import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ListOfCompanyService } from 'src/app/services/list-of-company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashbord-employer',
  templateUrl: './dashbord-employer.component.html',
  styleUrls: ['./dashbord-employer.component.css']
})
export class DashbordEmployerComponent implements OnInit {
  token = localStorage.getItem('token')
  user_id=localStorage.getItem('user_id')
  constructor(private router:Router,private auth:AuthServiceService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {

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
