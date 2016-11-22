import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksListComponent } from './tasks-list.component';
import { TaskDetailsComponent } from './task-details.component';

const TasksRoutes: Routes = [
  { path: 'tasks', component: TasksListComponent },
  { path: 'task/:id', component: TaskDetailsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(TasksRoutes)
  ]
})
export class TasksRoutesModule {};
