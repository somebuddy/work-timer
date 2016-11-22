import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutesModule } from './app-routes.module';
import { AppComponent }   from './app.component';

import { AppPagesModule } from './pages/app-pages.module';
import { TimeTrackerModule } from './time-tracker/time-tracker.module';
import { TasksModule } from './tasks/tasks.module';

@NgModule({
  imports:      [
    BrowserModule,
    AppRoutesModule,
    AppPagesModule,
    TimeTrackerModule,
    TasksModule,
  ],
  declarations: [
    AppComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
