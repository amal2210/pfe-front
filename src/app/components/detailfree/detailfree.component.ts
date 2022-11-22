import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FreelancersService } from 'src/app/services/freelancers.service';


@Component({
  selector: 'app-detailfree',
  templateUrl: './detailfree.component.html',
  styleUrls: ['./detailfree.component.css']
})
export class detailfreeComponent implements OnInit {
  token = localStorage.getItem('token')
  id = this.activatedRoute.snapshot.params['id']
  freelancer: any
  experiences: any
  competences: any
  educations: any
  langues: any
  p: number = 1;
  constructor(private auth: AuthServiceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getALL()
  }

  getALL() {
    this.auth.getprofil(this.token).subscribe((res: any) => {
      this.freelancer = res
      console.log("list of free", this.freelancer)
      this.experiences = res.freelance_entreprise['experiences'],
        this.educations = res.freelance_entreprise['formations'],
        this.competences = res.freelance_entreprise['competances'],
        this.langues = res.freelance_entreprise['langues']
      // console.log(this.freelancer)

    })
  }
}
