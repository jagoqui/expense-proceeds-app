import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

const exports = [FooterComponent, SidebarComponent, NavbarComponent];

@NgModule({
  declarations: [exports],
  imports: [CommonModule, RouterModule],
  exports: [exports]
})
export class SharedModule {}
