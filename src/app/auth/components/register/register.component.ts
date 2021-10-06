import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import SweetAlert from 'sweetalert2';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../aap.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  loading: boolean = false;
  private destroy$ = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    private storeSvc: Store<AppState>
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  userCreate() {
    if (this.registerForm.valid) {
      SweetAlert.fire({
        title: 'Almacenado nuevo usuario en la base de datos',
        timerProgressBar: true,
        didOpen: () => {
          SweetAlert.showLoading();
        }
      }).then();
      const { name, email, password } = this.registerForm.value;
      this.authSvc
        .newUser(name, email, password)
        .then((_) => {
          SweetAlert.close();
          this.router.navigate(['']).then();
        })
        .catch((error) => {
          SweetAlert.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message
          }).then();
        });
    }
  }

  ngOnInit(): void {
    this.storeSvc
      .select('ui')
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ isLoading }) => (this.loading = isLoading));
  }

  ngOnDestroy() {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
