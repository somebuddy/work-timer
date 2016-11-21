import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutesModule } from './app-routes.module';
import { AppComponent }   from './app.component';

import { IntroPageComponent } from './intro.component';
import { AboutPageComponent } from './about.component';

@NgModule({
  imports:      [
    BrowserModule,
    AppRoutesModule,
  ],
  declarations: [
    AppComponent,
    IntroPageComponent,
    AboutPageComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
