import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CondidatService } from 'src/app/services/condidat.service';

import { JobService } from 'src/app/services/job.service';
import { UploadService } from 'src/app/services/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detailjob',
  templateUrl: './detailjob.component.html',
  styleUrls: ['./detailjob.component.css']
})
export class DetailjobComponent implements OnInit {
  anciencv:any=""
  offre: any=[]
  entreprises:any=[]
  submit = false
  //capturer id pou detail
  id = this.activatedRoute.snapshot.params['id']
  cheminCV: any
skil:any
  file: File
  formcondidature: FormGroup
  cv:any
  condidature: any
  token = localStorage.getItem("token")
  userconnect = localStorage.getItem("user_id")
  date = new Date().toISOString().split('T')[0].toString()
  constructor(private offreService: JobService, private activatedRoute: ActivatedRoute,
    private condidat: CondidatService, private formBuilder: FormBuilder,
    private upload: UploadService,private authservice:AuthServiceService) { }

  ngOnInit(): void {

    this.getoffrebyid()
    this.getcv()
    this.formcondidature = this.formBuilder.group({



      cheminCV: ['', Validators.required],
      offre_id: ['', Validators.required],
      user_id: ['', Validators.required],
    //  CV:['', Validators.required]
      


    })

  }
  getanciencv(event: any) {
   this.anciencv= event.target.value
   console.log(this.anciencv)
  }
  getoffrebyid() {

    this.offreService.getOffreById(this.id).subscribe(

      (res: any) => {
       
        this.offre = res
        console.log("offres ", this.offre)
        this.entreprises=res.entreprise
        console.log("entreprise ", this.entreprises)

        // alert(this.offre.skills)
      })

  }
 



  isroleREE() {
    return localStorage.getItem('role') == "ROLE_FREELANCER" ? true : false
  }

  isConnect() {

    return localStorage.getItem('state') == "1" ? true : false

  }


  onFileSelected(event: any) {

    console.log('test')
    this.file = event.target.files[0];
    this.upload.uploadfile(this.file).subscribe((result: any) => {

      this.cheminCV = result.name


    }, err => {

      console.log("error ", err)
    }
    )

  }
  postcondidature() {

    this.formcondidature.patchValue({
      user_id: this.userconnect,
      offre_id: this.offre.id,
      cheminCV: this.cheminCV,
    //  CV:this.anciencv
    })
    
    this.upload.submitCondidature(this.formcondidature.value).subscribe((res: any) => {

      if (res.status == true) {
        Swal.fire({
          icon: 'success',
          text: res.message,
          confirmButtonColor:'#28b661'

        })
      }
      else {
        Swal.fire({
          icon: 'error',
          text: res.message,
          confirmButtonColor:'#28b661'

        })
      }
    }
    )
  }



  getcv() {

    this.authservice.getprofil(this.token).subscribe((res: any) => {

      if (localStorage.getItem('role') == 'ROLE_FREELANCER') {
        this.cv = res.freelance_entreprise['cv']
      }})}
}

