import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changepass-company',
  templateUrl: './changepass-company.component.html',
  styleUrls: ['./changepass-company.component.css']
})
export class ChangepassCompanyComponent implements OnInit {

  constructor(private form: FormBuilder, private servicepwd: AuthServiceService) { }
  formcompany: FormGroup
  submit = false
  token = localStorage.getItem("token")
  ngOnInit(): void {
    this.formcompany = this.form.group({

      token: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]

    },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );

  }


  get f() { return this.formcompany.controls; }

  changepassword() {
    this.submit = true;
    if (this.formcompany.invalid) {
      return;
    }
    this.formcompany.patchValue({
      token: localStorage.getItem('token')
    })
    this.servicepwd.changepassword(this.formcompany.value).subscribe((res: any) => {
      alert(res)
      if (res.status) {

        console.log('password modifier')
        Swal.fire({
          'icon': 'success',
          'text': 'edit profil'

        })
      }
      else {
        console.log('reconnecter')
      }
    })
  }

}
