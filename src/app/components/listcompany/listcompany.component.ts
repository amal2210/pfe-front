import { Component, OnInit } from '@angular/core';
import { ListOfCompanyService } from 'src/app/services/list-of-company.service';

@Component({
  selector: 'app-listcompany',
  templateUrl: './listcompany.component.html',
  styleUrls: ['./listcompany.component.css']
})
export class ListcompanyComponent implements OnInit {
  company: any
  constructor(private companyservice: ListOfCompanyService) { }

  ngOnInit(): void {
    this.getCompany()
  }
  getCompany() {
    this.companyservice.getlistofCompany().subscribe((res: any) => {
      this.company = res
      console.log("list of categorie", this.company)
    })
  }

}
