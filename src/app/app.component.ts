import { Component } from '@angular/core';
import { page } from './_interfaces/interface';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})



export class AppComponent {

  pages: page[] = [
    {
      link: "/home",
      icon: "home",
      label: "Home"
    },
    {
      link: "/bestellung",
      icon: "clipboard",
      label: "Bestellung"
    },
    {
      link: "/kochbuch",
      icon: "bookmarks",
      label: "Kochbuch"
    },
    {
      link: "/lager",
      icon: "basket",
      label: "Lager"
    },
    {
      link: "/analyse",
      icon: "podium",
      label: "Analyse"
    }
  ];


  constructor() { }
}
