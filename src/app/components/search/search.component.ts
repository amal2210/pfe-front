import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { reduce } from 'rxjs';
import { JobService } from 'src/app/services/job.service';
import { ListcategorieService } from 'src/app/services/listcategorie.service';
import { ResumeService } from 'src/app/services/resume.service';
import { SkillService } from "src/app/services/Skill.service";
import Swal from 'sweetalert2';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  formfilter: FormGroup
  trouve = false
  submit = false
  indice = 0
  filterjob: any
  off: any = []
  selectedskill: any = []
  offres: any
  p: number = 1;
  catgories: any
  formskill: FormGroup
  skill: any = []
  term: any
  term1: any
  expe: any
  token = localStorage.getItem('token')
  id = this.activatedRoute.snapshot.params['id']
  location: any
  favorismsg = true;
  title: any
  byexper: any
  experience: any
  selectedValue: string;
  messageoffre = false;
  STAT: "Enable";
minexperience: any;
  constructor(private jobservice: JobService, private categorieservice: ListcategorieService,
    private Skilll: SkillService, private activatedRoute: ActivatedRoute,
    private exp: ResumeService, private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAllOffre()
    this.getAllcategorie()
    this.getAllSkill()
    this.formfilter = this.formbuilder.group({
      minprix: [''],
      maxprix: [''],
      minexperience: [''],
      maxexperience: [''],

    })

  }
  filter() {
    this.submit = true;


    //control de saisie
    if (this.formfilter.invalid) {
      return;
    }
    this.formfilter.patchValue({
      'competence_filter': this.selectedskill
    })
    this.jobservice.filter(this.formfilter.value).subscribe((res: any) => {
      this.offres = res
    })
  }

  getAllOffre() {

    this.jobservice.getOffre().subscribe((res: any) => {
      this.offres = res
      console.log("list of offres", this.offres)
    })
  }


  getAllSkill() {
    this.Skilll.getskill().subscribe((res: any) => {
      this.skill = res.skills
      console.log("list of skillls", this.skill)
    })
  }


  supprimerOffre(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      //button confirmé
      confirmButtonColor: '#3085D6',
      //buton annuler
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      //si on click sur confirmer la supprission
      if (result.isConfirmed) {
        //lancer la fonction delete
        this.jobservice.deleteOffre(id).subscribe((res: any) => {
          console.log(res)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.getAllOffre()
        })
        //afficher supprission effectué avec succes

      }
    })
  }
  getAllcategorie() {
    this.categorieservice.getcat().subscribe((res: any) => {
      this.catgories = res
    })
    console.log("list of categorie", this.catgories)


  }
  get f() {
    return this.formfilter.controls;
  }
  addfavoris(id: any, token: any) {
    this.jobservice.addfavoris(id, token).subscribe((res: any) => {
      if (res.status == true) {


        Swal.fire({
          'icon': 'success',
          'text': res.message
        })
        this.getAllOffre()

      }
      else {
        Swal.fire({
          'icon': 'success',
          'text': res.message
        })
        this.getAllOffre()
      }

      if (res.status == false) {

        Swal.fire({
          icon: 'error',
          confirmButtonColor: '#28b661',
          confirmButtonText: '<a  data-toggle="modal" data-target="#login" >se connecter </a>',
          text: 'Pour enregistrer cette offre dans vos favoris, connectez-vous.',

        })

      }


    })
  }

  getoffrebycategorie(e: any) {
    console.log("checkbox selected", e.target.value)
    this.jobservice.getOffre().subscribe((res: any) => {
      this.offres = res.filter((el: any) => el.category.id == e.target.value)
      console.log("list of offres by cat", this.offres)
    })
  }


  /***************************             **************** */
  getoffrebyprice(event: any) {
    console.log("checkbox selected", event.target.value)
    this.jobservice.getOffre().subscribe((res: any) => {
      this.offres = res.filter((el: any) => el.o.id == event.target.value)
      console.log("list of offres by price ", this.offres)

    })
  }


  byskill(e: any) {
    this.off = this.offres;
    console.log(this.off);
    this.off.filter((res: any) => res.skills.forEach((el: any) => {
      if (e.target.value == el.id) {
        console.log('resssss' + res);
        this.offres = res
      }
    }))


  }


















  getoffrefilterbylocationtitle() {
    this.jobservice.getOffre().subscribe((res: any) => {
      this.offres = res.filter((el: any) => el.titre == this.title && el.entreprise.adresse == this.location)
      if (this.offres == "") {
        this.messageoffre = true
      }

    })
  }
  reload() {
    window.location.reload()
  }
  filteroffrebyexp(e: any) {

  
      this.jobservice.getOffre().subscribe((res: any) => {


        this.offres = res.filter((el: any) => el.id == e.target.value)


        console.log("liste offre filter by exp", this.offres)

      })
    
  }
  isConnect() {

    return localStorage.getItem('state') == "1" ? true : false

  }
  isroleREE() {
    return localStorage.getItem('role') == "ROLE_FREELANCER" ? true : false
  }
}