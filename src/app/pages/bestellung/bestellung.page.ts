import { Component, OnInit } from '@angular/core';
import { ɵangular_packages_platform_browser_platform_browser_k } from '@angular/platform-browser';
import { bestellung } from '../../_interfaces/bestellung';
import { Router } from '@angular/router'
import { produkt } from 'src/app/_interfaces/produkte';


@Component({
  selector: 'app-bestellung',
  templateUrl: './bestellung.page.html',
  styleUrls: ['./bestellung.page.scss'],
})

export class BestellungPage implements OnInit {

  bestellungen: bestellung[] = [
    {
      id      : 1,
      zeit    : new Date(),
      produkte: [
        {
          id: 1,
          bezeichnung: "Pizza Peperoni",
          zubereitet: true
        },
        {
          id: 2,
          bezeichnung: "Pizza Magaritha",
          zubereitet: false
        },
        {
          id: 3,
          bezeichnung: "Pizza Magaritha",
          zubereitet: false
        }
        
      ]
    },
    {
      id: 2,
      zeit: new Date(),
      produkte: [
        {
          id: 1,
          bezeichnung: "Pizza Peperoni",
          zubereitet: true
        },
        {
          id: 2,
          bezeichnung: "Pizza Magaritha",
          zubereitet: false
        },
        {
          id: 3,
          bezeichnung: "Pizza Magaritha",
          zubereitet: false
        }
      ]
    }
  ];

  ausgewaehlt: number[] = new Array(this.bestellungen.length);

  constructor(private router: Router) { }

  ngOnInit() {
  }

  produktePage(index : number) : void {
    let produkte : produkt[];
    produkte = this.bestellungen[index].produkte;
    this.router.navigateByUrl("/produkte", {state: produkte});
  } 

  getProzent(index : number): number {

     let anzahl = 0;
     let zubereitet = 0;

     for (let i = 0; i < this.bestellungen[index].produkte.length; i++) {
       if (this.bestellungen[index].produkte[i].zubereitet) zubereitet++;
       anzahl++;
     }

     if (anzahl == 0) return 0;

     return zubereitet / anzahl;
   }
}
