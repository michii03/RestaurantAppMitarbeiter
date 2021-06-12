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
      label: "Home",
      color: "medium"
    },
    {
      link: "/bestellung",
      icon: "clipboard",
      label: "Bestellung",
      color: "medium"
    },
    {
      link: "/kochbuch",
      icon: "bookmarks",
      label: "Kochbuch",
      color: "medium"
    },
    {
      link: "/lager",
      icon: "basket",
      label: "Lager",
      color: "medium"
    },
    {
      link: "/analyse",
      icon: "podium",
      label: "Analyse",
      color: "medium"
    },
    {
      link: "/chat",
      icon: "chatbubbles",
      label: "Chat",
      color: "medium"
    }
  ];


  constructor() { }
}
