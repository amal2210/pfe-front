import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FreelancersService } from 'src/app/services/freelancers.service';
import { ResumeService } from 'src/app/services/resume.service';
import { UploadService } from 'src/app/services/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-resume',
  templateUrl: './create-resume.component.html',
  styleUrls: ['./create-resume.component.css']
})
export class CreateResumeComponent implements OnInit {
  formLogo: FormGroup
  UrlCv: any = ""
  formExperience: FormGroup
  formEducation: FormGroup
  formCompetence: FormGroup
  formlangue: FormGroup
  submit1 = false;
  submit2 = false;
  submit3 = false;
info:any
  submit4 = false;
  type: any
  file: File
  experience: any
  competence: any
  formation: any
  langue: any
  userconnect = localStorage.getItem("user_id")
  token = localStorage.getItem("token")
  url: any
  formfile: FormGroup
  progressValue: number = 3;
  totalValue: number = 12;
  percentagevalue: number;
  competenceValue = 0
  formationValue = 0
  experienceValue = 0
  langueValue = 0
  freelance_entreprise: any
  width: any = 0
  freelancers: any
  
  userr: any
  id = this.activatedRoute.snapshot.params['id']
  constructor(private resume: ResumeService, private formBuilder: FormBuilder, private route: Router,
    private activatedRoute: ActivatedRoute, private free: FreelancersService,
    private authservice: AuthServiceService,
    private upload: UploadService) {

  }
  ngOnInit(): void {

    this.getprofil()
    this.getinfo()
    this.formExperience = this.formBuilder.group({
      titre: ['', Validators.required],
      societe: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required,],
      details: [''],
      user: ['', Validators.required],

    })

    this.formEducation = this.formBuilder.group({
      nom_ecole: ['', Validators.required],
      titre_diplome: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required,],
      details: [''],
      user: ['', Validators.required],

    })
    this.formCompetence = this.formBuilder.group({
      titre: ['', Validators.required,],
      niveau: ['', Validators.required],
      user: ['', Validators.required],

    })
    this.formlangue = this.formBuilder.group({
      name_langue: ['', Validators.required,],
      niveau: ['', Validators.required],
      user: ['', Validators.required],

    })


    this.formLogo = this.formBuilder.group({

      token: ['', Validators.required],
      type: ['', Validators.required],
      url: ['', Validators.required],
    })
    this.formfile = this.formBuilder.group({
      file: ['', Validators.required],
    })
  }
  getinfo() {
    this.authservice.gettoken(this.token).subscribe((res: any) => {

      if (res.status == true) {
        this.info = res.autorized
        
        console.log("c e s mes info",  this.info)
        
        
      
      }
    })}
  updateValue() {


  }
  get f() {
    return this.formExperience.controls;
  }
  get f1() {
    return this.formCompetence.controls;
  }
  get f2() {
    return this.formEducation.controls;
  }
  get f3() {
    return this.formlangue.controls;
  }
  getprofil() {

    this.authservice.getprofil(this.token).subscribe((res: any) => {

      if (localStorage.getItem('role') == 'ROLE_FREELANCER') {

        if (res.status == true) {
          this.experience = res.freelance_entreprise.experiences
          this.formation = res.freelance_entreprise.formations
          this.competence = res.freelance_entreprise.competances
          this.langue = res.freelance_entreprise.langues
          this.userr = res.user



        }
        if (this.competence.length !== 0) {
          this.competenceValue = 3
          console.log('mescompetence', this.competenceValue)

        }
        if (this.experience.length !== 0) {
          this.experienceValue = 3
          console.log('mesexp', this.experienceValue)
        }
        if (this.formation.length !== 0) {
          this.formationValue = 3
          console.log('mesforma', this.formationValue)
        }
        if (this.langue.length !== 0) {
          this.langueValue = 3
          console.log('langue', this.langueValue)
        }
        this.percentagevalue = (((this.competenceValue + this.formationValue + this.experienceValue + this.langueValue) * 100) / 12);

        console.log('percentage%', this.percentagevalue)
        
      }




    })

  }





  ajouterExperience() {
    this.submit1 = true;
    this.formExperience.patchValue({
      user: this.userconnect
    })

    //control de saisie
    if (this.formExperience.invalid) {
      return;
    }

    if (this.formExperience.value.date_debut <= this.formExperience.value.date_fin) {
      this.resume.addExperience(this.formExperience.value).subscribe(
        (result: any) => {
          console.log(result)
          Swal.fire({
            icon: 'success',
            text: 'Expérience a été ajoutée',
            confirmButtonColor: '#28b661'
          })

          window.location.reload()
        }, err => {

          console.log("error ", err)
        }
      )
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Date de début doit être inférieur à date de fin ',
        confirmButtonColor: '#28b661'
      })
    }




  }


  addeducation() {
    this.submit2 = true;
    this.formEducation.patchValue({
      user: this.userconnect
    })

    // control de saisie
    if (this.formEducation.invalid) {

      return;
    }
    if (this.formEducation.value.date_debut <= this.formEducation.value.date_fin) {
      this.resume.addEDucation(this.formEducation.value).subscribe(
        (result: any) => {
          console.log(result)
          Swal.fire({
            icon: 'success',
            text: 'Formation a été ajoutée',
            confirmButtonColor: '#28b661'
          })

          window.location.reload()
        }, err => {

          console.log("error ", err)
        }
      )
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Date de début doit être inférieur à date de fin ',
        confirmButtonColor: '#28b661'
      })
    }
  }



  ajouterCompetence() {
    this.submit3 = true;
    this.formCompetence.patchValue({
      user: this.userconnect
    })

    if (this.formCompetence.invalid) {
      return;
    }

    this.resume.addCompetence(this.formCompetence.value).subscribe(
      (result: any) => {

        Swal.fire({
          icon: 'success',
          text: 'Compétence a été ajoutée',
          confirmButtonColor: '#28b661'
        })

        window.location.reload()
      }, err => {

        console.log("error ", err)
      }
    )


  }


  addlangue() {
    this.submit4 = true;
    this.formlangue.patchValue({
      user: this.userconnect
    })
    //control de saisie
    if (this.formlangue.invalid) {

      return;
    }
    this.resume.addlangue(this.formlangue.value).subscribe(
      (result: any) => {
        console.log(result)
        Swal.fire({
          icon: 'success',
          text: 'Langue a été ajoutée',
          confirmButtonColor: '#28b661'

        })

        window.location.reload()
      }, err => {

        console.log("error ", err)
      }
    )


  }



  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.upload.uploadfile(this.file).subscribe((result: any) => {

      this.formLogo.patchValue({


        token: localStorage.getItem('token'),
        url: result.name,
        type: 'cv'
      })


    }, err => {

      console.log("error ", err)
    }
    )

  }
  uploadcv() {
    this.upload.updateFile(this.formLogo.value).subscribe((res: any) => {

      if (res.status == true) {
        Swal.fire({
          icon: 'success',
          text: 'edit profil',
          confirmButtonColor: '#28b661'

        })
      }
    }
    )
  }


}