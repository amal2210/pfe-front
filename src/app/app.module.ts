import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { HomeComponent } from './components/home/home.component';

import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { DetailCondidateComponent } from './components/freelancers/detail-condidate/detail-condidate.component';
import { DashbordCondidateComponent } from './components/freelancers/dashbord-condidate/dashbord-condidate.component';
import { DetailEmployerComponent } from './components/employer/dashbord-employer/ALL/detail-employer/detail-employer.component';
import { DashbordEmployerComponent } from './components/employer/dashbord-employer/dashbord-employer.component';

import { CreateResumeComponent } from './components/freelancers/create-resume/create-resume.component';
import { AppliedJobComponent } from './components/freelancers/applied-job/applied-job.component';
import { ListJobComponent } from './components/freelancers/list-job/list-job.component';
import { AlertjobComponent } from './components/freelancers/alertjob/alertjob.component';
import { MyprofileComponent } from './components/freelancers/myprofile/myprofile.component';
import { ChangepwdComponent } from './components/freelancers/changepwd/changepwd.component';
import { AddjobComponent } from './components/employer/dashbord-employer/ALL/addjob/addjob.component';
import { ManagejobComponent } from './components/employer/dashbord-employer/ALL/managejob/managejob.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailjobComponent } from './components/employer/dashbord-employer/ALL/detailjob/detailjob.component';

import { UpdatejobemplComponent } from './components/employer/dashbord-employer/ALL/updatejobempl/updatejobempl.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModalComponent } from './components/modal/modal.component';
import { EditprofilComponent } from './components/employer/dashbord-employer/editprofil/editprofil.component';
import { CompanyprofilComponent } from './components/employer/dashbord-employer/companyprofil/companyprofil.component';
import { ManageApplicantComponent } from './components/employer/dashbord-employer/manage-applicant/manage-applicant.component';
import { FilterjobPipe } from './pipe/filterjob.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ManagejobPipe } from './pipe/managejob.pipe';
import { ListcompanyComponent } from './components/listcompany/listcompany.component';
import { FreeComponent } from './components/free/free.component';
import { AttendToactiveComponent } from './components/attend-toactive/attend-toactive.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotfindComponent } from './components/notfind/notfind.component';
import { FreePipe } from './pipe/free.pipe';
import { ExpPipe } from './pipe/exp.pipe';
import { ChangepassCompanyComponent } from './components/employer/changepass-company/changepass-company.component';
import { ByfreelancerconnecterPipe } from './pipes/byfreelancerconnecter.pipe';
import { CommonModule } from '@angular/common';
import { detailfreeComponent } from './components/detailfree/detailfree.component';
import { FavorisComponent } from './components/freelancers/favoris/favoris.component';
import { AuthServiceService } from './services/auth-service.service';
import { GuardGuard } from './guard/guard.guard';
import { CandidaturePipe } from './pipe/candidature.pipe';
import { ByexpPipe } from './byexp.pipe';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { SkilPipe } from './pipes/skil.pipe';







//les components
@NgModule({

  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    HomeComponent,
    detailfreeComponent,
    SignInComponent,
    SignUpComponent,
    DetailCondidateComponent,
    DashbordCondidateComponent,
    DetailEmployerComponent,
    DashbordEmployerComponent,

    CreateResumeComponent,
    BodyComponent,
    AppliedJobComponent,
    ListJobComponent,
    AlertjobComponent,
   
    MyprofileComponent,
    ChangepwdComponent,
    AddjobComponent,
    ManagejobComponent,

    SearchComponent,
    DetailjobComponent,

    UpdatejobemplComponent,

    ModalComponent,
    EditprofilComponent,
    CompanyprofilComponent,
    ManageApplicantComponent,
    FilterjobPipe,
    ManagejobPipe,
    ListcompanyComponent,
    FreeComponent,
    AttendToactiveComponent,
    NotfindComponent,
    FreePipe,
    ExpPipe,
    ChangepassCompanyComponent,
    ByfreelancerconnecterPipe,
    FavorisComponent,
    CandidaturePipe,
    ByexpPipe,
    ForgetpasswordComponent,
    SkilPipe,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    
    NgbModule,
    NgSelectModule,
    CommonModule

  ],
  providers: [AuthServiceService, GuardGuard],
  bootstrap: [AppComponent]

})
export class AppModule { }
