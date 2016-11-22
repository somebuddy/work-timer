import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: `
    <h1>Work timer</h1>
    <nav>
      <a routerLink="/timer" routerLinkActive="active">Timer</a>
      <a routerLink="/about" routerLinkActive="active">About</a>
      <a routerLink="/intro" routerLinkActive="active">Intro</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent { }
