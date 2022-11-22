import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { BodyComponent } from './components/body/body.component';
import { AddjobComponent } from './components/employer/dashbord-employer/ALL/addjob/addjob.component';
import { DashbordEmployerComponent } from './components/employer/dashbord-employer/dashbord-employer.component';

import { DetailEmployerComponent } from './components/employer/dashbord-employer/ALL/detail-employer/detail-employer.component';
import { DetailjobComponent } from './components/employer/dashbord-employer/ALL/detailjob/detailjob.component';
import { ManagejobComponent } from './components/employer/dashbord-employer/ALL/managejob/managejob.component';
import { AlertjobComponent } from './components/freelancers/alertjob/alertjob.component';
import { AppliedJobComponent } from './components/freelancers/applied-job/applied-job.component';
import { ChangepwdComponent } from './components/freelancers/changepwd/changepwd.component';
import { CreateResumeComponent } from './components/freelancers/create-resume/create-resume.component';
import { DashboardComponent } from './components/freelancers/dashboard/dashboard.component';
import { DashbordCondidateComponent } from './components/freelancers/dashbord-condidate/dashbord-condidate.component';
import { DetailCondidateComponent } from './components/freelancers/detail-condidate/detail-condidate.component';
import { ListJobComponent } from './components/freelancers/list-job/list-job.component';
import { MyprofileComponent } from './components/freelancers/myprofile/myprofile.component';
import { HomeComponent } from './components/home/home.component';


import { SearchComponent } from './components/search/search.component';
import { GuardGuard } from './guard/guard.guard';
import { ModalComponent } from './components/modal/modal.component';
import { EditprofilComponent } from './components/employer/dashbord-employer/editprofil/editprofil.component';
import { CompanyprofilComponent } from './components/employer/dashbord-employer/companyprofil/companyprofil.component';
import { ManageApplicantComponent } from './components/employer/dashbord-employer/manage-applicant/manage-applicant.component';
import { ListcompanyComponent } from './components/listcompany/listcompany.component';
import { FreeComponent } from './components/free/free.component';
import { AttendToactiveComponent } from './components/attend-toactive/attend-toactive.component';
import { ChangepassCompanyComponent } from './components/employer/changepass-company/changepass-company.component';
import { detailfreeComponent } from './components/detailfree/detailfree.component';
import { FavorisComponent } from './components/freelancers/favoris/favoris.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';

const routes: Routes = [

  {
    path: '', component: HomeComponent, 
    children: [
      { path: '', component: SearchComponent },
      { path: 'free', component: FreeComponent},
      { path: 'changer/motdepasse/:token', component: ForgetpasswordComponent  },
      //{path:'detailfree/:token',component:detailfreeComponent ,},
      // { path: 'detail-employer', component: DetailEmployerComponent },
      //  { path: 'listcompany', component: ListcompanyComponent ,canActivate: [GuardGuard] },

      { path: 'detailjob/:id', component: DetailjobComponent},
      { path: 'toActiveAccount', component: AttendToactiveComponent, canActivate: [GuardGuard]},
      { path: 'detail-condidate/:id', component: DetailCondidateComponent, canActivate: [GuardGuard] },

    ]
  },

  { path: 'registercompany', component: SignUpComponent,canActivate: [GuardGuard] },
  { path: 'modal', component: ModalComponent,canActivate: [GuardGuard] },





  {
    path: 'dashbord-employer', component: DashbordEmployerComponent, canActivate: [GuardGuard],
    children: [
      { path: '', component: BodyComponent, canActivate: [GuardGuard] },
      { path: 'postjob', component: AddjobComponent },
      { path: 'managejob', component: ManagejobComponent },
      { path: 'passwordcompany', component: ChangepassCompanyComponent },


      { path: 'editprofil/:token', component: EditprofilComponent },
      { path: 'companyprofil/:token', component: CompanyprofilComponent },
      { path: 'applicant', component: ManageApplicantComponent },

    ]
  },

  {
    path: 'dashboard-condidate', component: DashbordCondidateComponent,canActivate: [GuardGuard] ,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'resume', component: CreateResumeComponent },
      { path: 'applied', component: AppliedJobComponent },
      { path: 'alert', component: AlertjobComponent },
      
      { path: 'profil/:token', component: MyprofileComponent },
      { path: 'changePasswordcondidat', component: ChangepwdComponent },
      { path: 'favoris/:token', component: FavorisComponent },

     

    ]
  },

  {
    path: '**', component: HomeComponent, children: [
      { path: '', component: SearchComponent },
    ]
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

