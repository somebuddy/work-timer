import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutesModule } from './tasks-routes.module';

import { TasksListComponent } from './tasks-list.component';
import { TaskDetailsComponent } from './task-details.component';

@NgModule({
  imports: [
    CommonModule,
    TasksRoutesModule,
  ],
  declarations: [
    TasksListComponent,
    TaskDetailsComponent
  ]
})
export class TasksModule {};
