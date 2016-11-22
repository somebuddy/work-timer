import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPageComponent } from './about.component';
import { IntroPageComponent } from './intro.component';

const AppPagesRoutes: Routes = [
  { path: 'intro', component: IntroPageComponent },
  { path: 'about', component: AboutPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(AppPagesRoutes),
  ]
})
export class AppPagesRoutesModule {};
