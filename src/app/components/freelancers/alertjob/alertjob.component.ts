import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CondidatService } from 'src/app/services/condidat.service';

@Component({
  selector: 'app-alertjob',
  templateUrl: './alertjob.component.html',
  styleUrls: ['./alertjob.component.css']
})
export class AlertjobComponent implements OnInit {
  listtask:any=[]
  taskform:FormGroup
  closeResult=""
  
  constructor(private cond:CondidatService,private formbuilder:FormBuilder,
    private modalService:NgbModal) { }

  ngOnInit(): void {
    
  
    this.taskform = this.formbuilder.group({
      condidature_id: [''],
      task: [''],
      description: [''],
      status: [''],
      avancement: [''],
      token: ['']

    })
  }
  
  gettache(task:any,c:any){
    this.taskform.patchValue({
      token: localStorage.getItem('token'),
      condidature_id: c
    })
  this.cond.gettask(task).subscribe((res: any) => {
    if (res.status == true) {
      this.listtask = res.tasks
    }})}




    open(content: any) {
     
    
  
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
  
}
