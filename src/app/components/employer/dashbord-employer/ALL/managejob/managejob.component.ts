import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from 'src/app/services/job.service';
import { ListOfCompanyService } from 'src/app/services/list-of-company.service';
import { ListcategorieService } from 'src/app/services/listcategorie.service';

import { SkillService } from 'src/app/services/Skill.service';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-managejob',
  templateUrl: './managejob.component.html',
  styleUrls: ['./managejob.component.css']
})
export class ManagejobComponent implements OnInit {
  offres: any
  managejob: any
  FormOffre: FormGroup
  catgories: any
  skill: any
  selectedCityIds: any = [];
  skills = [];
  p: number = 1;
  closeResult = '';
  date = new Date().toISOString().split('T')[0].toString()
  constructor(private offreService: JobService,
    private modalService: NgbModal, private formBuilder: FormBuilder,
    private skillService: SkillService,
    private categorieservice: ListcategorieService,
    private route: Router) { }

  ngOnInit(): void {
    this.getAllOffres()
    this.getAllSkill()
    this.getAllcategorie()
    this.FormOffre = this.formBuilder.group({

      id: ['', Validators.required],
      titre: ['', Validators.required],
      specialite: ['', Validators.required],
      description_offre: ['', Validators.required],
      date_limite: ['', Validators.required],
      // date_creation: ['', Validators.required],
      entreprise: ['', Validators.required],
      // client: ['', Validators.required],
      category: ['', Validators.required],
      statusOffre: ['', Validators.required],
      prix: ['', Validators.required],
      removedOffre: ['', Validators.required],
      experience_offre: ['', Validators.required],
      skills: ['', Validators.required],


    })
  }
  getAllOffres() {
    this.offreService.getOffre().subscribe((res: any) => {
      this.offres = res.filter((el: any) => el.statusOffre == true && el.removedOffre == false)
    
    })
  }
  updateoffre() {

    this.offreService.updateOffre(this.FormOffre.value.id, this.FormOffre.value).subscribe(
      (result: any) => {
        
        Swal.fire({
          'icon': 'success',
          'text': 'offre mis à jour'

        })



        //update produit directement sans reload page
        // ma8irha 

        this.getAllOffres()

      }
    )

  }

  getAllcategorie() {
    this.categorieservice.getcat().subscribe((res: any) => {
      this.catgories = res
     
    })
  }
  getAllSkill() {
    this.skillService.getskill().subscribe((res: any) => {
      this.skills = res.skills;


    })



  }



  open(content: any, offre: any) {
    
    let selectedSkill = offre.skills;
    for (let i = 0; i < selectedSkill.length; i++) {
      this.selectedCityIds.push(selectedSkill[i]['id']);
    }


    this.FormOffre.patchValue({
      id: offre.id,
      titre: offre.titre,
      specialite: offre.specialite,
      description_offre: offre.description_offre,
      date_limite: offre.date_limite,

      entreprise: offre.entreprise,
      category: offre.category.id,
      statusOffre: 1,
      prix: offre.prix,
      removedOffre: 0,
      experience_offre: offre.experience_offre,
      skills: this.selectedCityIds,

    })

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
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

  deleteoffre(id: any) {
    Swal.fire({
      title: 'Êtes-vous sûr de supprimer cette offre ?',
      text: "Vous pouvez annuler l'action",
      icon: 'warning',
      showCancelButton: true,
      //button confirmé
      confirmButtonColor: '#3085D6',
      //buton annuler
      cancelButtonColor: '#d33',
      cancelButtonText:'Annuler',
      confirmButtonText: 'Oui, Supprimer'
    }).then((result) => {
      //si on click sur confirmer la supprission
      if (result.isConfirmed) {
        //lancer la fonction delete
        this.offreService.deleteOffre(id).subscribe((res: any) => {
          
          Swal.fire(
            'Supprimer',
            'Offre supprimer .',
            'success'
          )
          this.getAllOffres()
        })
        //afficher supprission effectué avec succes

      }
    })
  }

}
