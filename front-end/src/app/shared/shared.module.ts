import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ShortenPipe } from './pipe/shorten.pipe';



@NgModule({
  declarations: [
    ShortenPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    ShortenPipe
  ]
})
export class SharedModule { }
