import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-list-job',
  templateUrl: './list-job.component.html',
  styleUrls: ['./list-job.component.css']
})
export class ListJobComponent implements OnInit {
  offres: any
  p: number = 1;
  constructor(private jobservice: JobService) { }

  ngOnInit(): void {
    this.getAllOffre()
  }

  getAllOffre() {
    this.jobservice.getOffre().subscribe((res: any) => {
      this.offres = res
      console.log("list of categorie", this.offres)
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
}