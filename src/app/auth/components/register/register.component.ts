import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authSvc: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  userCreate() {
    if (this.registerForm.valid) {
      Swal.fire({
        title: 'Almacenado nuevo usuario en la base de datos',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        }
      }).then();
      const { name, email, password } = this.registerForm.value;
      this.authSvc
        .newUser(name, email, password)
        .then((_) => {
          Swal.close();
          this.router.navigate(['']).then();
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message
          }).then();
        });
    }
  }

  ngOnInit(): void {}
}
