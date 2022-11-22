import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-detailcondidate',
  templateUrl: './detail-condidate.component.html',
  styleUrls: ['./detail-condidate.component.css']
})
export class DetailCondidateComponent implements OnInit {
  formfree: FormGroup
  freelance_entreprise: any
  logo: any
  user: any
  cheminCV: any = ""
  cheminImage: any = ""
  token = localStorage.getItem('token')
  constructor(private formBuilder: FormBuilder, private authservice: AuthServiceService) { }

  ngOnInit(): void {
    this.getprofil()
    this.formfree = this.formBuilder.group({

      username: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      adresseFree: ['', Validators.required],
      cv: ['', Validators.required],
      date_naissance: ['', Validators.required],
      genre: ['', Validators.required],

    })
  }

  getprofil() {

    this.authservice.getprofil(this.token).subscribe((res: any) => {

      if (localStorage.getItem('role') == 'ROLE_FREELANCER') {

        this.formfree.patchValue({

          email: res['user']['email'],
          username: res['user']['username'],
          nom: res.freelance_entreprise['nom'],

          prenom: res.freelance_entreprise['prenom'],
          date_naissance: res.freelance_entreprise['date_naissance'],
          telephone: res.freelance_entreprise['telephone'],
          genre: res.freelance_entreprise['genre'],
          adresseFree: res.freelance_entreprise['adresseFree'],
          cv: res.freelance_entreprise['cv'],


        })
        this.cheminImage = res.freelance_entreprise['ImageFree'],
          this.cheminCV = res.freelance_entreprise['cv']

      }




    })

  }

}
