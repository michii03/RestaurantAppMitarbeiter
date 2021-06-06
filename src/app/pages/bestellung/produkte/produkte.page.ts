import { Component, OnInit } from '@angular/core';
import { produkt } from '../../../_interfaces/produkte';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'

@Component({
  selector: 'app-produkte',
  templateUrl: './produkte.page.html',
  styleUrls: ['./produkte.page.scss'],
})


export class ProduktePage implements OnInit {
  bestellid   : number;
  expandedid  : number;

  produkte : produkt[] = [
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
      ];

  ausgewaehlt: number[] = new Array();

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //this.produkte = this.router.getCurrentNavigation().extras.state.produkte; 
    // this.route.queryParams.subscribe(params => {
    //   if (params) {
    //     this.bestellid = params[0];
    //   }
    // });
    // this.expandedid = null;
  }

  setExpanded(id : number) : void {
    this.clearAusgewaehlt();
    if (this.expandedid == id) {
      this.expandedid = null;
    } else {
      this.expandedid = id;
    }
  }

  setZubereitet() : void {
    this.ausgewaehlt.forEach(i => {
      this.produkte.forEach(p => {
        if (i == p.id) {
          p.zubereitet = true;
        }
      });
    });
    this.clearAusgewaehlt();
  }

  addAusgewaehlt(id: number, index: number): void {
    this.ausgewaehlt[index] = id;
  }

  delAusgewaehlt(id: number, index: number): void {
    this.ausgewaehlt[index] = null;
    this.expandedid = null;
  }

  clearAusgewaehlt(): void {
    for (let i = 0; i < this.ausgewaehlt.length; i++) {
      this.ausgewaehlt[i] = null;
    }
  }

  isAusgewaehlt(index: number): boolean {
    if (this.ausgewaehlt[index] != null) {
      return true;
    }
    return false;
  }

  hasElementsAusgewaehlt(): boolean {
    for (let i = 0; i < this.ausgewaehlt.length; i++) {
      if (this.ausgewaehlt[i] != null) return true;
    }
    return false;
  }

}
