import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { PasswordValidators } from 'src/app/_helpers/password.validators';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.css']
})
export class ChangepwdComponent implements OnInit {
  formpass: FormGroup
  submit = false
  token = localStorage.getItem("token")
  constructor(private form: FormBuilder, private servicepwd: AuthServiceService) { }

  ngOnInit(): void {



    this.formpass = this.form.group({

      token: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]

    },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );

  }


  get f() { return this.formpass.controls; }

  changepassword() {
    this.submit = true;
    if (this.formpass.invalid) {
      return;
    }
    this.formpass.patchValue({
      token: localStorage.getItem('token')
    })
    this.servicepwd.changepassword(this.formpass.value).subscribe((res: any) => {
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



