import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { produkt } from 'src/app/_interfaces/produkte';
import { BestellungService } from '../../../_service/bestellung.service';

@Component({
  selector: 'app-produkte',
  templateUrl: './produkte.page.html',
  styleUrls: ['./produkte.page.scss'],
})


export class ProduktePage implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private bestellungService: BestellungService) { 
  }

  ngOnInit() {
    this.produkte = this.router.getCurrentNavigation().extras.state.produkte;
  }

  bestellid   : number;
  expandedid  : number = null;

  produkte    : produkt[] = [];
  ausgewaehlt : number[] = [];

  

  // getProdukte(): void {
  //   this.bestellungService.getProdukteFromBestellung(this.bestellid).subscribe(item => this.setProdukte(item));
  // }

  setProdukte(item: any): void {
    console.log(item);
    this.produkte = item;
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
          p.zubereitet = "true";
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
