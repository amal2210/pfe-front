import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ListOfCompanyService } from 'src/app/services/list-of-company.service';
import { UploadService } from 'src/app/services/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-companyprofil',
  templateUrl: './companyprofil.component.html',
  styleUrls: ['./companyprofil.component.css']
})
export class CompanyprofilComponent implements OnInit {
  companies: any
  formCom: FormGroup
  submitted = false;
  message: boolean
  user: any
  file: File;
  id = this.activatedRoute.snapshot.params['id'];
  email = localStorage.getItem("email");
  username = localStorage.getItem("username");
  token = localStorage.getItem('token')
  userconnect = localStorage.getItem("user_id");
  submitcompany = false
  logo: any = ""
  formLogo: FormGroup
  forminput: FormGroup
  freelance_entreprise: any;
  closeResult = ''
  constructor(private FormBuilder: FormBuilder, private companyservice: ListOfCompanyService,
    /*pour details*/private activatedRoute: ActivatedRoute, private route: Router, private modalService: NgbModal,
    private uploadservice: UploadService, private upl: FormBuilder, private authservice: AuthServiceService) { }



  ngOnInit(): void {
    this.getprofil(),
      this.formCom = this.FormBuilder.group({

        username: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),]],
        nom_entreprise: ['', Validators.required],
        type_entreprise: ['', Validators.required],
        secteur_activite: ['', Validators.required],
        email: ['', [Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        telephone: ['', [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
        Validators.pattern("[0-9]{8,}")]],
        adresse: ['', Validators.required],
        logo: ['', Validators.required],
        descrip: ['', Validators.required],

      });
    this.formLogo = this.FormBuilder.group({
      logo: ['', Validators.required],
    });
    this.forminput = this.FormBuilder.group({

      token: ['', Validators.required],
      type: ['', Validators.required],
      url: ['', Validators.required],
    })





  }


  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.uploadservice.uploadfile(this.file).subscribe((result: any) => {
      this.logo = result['name']


    }, err => {

      console.log("error ", err)
    }
    )

  }


  uploadImage() {

    this.forminput.patchValue({


      token: localStorage.getItem('token'),
      url: this.logo,
      type: 'logo'
    })
    this.uploadservice.updateFile(this.forminput.value).subscribe((res: any) => {

      if (res.status == true) {
        Swal.fire({
          'icon': 'success',
          'text': 'Photo mis à jour'

        })
      }
    }
    )
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
      }

    })

  }
  /******************************************** */
  openprofilcomapny(profilcompany: any, comp: any) {



    this.modalService.open(profilcompany, { ariaLabelledBy: 'modal-basic-title', size: 'm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  updateprofil() {
    this.submitcompany = true;
    console.log("company here ", this.formCom.value)


    // stop here if form is invalid
    if (this.formCom.invalid) {
      return;
    }


    this.authservice.updateprofil(this.token, this.formCom.value).subscribe(
      (result: any) => {

        if (result.status) {


          console.log(result.status)
          Swal.fire({
            'icon': 'success',
            'text': 'edit profil'

          })
          //get

        }


        //update produit directement sans reload page
        // ma8irha 



      }
    )

  }

  open(content: any, logo: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md' }).result.then((result) => {
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




  get f() {
    return this.formCom.controls;
  }
}