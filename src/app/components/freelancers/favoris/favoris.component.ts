import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JobService } from 'src/app/services/job.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {
  token = localStorage.getItem('token')
  favoris: any
  statfavirs = false;
  offres: any
  p: number = 1
  id = this.activatedRoute.snapshot.params['id']
  constructor(private jobservice: JobService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getfavoris()
    this.getAllOffre()
  }
  getfavoris() {
    this.jobservice.getfavoris(this.token).subscribe((res: any) => {
      if (res.status == true) {
        this.favoris = res.favoris
      }
    })
  }
  getAllOffre() {

    this.jobservice.getOffre().subscribe((res: any) => {
      this.offres = res
      console.log("list of offres", this.offres)
    })
  }
  deletefavoris(id: any, token: any) {
    this.jobservice.deletefavoris(id, token).subscribe((res: any) => {
      if (res.status == true) {


        Swal.fire({
          'icon': 'success',
          'text': res.message
        })
        this.getfavoris()

      }
      else {
        Swal.fire({
          'icon': 'error',
          'text': res.message
        })


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

}