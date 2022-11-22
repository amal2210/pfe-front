import { Component, OnInit } from '@angular/core';
import { FreelancersService } from 'src/app/services/freelancers.service';
import { ResumeService } from 'src/app/services/resume.service';

@Component({
  selector: 'app-free',
  templateUrl: './free.component.html',
  styleUrls: ['./free.component.css']
})
export class FreeComponent implements OnInit {
  freelancer: any
  competences: any
  p: number = 1;
  searchText = ''
  id: any
  location: any
  file: File;
  token = localStorage.getItem('token')
  constructor(private free: FreelancersService, private competence: ResumeService) { }

  ngOnInit(): void {
    this.getallfree()
    this.getallcompetence()
  }
  getallfree() {
    this.free.getFreelancer().subscribe((res: any) => {
      this.freelancer = res
      console.log("list of freeelancers", this.freelancer)
    })
  }


  getallcompetence() {
    this.competence.getCompetence().subscribe((res: any) => {
      this.competences = res
      console.log("list of competence", this.competences)
    })
  }



  // getcompetencebyfree(e:any)
  // {
  //   this.competence.getCompetence().subscribe((res: any) => {
  //     this.competences = res.filter((el: any) => el.freelance.id == e.target.value)
  //     console.log("list of competence", this.competences)
  //   })
  // }


}
