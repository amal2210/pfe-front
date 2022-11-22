import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ListOfCompanyService } from 'src/app/services/list-of-company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  formCom: FormGroup
  submit = false;
  constructor(private companyservice: ListOfCompanyService,
    private formBuilder: FormBuilder, private route: Router, private router: Router, private authentifier: AuthServiceService) { }

  ngOnInit(): void {
    this.formCom = this.formBuilder.group({
      nom_entreprise: ['', Validators.required, Validators.minLength(6)],
      type_entreprise: ['', Validators.required],
      secteur_activite: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      username: ['', [Validators.required]],
      logo: ['', Validators.required],
      telephone: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8)
        ]
      ],
      adresse: ['', Validators.required],

      descrip: ['', Validators.required],

    })
  }

  get f() {
    return this.formCom.controls;
  }
  ajouter() {
    this.submit = true;
    if (this.formCom.invalid) {
      return;
    }

    this.companyservice.addCompany(this.formCom.value).subscribe(
      (result: any) => {
        console.log(result)
        Swal.fire({
          'icon': 'success',
          'text': 'Your Account has been successfully created. '
        })
        this.route.navigateByUrl('/categorie')
      }, err => {

        console.log("error ", err)
      }
    )
  }


  register() {

    console.log("register before", this.formCom.value)

    this.submit = true;

    // stop here if form is invalid
    if (this.formCom.invalid) {
      return;
    }
    console.log("register after ", this.formCom.value)
    //     this.authentifier.postRegister(this.formCom.get("username")?.value, this.formCom.get("password")?.value, this.formCom.get("email")?.value).subscribe((res: any) => {


    //       console.log("register to freeseason ", res["token"])
    //       localStorage.setItem("state", "1")

    //       // Setting the token in the local storage
    //       localStorage.setItem("token", res["token"])

    //       window.location.href = "http://localhost:4200/dashbord-employer"
    //       //  this.router.navigateByUrl("/dashbord-employer")

    //     }, err => {
    // console.log(" failed to register")
    //     })


  }
} 