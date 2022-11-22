import { Component, OnInit } from '@angular/core';
import { CondidatService } from 'src/app/services/condidat.service';
import { ManageApplicantComponent } from 'src/app/components/employer/dashbord-employer/manage-applicant/manage-applicant.component';
import { ManagejobComponent } from '../../employer/dashbord-employer/ALL/managejob/managejob.component';
import Swal from 'sweetalert2';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-applied-job',
  providers: [ManageApplicantComponent],
  templateUrl: './applied-job.component.html',
  styleUrls: ['./applied-job.component.css']
})
export class AppliedJobComponent implements OnInit {
  condidatures: any
  closeResult = ''
  p: number = 1;
  search: any
  offre: any = []
  depottask: FormGroup
  statuscandidat = 0
  token = localStorage.getItem('token')
  taskform: FormGroup
  validerTaskbyfree: FormGroup
  listtask: any = []
  statusselected: any
  constructor(private cond: CondidatService, private modalService: NgbModal, private formbuilder: FormBuilder,
    private manage: ManageApplicantComponent) { }

  ngOnInit(): void {
    this.getAllcondidature()
    this.taskform = this.formbuilder.group({
      condidature_id: [''],
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


    this.depottask = this.formbuilder.group({
      token: [''],
      cand_id: [''],
      url: [''],

    })
  }

  urldepot(){
    this.cond.deposerurl(this.depottask.value).subscribe((res: any) => {
    if(res.status==true){
      Swal.fire({
        'icon': 'success',
        'text': res.message

      })

    }else
    Swal.fire({
      'icon': 'error',
      'text': res.message

    })
  })}
  getAllcondidature() {
    this.cond.getCondidature().subscribe((res: any) => {
      this.condidatures = res

      console.log("list of condidature", this.condidatures, this.offre)
    })
  }
  condstatut(event: any) {
    this.statuscandidat = event.target.value
  }

  ref() {
    return this.manage.refuser(this.condidatures.id);
  }
  accept() {
    return this.manage.acceptcondidature(this.condidatures.id);
  }

  deletecondidat(id: any) {

    this.cond.supprimer(id).subscribe((res: any) => {
      console.log(res)
      Swal.fire(
        'candidature',
        'candidature supprimer .',
        'success'
      )
      this.getAllcondidature()
    })
    //afficher supprission effectué avec succes

  }


  open(content: any, cond: any) {
    this.taskform.patchValue({
      token: localStorage.getItem('token'),
      condidature_id: cond
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



  deposerprojet(depot: any, candidature: any) {

    this.depottask.patchValue({
      cand_id: candidature.id,
      token: this.token
    })
    //alert(candidature.id)

    this.modalService.open(depot, { ariaLabelledBy: 'modal-basic-title', size: 'l' }).result.then((result) => {
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


  updatetask() {
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

}
