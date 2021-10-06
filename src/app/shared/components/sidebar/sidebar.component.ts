import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  onLogout() {
    if (confirm('Está seguro que desea cerrar sesión?')) {
      Swal.fire({
        title: 'Espere por favor',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then();
      this.auth
        .logout()
        .then(() => {
          Swal.close();
          this.router.navigate(['/login']).then();
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
