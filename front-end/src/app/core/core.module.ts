import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SideBarComponent } from './components/side-bar/side-bar.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    SideBarComponent
  ]
})
export class CoreModule { }
