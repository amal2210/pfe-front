import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';




import { JobService } from 'src/app/services/job.service';
import { ListcategorieService } from 'src/app/services/listcategorie.service';
import { SkillService } from 'src/app/services/Skill.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.css']
})
export class AddjobComponent implements OnInit {


  catgories: any = []
  formskill: FormGroup;

  FormOffre: FormGroup;

  skill: any
  offre: any
  isSuccessful = false;
  submit = false
  //capturer id pou detail
  id = this.activatedRoute.snapshot.params['id']


  date = new Date().toISOString().split('T')[0].toString()
  userconnect = localStorage.getItem("user_id")
  selectedCityIds: string[];
  skills = [];

  selectedValue: string
  constructor(
    private job: JobService,
    private skillService: SkillService,
    private categorieservice: ListcategorieService,
    private formBuilder: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute) {


  }


  ngOnInit(): void {
    this.getAllcategorie()
    this.getAllSkill()

    this.formskill = this.formBuilder.group({


      skills_name: ['', Validators.required],
      level: ['', Validators.required],
    }),

      this.FormOffre = this.formBuilder.group({


        titre: ['', Validators.required],
        specialite: ['', Validators.required,],
        description_offre: ['', Validators.required],
        date_limite: ['', Validators.required],

        user_id: ['', Validators.required],
        skills: ['', Validators.required],

        category: ['', Validators.required],
        prix: ['', Validators.required],

        experience_offre: ['', [Validators.required, Validators.pattern("[0-9]")]]



      })

  }

  get f1() { return this.FormOffre.controls; }



  getAllcategorie() {
    this.categorieservice.getcat().subscribe((res: any) => {
      this.catgories = res
      console.log("list of categorie", this.catgories)
    })
  }
  getAllSkill() {

    this.skillService.getskill().subscribe((res: any) => {
      this.skills = res.skills;

    })

  }
  realodPage() {
    window.location.reload();
  }
  

  addjob() {
    this.FormOffre.patchValue({
      user_id: this.userconnect
    })
    this.submit = true;
    // stop here if form is invalid
    if (this.FormOffre.invalid) {
      console.log(this.FormOffre)
      return;
    }

    console.log("formoffre before", this.FormOffre.value)


    console.log("identreprise", this.userconnect)


    this.job.addOffre(this.FormOffre.value).subscribe(
      (result: any) => {
        console.log("reponse", result)
        if (result.status == true) {
          Swal.fire({
            'icon': 'success',
            'text': 'offre ajouter'
          })
          this.route.navigateByUrl('/dashbord-employer')

        }
        else {
          alert(result.message);

        }

      }, err => {

        console.log("error ", err)
      }
    )
  }








  





}








