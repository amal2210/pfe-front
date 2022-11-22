import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CondidatService } from 'src/app/services/condidat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-applicant',
  templateUrl: './manage-applicant.component.html',
  styleUrls: ['./manage-applicant.component.css']
})
export class ManageApplicantComponent implements OnInit {
  condidatures: any=[]
  condidat: any
 edittask=""
  statuscandidat = 0
  validerTaskbyfree: FormGroup
  listtask: any = []
  taskform: FormGroup
  closeResult = ''
  token = localStorage.getItem('token')
  id = this.activatedRoute.snapshot.params['id']
  candidatvide:any
  constructor(
    private cond: CondidatService, private activatedRoute: ActivatedRoute,
    private modalService: NgbModal, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    
    this.getAllcondidature()
    this.taskform = this.formbuilder.group({
      condidature_id: [''],
      id:[''],
      task: [''],
      description: [''],
      status: [''],
      avancement: [''],
      token: ['']

    })


    this.validerTaskbyfree = this.formbuilder.group({
      token: [''],
      idtask: [''],
      note: [''],
      status_hidden: ['']
    })
  }
  getAllcondidature() {
    this.cond.getCondidature().subscribe((res: any) => {
      this.condidatures = res
      console.log(this.condidatures,'ffhf')
    
    })
  }
  modifiertache(t:any){
    
    this.taskform.patchValue({
      id:t.id,
      task:t.task,
      description:t.description,
      status:t.status,
      avancement:t.avancement
      
    })
    this.edittask=t
    alert(this.edittask)
  }

  condstatut(event: any) {
    this.statuscandidat = event.target.value
  }
  acceptcondidature(id: any) {
    this.cond.acceptcondidature(id).subscribe((res: any) => {
      if (res.status == true) {
        window.location.reload()
      }
      console.log("list of categorie", this.condidatures)
    })
  }
  refuser(id: any) {
    this.cond.refusercondidature(id).subscribe((res: any) => {
      if (res.status == true) {
        window.location.reload()
      }
      console.log("list of categorie", this.condidatures)
    })

  }

  ajoutertask() {
    this.cond.addtask(this.taskform.value).subscribe((res: any) => {
      if (res.status == true) {
        Swal.fire({
          'icon': 'success',
          'title': res.message
        })
      }
      else {
        Swal.fire({
          'icon': 'error',
          'title': res.message
        })
      }
    })
  }

  open(content: any, cond: any) {
    this.taskform.patchValue({
      token: localStorage.getItem('token'),
      condidature_id: cond,
      
    })
    this.cond.gettask(this.taskform.value).subscribe((res: any) => {
      if (res.status == true) {
        this.listtask = res.tasks
      }
    })


    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then((result) => {
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


  selectecdstatus(e: any) {
    this.selectecdstatus = e.target.value
    this.validerTaskbyfree.patchValue({
      status_hidden: this.selectecdstatus
    })
  }

  modalnotes(addnotes: any, id: any) {
    this.validerTaskbyfree.patchValue({
      idtask: id,
      token: this.token
    })
    this.modalService.open(addnotes, { ariaLabelledBy: 'modal-basic-title', size: 'l' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  modaldescription(desc: any, tache: any) {



    this.modalService.open(desc, { ariaLabelledBy: 'modal-basic-title', size: 'l' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

/************************************************* */
  updatenote() {
    alert(JSON.stringify(this.validerTaskbyfree.value))
    this.cond.updatetask(this.validerTaskbyfree.value).subscribe((res: any) => {

      if (res.status == true) {

        Swal.fire({
          'icon': 'success',
          'text': 'tache mis à jour'

        })
      }
    })
  }


  /******************************************** */
/*******************************updatetask*************** */
updatetache() {
  alert(JSON.stringify(this.validerTaskbyfree.value))
  this.cond.updatetask(this.validerTaskbyfree.value).subscribe((res: any) => {

    if (res.status == true) {

      Swal.fire({
        'icon': 'success',
        'text': 'tache mis à jour'

      })
    }
  })
}
/*************************************************** */
  deletetache(id: any) {
    Swal.fire({
      title: 'Êtes-vous sûr de supprimer cette tâche ?',
      text: "Vous pouvez annuler l'action",
      icon: 'warning',
      showCancelButton: true,
     
      //button confirmé
      confirmButtonColor: '#3085D6',
      //buton annuler
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer'
    }).then((result) => {
      //si on click sur confirmer la supprission
      if (result.isConfirmed) {
        //lancer la fonction delete
        this.cond.removetask(id).subscribe((res: any) => {
          if(res.status==true){
            Swal.fire ({
              icon:'success',
              title:'tâche a été supprimée',
              timer:1500
            })
          this.getAllcondidature()
        }
        //afficher supprission effectué avec succes

      }
    )
  }})

}
}