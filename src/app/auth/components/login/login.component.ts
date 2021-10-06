import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authSvc: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  onLogin() {
    if (this.loginForm.valid) {
      Swal.fire({
        title: 'Espere por favor',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then();
      const { email, password } = this.loginForm.value;
      this.authSvc
        .login(email, password)
        .then((_) => {
          Swal.close();
          this.router.navigate(['']).then();
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          }).then();
        });
    }
  }

  ngOnInit(): void {}
}
