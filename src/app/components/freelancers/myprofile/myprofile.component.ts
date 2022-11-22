import { ThisReceiver } from '@angular/compiler';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FreelancersService } from 'src/app/services/freelancers.service';
import { JobService } from 'src/app/services/job.service';
import { ListOfCompanyService } from 'src/app/services/list-of-company.service';
import { ResumeService } from 'src/app/services/resume.service';
import { UploadService } from 'src/app/services/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  invalid = false
  verif: any
  errordatemsg: any = ""
  experiences: any
  cheminImage: any = ""
  cheminCV: any = ""
  competences: any
  isImageLoading: boolean
  formExperience: FormGroup
  formlangue: FormGroup
  langues: any
  formLogo: FormGroup
  formcv:FormGroup
  filter: any
  educations: any
  freelancer: any
  file: File
  message: boolean
  formfree: FormGroup
  forminput: FormGroup
  formCompetence: FormGroup
  imageToShow: any;
  url: any
  user: any
  submit = false
  submit1 = false
  submit2 = false
  submit3 = false
  subfree = false
  formEducation: FormGroup
  offres: any
  msg: string
  closeResult = '';
  freelance_entreprise: any
  formreview: FormGroup
  token = localStorage.getItem('token')
  user_id = localStorage.getItem('user_id')

  date = new Date().toISOString().split('T')[0].toString()
  id = this.activatedRoute.snapshot.params['id']
  constructor(private resume: ResumeService, private activatedRoute: ActivatedRoute,
    private freelancerservice: FreelancersService, private authservice: AuthServiceService,
    private formBuilder: FormBuilder, private sanitizer: DomSanitizer,
    private uploadservice: UploadService, private companyser: ListOfCompanyService,
    private modalService: NgbModal, private offre: JobService) { }

  ngOnInit(): void {

    this.getAllOffre()

    this.getprofil()

    this.formreview = this.formBuilder.group({
      freelance_id: ['', Validators.required],
      offre_id: ['', Validators.required],
      token: ['', Validators.required],
      message: ['', Validators.required],
      note: ['', Validators.required],
      entreprise_id: ['', Validators.required],

    })

    this.formExperience = this.formBuilder.group({
      id: ['', Validators.required],
      titre: ['', Validators.required],
      societe: ['', Validators.required],
      details: ['', Validators.required],
      user: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required,],

    })

      this.formEducation = this.formBuilder.group({
        id: ['', Validators.required],
        nom_ecole: ['', Validators.required],
        titre_diplome: ['', Validators.required],
        date_debut: ['', Validators.required],
        date_fin: ['', Validators.required,],
        details: [''],
        user: ['', Validators.required],

      })
    this.formCompetence = this.formBuilder.group({
      id: ['', Validators.required],
      titre: ['', Validators.required,],
      niveau: ['', Validators.required],
      user: ['', Validators.required],

    })
    this.formlangue = this.formBuilder.group({
      id: ['', Validators.required],
      name_langue: ['', Validators.required,],
      niveau: ['', Validators.required],
      user: ['', Validators.required],

    })
    this.formfree = this.formBuilder.group({

      username: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      telephone: ['', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
      Validators.pattern("[0-9]{8,}")]],
      adresseFree: ['', Validators.required],
      
      date_naissance: ['', Validators.required],
      genre: ['', Validators.required],

    },
    );
    this.formLogo = this.formBuilder.group({
      ImageFree: ['', Validators.required],
    })
    this.formcv = this.formBuilder.group({
      cv: ['', Validators.required],
    })

    this.forminput = this.formBuilder.group({

      token: ['', Validators.required],
      type: ['', Validators.required],
      url: ['', Validators.required],
    })
  }



  







  updateprofil() {

    this.subfree = true;
    console.log("loginto ", this.formfree.value)


    // stop here if form is invalid
    if (this.formfree.invalid) {
      return;
    }

    this.authservice.updateprofil(this.token, this.formfree.value).subscribe(
      (result: any) => {

        if (result.status) {


          console.log(result.status)
          Swal.fire({
            'icon': 'success',
            'text': 'profil mis à jour'

          })
          //  this.()

        }
      })

  }
  /********************************updateprofileimage************************************* */
  /***************************************************************************** */

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.uploadservice.uploadfile(this.file).subscribe((result: any) => {
      console.log(this.cheminImage)
      this.cheminImage = result['name'];


    }, err => {

      console.log("error ", err)
    }
    )

  }


  uploadImage() {
    this.forminput.patchValue({


      token: localStorage.getItem('token'),
      url: this.cheminImage,
      type: 'ImageFree'
    })
    this.uploadservice.updateFile(this.forminput.value).subscribe((res: any) => {

      if (res.status == true) {
        Swal.fire({
          icon: 'success',
          text: 'photo mis à jour',
          timer: 1500

        })
      }
    }
    )
  }




  /******************************************* */



  OnFileCV(event: any) {
    this.file = event.target.files[0];
    this.uploadservice.uploadfile(this.file).subscribe((result: any) => {

      this.forminput.patchValue({


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
    this.uploadservice.updateFile(this.forminput.value).subscribe((res: any) => {

      if (res.status == true) {
        Swal.fire({
          icon: 'success',
          text: 'cv mis à jour',
          confirmButtonColor: '#28b661'

        })
      }
    }
    )
  }

  /***************************************************************************** */
  /************************************************************** */
  /*************************experience******************** */
  open(content: any, exp: any) {

    this.formExperience.patchValue({
      id: exp.id,
      titre: exp.titre,
      societe: exp.societe,
      date_debut: exp.dateDebut,
      date_fin: exp.dateFin,
      details: exp.details,
      user: this.user_id


    })


    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'm' }).result.then((result) => {
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

  updateexperience() {

    this.verif = this.invalid
    this.submit1 = true;

    //control de saisie
    if (this.formExperience.invalid ) {


      return;
    }
    if (this.formExperience.value.date_debut <= this.formExperience.value.date_fin)
{
    this.resume.updateexp(this.formExperience.value.id, this.formExperience.value).subscribe(
      (result: any) => {
        if (result.status == true) {
          Swal.fire({
            icon: 'success',
            text: 'Experience a été mis à jour',
            timer: 1500

          })

        }
        else {

          Swal.fire({
            'icon': 'error',
            'text': result.message,
            timer: 1500
          })
        }


      }

    )

  }else  {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Date de début doit être inférieur à date de fin ',
            confirmButtonColor:'#28b661'
          })}
        }

  deleteexperince(id: any) {
    Swal.fire({
      title: 'Êtes-vous sûr que vous voulez supprimer?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      //button confirmé
      confirmButtonColor: '#3085D6',
      //buton annuler
      cancelButtonColor: '#d33',
      cancelButtonText: "Annuler",
      confirmButtonText: 'Oui,supprimer!'
    }).then((result) => {
      //si on click sur confirmer la supprission
      if (result.isConfirmed) {
        //lancer la fonction delete
        this.resume.deleteexp(id).subscribe((res: any) => {
          console.log(res)
          Swal.fire(
            'supprimer!',
            'Expérience a été supprimé.',
            'success',

          )

        })
        //afficher supprission effectué avec succes

      }
    })
  }

  /*********************************************** */
  /**************************************************** */
  /**********************formation ************ */

  openformation(modal1: any, formation: any) {

    this.formEducation.patchValue({
      id: formation.id,
      titre_diplome: formation.titre,
      nom_ecole: formation.ecole,
      date_debut: formation.dateDebut,
      date_fin: formation.dateFin,
      details: formation.details,
      user: this.user_id



    })


    this.modalService.open(modal1, { ariaLabelledBy: 'modal-basic-title', size: 'm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }


  deleteformation(id: any) {


    Swal.fire({
      title: 'Êtes-vous sûr que vous voulez supprimer?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      //button confirmé
      confirmButtonColor: '#3085D6',
      //buton annuler
      cancelButtonColor: '#d33',
      cancelButtonText: "Annuler",
      confirmButtonText: 'Oui,supprimer!'
    }).then((result) => {
      //si on click sur confirmer la supprission
      if (result.isConfirmed) {
        //lancer la fonction delete
        this.resume.deleteeducation(id).subscribe((res: any) => {
          console.log(res)
          Swal.fire(
            'Supprimer!',
            'Formation a été supprimée.',
            'success'
          )
          window.location.reload()
        })
        //afficher supprission effectué avec succes

      }
    })
  }
  updateformation() {

    this.submit2 = true;
    //control de saisie
    if (this.formEducation.invalid) {

      return;
    }
    if (this.formExperience.value.date_debut <= this.formExperience.value.date_fin){
    this.resume.updatefor(this.formEducation.value.id, this.formEducation.value).subscribe(
      (result: any) => {
        if (result.status == true) {
          Swal.fire({
            'icon': 'success',
            'text': 'Formation a été mis à jour',
            timer: 1500

          })

        }
        else {

          Swal.fire({
            'icon': 'error',
            'text': result.message

          })
        }




        //update produit directement sans reload page
        // ma8irha 



      }
    )

  } Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Date de début doit être inférieur à date de fin ',
    confirmButtonColor:'#28b661'
  })} 
  /****************************************************************************** */
  /***************************************************************************
   * /***************************** competence********************************************** */

  opencompetence(modal2: any, competence: any) {

    this.formCompetence.patchValue({
      id: competence.id,
      titre: competence.titre,
      niveau: competence.niveau,
      user: this.user_id
    })


    this.modalService.open(modal2, { ariaLabelledBy: 'modal-basic-title', size: 'm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }

  deletecompetence(id: any) {


    Swal.fire({
      title: 'Êtes-vous sûr que vous voulez supprimer?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      //button confirmé
      confirmButtonColor: '#3085D6',
      //buton annuler
      cancelButtonColor: '#d33',
      cancelButtonText: "Annuler",
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      //si on click sur confirmer la supprission
      if (result.isConfirmed) {
        //lancer la fonction delete
        this.resume.delcompetence(id).subscribe((res: any) => {
          console.log(res)
          Swal.fire(
            'supprimer!',
            'Compétence a été supprimée.',
            'success'
          )
          window.location.reload()
        })
        //afficher supprission effectué avec succes

      }
    })
  }

  updatecompetence() {

    this.submit3 = true;
    //control de saisie
    if (this.formCompetence.invalid) {

      return;
    }

    this.resume.updatecomp(this.formCompetence.value.id, this.formCompetence.value).subscribe(

      (result: any) => {

        if (result.status == true) {

          Swal.fire({
            'icon': 'success',
            'text': 'Compétence a été mis à jour',
            timer: 1500

          })


        }
        //  else {

        //           Swal.fire({
        //             'icon': 'error',
        //             'text': result.message

        //           })
        //         }
        //update produit directement sans reload page
        // ma8irha 

      }
    )

  }


  /***********************************LANGUAGE**************************** */




  openlangue(MODAL3: any, l: any) {

    this.formlangue.patchValue({
      id: l.id,
      name_langue: l.name_langue,
      niveau: l.niveau,
      user: this.user_id



    })



    this.modalService.open(MODAL3, { ariaLabelledBy: 'modal-basic-title', size: 'm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }


  deletelangue(id: any) {


    Swal.fire({
      title: 'Êtes-vous sûr que vous voulez supprimer?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      //button confirmé
      confirmButtonColor: '#3085D6',
      cancelButtonText: "Annuler",
      //buton annuler
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      //si on click sur confirmer la supprission
      if (result.isConfirmed) {
        //lancer la fonction delete
        this.resume.deletelangue(id).subscribe((res: any) => {
          console.log(res)
          Swal.fire(
            'supprimer!',
            'Langue a été supprimée.',
            'success'
          )
          window.location.reload()
        })
        //afficher supprission effectué avec succes

      }
    })
  }
  updateLangue() {

    this.submit = true;
    //control de saisie
    if (this.formlangue.invalid) {

      return;
    }
    this.resume.updatelangue(this.formlangue.value.id, this.formlangue.value).subscribe(
      (result: any) => {
        if (result.status == true) {
          Swal.fire({
            'icon': 'success',
            'text': 'Langue a été mis à jour',
            timer: 1500

          })

        }
        else {

          Swal.fire({
            'icon': 'error',
            'text': result.message,
            timer: 1500

          })
        }




        //update produit directement sans reload page
        // ma8irha 



      }
    )

  }

  /* -------------controlle de champs-------------------           */

  get f() {
    return this.formExperience.controls;
  }
  get f2() {
    return this.formEducation.controls;
  }
  get f1() {
    return this.formCompetence.controls;
  }
  get f3() {
    return this.formlangue.controls;
  }

  get free() { return this.formfree.controls; }

 

  getAllOffre() {
    this.offre.getOffre().subscribe((res: any) => {
      this.offres = res
      console.log("list of offres profil", this.offres)
    })
  }

  review() {
    this.formreview.patchValue({
      token: this.token,
      freelance_id: this.freelancer.id,
      // entreprise_id:this.company.id
      //offre_id:this.offre.id
    })
    // this.companyser.review().subscribe((res:any)=>)
  }
  /***********************u******************* */

  openimage(image: any, img: any) {
    this.modalService.open(image, { ariaLabelledBy: 'modal-basic-title', size: 'm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**************************modifier profil */


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
         


        })
        this.cheminImage = res.freelance_entreprise['ImageFree'],
          this.cheminCV = res.freelance_entreprise['cv'],
         
          this.user = res.user,
          console.log('image free', this.cheminImage)
        this.freelance_entreprise = res.freelance_entreprise

        console.log('myprofilhejhj', JSON.stringify(res))
      }




    })

  }


  openprofil(profilcompany: any, com: any) {



    this.modalService.open(profilcompany, { ariaLabelledBy: 'modal-basic-title', size: 'm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /*************************************updatecv */

  updatecv(cv: any, cvid: any) {



    this.modalService.open(cv, { ariaLabelledBy: 'modal-basic-title', size: 'm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  /********************************************************* */





  modifcv(modfidercv: any) {

   
    this.modalService.open(modfidercv, { ariaLabelledBy: 'modal-basic-title', size: 'm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }

}