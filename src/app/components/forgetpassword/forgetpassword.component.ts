import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  formpass: FormGroup
  submit = false
  loading=false
  token = this.activatedRoute.snapshot.params['token']
  constructor(private form: FormBuilder, private auth: AuthServiceService, 
    private activatedRoute: ActivatedRoute ,private router:Router) { }

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

  submitpassword() {
  
    this.submit = true;
    this.formpass.patchValue({
      token: this.token
    })
    if (this.formpass.invalid) {

      
      return;
    }
  
    this.auth.changepassword(this.formpass.value).subscribe((res: any) => {
      
      if (res.status) {

        console.log('password modifier')
        Swal.fire({
          icon: 'success',
          text: res.message,
          confirmButtonColor: '#28b661'

        })
        this.router.navigateByUrl("**")
      }
      else {
        Swal.fire({
          icon: 'error',
          text: res.message,
          confirmButtonColor: '#28b661'

        })
        
        this.router.navigateByUrl("/search")
      }
    })
  }
}
