import { Component, OnInit, Output } from '@angular/core';
import { EmailValidator, FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';

import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: any
  logo: any
  emailexiste = false
  emailexiste1 = false
  info: any
  token = localStorage.getItem('token')
  message = "user ou pass"
  date = new Date().toISOString().split('T')[0].toString()
  loginForm: FormGroup;
  registerForm: FormGroup
  registerFreeForm: FormGroup
  formmail: FormGroup;
  image: any
  submit = false;
  submitt = false
  submitted = false
  erreurlogin = false
  descavtivecompte:any
  
  decoded: any
  state = localStorage.getItem('state')
  userconnect = localStorage.getItem("user_id")
  closeResult = '';
  constructor(private fb: FormBuilder,
    private fb1: FormBuilder, private formm1: FormBuilder,
    private fbfree: FormBuilder, private modalService: NgbModal,
    private router: Router, private authentifier: AuthServiceService) {



  }

  ngOnInit(): void {
    this.getprofil()
    this.getinfo()
    this.registerForm = this.fb1.group({

      username: ['',
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)]],

      email: ['', [Validators.required, Validators.email,
      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      nom_entreprise: ['', [Validators.required]],
      type_entreprise: ['', [Validators.required]],
      secteur_activite: ['', [Validators.required]],


      telephone: [
        '', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),

          Validators.pattern("[0-9]{8,}")
        ]
      ],
      adresse: ['', [Validators.required]],


      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]

    },
      {
        validator: MustMatch('password', 'confirmPassword')
      });


    /////////////////////////////registerfreeeeeeee////////////////////////////////////


    this.registerFreeForm = this.fbfree.group({

      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      date_naissance: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      telephone: [
        '', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern("[0-9]{8,}")
        ]
      ],


      AdresseFree: ['', [Validators.required]],


      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]

    },
      {
        validator: MustMatch('password', 'confirmPassword')
      });

    /////////////////////logggggggginnnnnnnnnnnnnnnnnnn/////////////////////////////////////


    this.loginForm = this.fb.group({

      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });
    this.formmail = this.fb.group({
      email: ['', [Validators.required]]
    })


  }




  /***************************************************** */

  getinfo() {
    this.authentifier.gettoken(this.token).subscribe((res: any) => {

      if (res.status == true) {
        this.info = res

      }
    })
  }
  ////////////////////////registerrrrrrrrrr/////////////////////////////////////
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  get f1() { return this.registerForm.controls; }
  get free() { return this.registerFreeForm.controls; }

  login() {
    this.submit = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.erreurlogin=true
      return;
    }

    this.authentifier.postLogin(this.loginForm.value).subscribe((res: any) => {

      //va retourner role/token/status
      if (res['status'] == true) {
        localStorage.setItem("state", "1")
        // Setting the token in the local storage
        localStorage.setItem("token", res["token"])
        //va retourner les info user telque email/username/id
        this.authentifier.gettoken(res["token"]).subscribe((resToken: any) => {

          if (resToken.status == true) {

            localStorage.setItem("email", resToken.user.email);
            localStorage.setItem("role", res['role']);
            localStorage.setItem("user_id", resToken.user.id);
            localStorage.setItem("username", resToken.user.username);
            localStorage.setItem("autorized", resToken.user.autorized);

            if (resToken.user.autorized == 0) {
              //redirection vers page omptetane
              
              this.router.navigate(['/dashboard-condidate/resume']).then(() => {
                window.location.reload();
              });
             // this.router.navigateByUrl("/dashboard-condidate/resume")
            

            }
            else {
              location.reload();
              this.router.navigateByUrl("/dashboard-condidate")


            }


          }

        });


      }
      else {
        localStorage.setItem("state", "0")

        this.descavtivecompte = "compte n'existe pas";
      }


    })

  }


  onReset() {
    this.submit = false;
    this.loginForm.reset();
  }



  register() {
    this.submitt = true;
    if (this.registerForm.invalid) {

      return;
    }

    this.authentifier.postRegister(this.registerForm.value).subscribe((res: any) => {

      if (res.status == true) {
        Swal.fire({
          title: `Bienvenue dans FreeSeason`,
          text: 'Modal with a custom image.',
          imageUrl: `https://127.0.0.1:8000/uploads/freelance.jpeg`,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          
        })

      }
      else {

        this.emailexiste = true
      }

      //  this.router.navigateByUrl("/dashbord-employer")

    }, err => {
      Swal.fire({
        title: "probléme dans l'inscription, veuillez réessayer ultérieurement",
        icon: 'error'
      })


    })
  }
  onReg() {
    this.submitt = false;
    this.registerForm.reset();
  }

  /************************************** */

  /******************************************* */

  logout() {


    localStorage.removeItem('token')

    localStorage.clear()
    this.router.navigateByUrl("/")

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








  /////////////register freelancers//////////////////////////////////////////////////////


  registerFree() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerFreeForm.invalid) {

      return;
    }


    this.authentifier.registerFree(this.registerFreeForm.value).subscribe((res: any) => {

      if (res.status == true) {
        Swal.fire({
          title: `Bienvenue dans FreeSeason`,
          text: 'Modal with a custom image.',
          imageUrl: `https://127.0.0.1:8000/uploads/freelance.jpeg`,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          
        })

      }
      else {
        this.emailexiste1 = true
      }


    }, err => {

      Swal.fire({
        title: "probléme dans l'inscription, veuillez réessayer ultérieurement",
        icon: 'error'
      })
    })


  }
  onRegFree() {
    this.submitted = false;
    this.registerFreeForm.reset();
  }


  /************************************************************************ */

  forgetpassword() {
    this.authentifier.forgetpassword(this.formmail.value).subscribe((res: any) => {
      if (res.status == true) {
        Swal.fire({
          icon: 'success',
          title: res.message
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        })
      }
    })
  }


  getprofil() {
    this.authentifier.getprofil(this.token).subscribe((res: any) => {

      if (localStorage.getItem('role') == 'ROLE_COMPANY') {

        this.username = res.user.username,

          this.logo = res.freelance_entreprise.logo

      }
      if (localStorage.getItem('role') == "ROLE_FREELANCER") {

        this.username = res.user.username,

          this.image = res.freelance_entreprise['ImageFree']

      }

    })

  }
  oubliemotdepasse(motdepasse: any) {

    this.modalService.open(motdepasse, { ariaLabelledBy: 'modal-basic-title', size: 'md' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
