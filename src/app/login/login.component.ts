import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formLogin?: FormGroup;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginSrv: LoginService,
    private router: Router
  ) {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  loginClick() {
    this.isLoading = true;
    console.log(this.formLogin?.value);

    this.loginSrv.login(this.formLogin?.value).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
      complete: () => {
        console.log('Complete');
        this.isLoading = false;
      },
    });
  }
}
