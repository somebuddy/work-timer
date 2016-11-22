import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppPagesRoutesModule } from './app-pages-routes.module';

import { AboutPageComponent } from './about.component';
import { IntroPageComponent } from './intro.component';

@NgModule({
  imports: [
    CommonModule,
    AppPagesRoutesModule
  ],
  declarations: [
    AboutPageComponent,
    IntroPageComponent
  ]
})
export class AppPagesModule {};
