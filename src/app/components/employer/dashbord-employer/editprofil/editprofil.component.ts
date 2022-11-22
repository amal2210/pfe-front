import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-editprofil',
  templateUrl: './editprofil.component.html',
  styleUrls: ['./editprofil.component.css']
})
export class EditprofilComponent implements OnInit {

  //ya3mil capture lil id 
  id = this.activatedRoute.snapshot.params['id']
  //declarer formulaire
  formCom: FormGroup
  logo: any = ""
  freelance_entreprise: any
  user: any
  token = localStorage.getItem('token')
  userconnect = localStorage.getItem("username")
  offres: any
  file: File;
  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authservice: AuthServiceService) { }



  ngOnInit(): void {
    console.log("userconnect", this.userconnect)


    this.getprofil()
    /*pour formulaire update  */
    this.formCom = this.formBuilder.group({

      username: ['', Validators.required],
      nom_entreprise: ['', Validators.required],
      type_entreprise: ['', Validators.required],
      secteur_activite: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      logo: ['', Validators.required],
      descrip: ['', Validators.required],

    },
    );



    //recuperer les valeurs de formulaire

  }

  getprofil() {

    this.authservice.getprofil(this.token).subscribe((res: any) => {

      if (localStorage.getItem('role') == 'ROLE_COMPANY') {

        this.formCom.patchValue({

          email: res['user']['email'],
          username: res['user']['username'],
          nom_entreprise: res.freelance_entreprise['nom_entreprise'],
          type_entreprise: res.freelance_entreprise['type_entreprise'],
          secteur_activite: res.freelance_entreprise['secteur_activite'],
          telephone: res.freelance_entreprise['telephone'],
          adresse: res.freelance_entreprise['adresse'],
          logo: res.freelance_entreprise['logo'],
          descrip: res.freelance_entreprise['descrip'],


        })
        this.user = res.user,
          this.freelance_entreprise = res.freelance_entreprise,
          this.logo = res.freelance_entreprise['logo']
        this.offres = res.freelance_entreprise['offres']
      }

    })

  }






}