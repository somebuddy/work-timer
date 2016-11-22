import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const AppRoutes: Routes = [
  { path: '', redirectTo: '/intro', pathMatch: 'full' }
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
