import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutesModule } from './app-routes.module';
import { AppComponent }   from './app.component';

import { TimeTrackerModule } from './time-tracker/time-tracker.module';
import { AppPagesModule } from './pages/app-pages.module';

@NgModule({
  imports:      [
    BrowserModule,
    AppRoutesModule,
    TimeTrackerModule,
    AppPagesModule,
  ],
  declarations: [
    AppComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
