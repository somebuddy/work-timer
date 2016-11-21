import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IntroPageComponent } from './intro.component';
import { AboutPageComponent } from './about.component';

const AppRoutes: Routes = [
  { path: '', redirectTo: '/intro', pathMatch: 'full' },
  { path: 'intro', component: IntroPageComponent },
  { path: 'about', component: AboutPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(AppRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutesModule {};
