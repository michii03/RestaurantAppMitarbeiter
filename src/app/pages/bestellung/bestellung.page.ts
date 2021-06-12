import { Component, OnInit } from '@angular/core';
import { bestellung } from '../../_interfaces/bestellung';
import { Router } from '@angular/router'
import { BestellungService } from 'src/app/_service/bestellung.service';


@Component({
  selector: 'app-bestellung',
  templateUrl: './bestellung.page.html',
  styleUrls: ['./bestellung.page.scss'],
})

export class BestellungPage implements OnInit {

  constructor(private router: Router, private bestellungService: BestellungService) { }

  ngOnInit() {
    this.getBestellungen();
  }

  // bestellungen: bestellung[] = [
  //   {
  //     id      : 1,
  //     zeit    : new Date(),
  //     produkte: [
  //       {
  //         id: 1,
  //         bezeichnung: "Pizza Peperoni",
  //         zubereitet: true
  //       },
  //       {
  //         id: 2,
  //         bezeichnung: "Pizza Magaritha",
  //         zubereitet: false
  //       },
  //       {
  //         id: 3,
  //         bezeichnung: "Pizza Magaritha",
  //         zubereitet: false
  //       }
        
  //     ]
  //   },
  //   {
  //     id: 2,
  //     zeit: new Date(),
  //     produkte: [
  //       {
  //         id: 1,
  //         bezeichnung: "Pizza Peperoni",
  //         zubereitet: true
  //       },
  //       {
  //         id: 2,
  //         bezeichnung: "Pizza Magaritha",
  //         zubereitet: false
  //       },
  //       {
  //         id: 3,
  //         bezeichnung: "Pizza Magaritha",
  //         zubereitet: false
  //       }
  //     ]
  //   }
  // ];

  bestellungen: bestellung[] = [];

  ausgewaehlt: number[] = [];


  

  getBestellungen() : void {
    this.bestellungService.getBestellungen().subscribe(item => this.bestellungen = item);
  }

  // produktePage(index : number) : void {
  //   console.log("produktePageSwitch");
  //   let produkte : produkt[];
  //   produkte = this.bestellungen[index].produkte;
  //   this.router.navigateByUrl('produkte/' + produkte);
  // }

  getTime(time: string) {
    return new Date(time);
  }

  getProzent(index : number): number {
     let anzahl = 0;
     let zubereitet = 0;

     for (let i = 0; i < this.bestellungen[index].produkte.length; i++) {
       if (this.bestellungen[index].produkte[i].zubereitet == "true") zubereitet++;
       anzahl++;
     }

     if (anzahl == 0) return 0;

     return zubereitet / anzahl;
   }
}
