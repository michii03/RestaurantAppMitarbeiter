import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { lagerProdukt } from '../../../_interfaces/produkte';

@Component({
  selector: 'app-add-produkt',
  templateUrl: './add-produkt.page.html',
  styleUrls: ['./add-produkt.page.scss'],
})
export class AddProduktPage implements OnInit {
  
  @Input() modalController  : ModalController;
  @Input() lager            : lagerProdukt[];

  kritisch     : any = -1;
  max          : any = -1;
  bezeichnung  : string = "";
  kategorie    : string = "getraenk";
  einheit      : string = "";

  kategorien: string[] = ["getraenk","zutat"];
  einheiten: string[] = ["Liter","Kilogramm", "Gramm"];

  constructor() { }

  ngOnInit() {
  }

  speichern() {
    if (!this.validate()) return;

    let newItem : lagerProdukt = {
      id          : this.lager.length + 1000,
      bezeichnung : this.bezeichnung,
      fuellstand  : 0,
      einheit     : this.einheit,
      min         : this.kritisch,
      max         : this.max,
      kategorie   : this.kategorie
    }

    console.log(newItem);

    this.lager.push(newItem);
    this.dismiss();
  }

  validate() : boolean {
    if (this.kritisch == null || this.kritisch < 0) return false;
    if (this.max == null || this.max < 0) return false;
    if (this.bezeichnung == "") return false;
    if (this.einheit == "") return false;

    return true;
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  setEinheit( value : any) {
    this.einheit = value;
  }

  setMax( value : any) {
    this.max = value;
  }

  setKritisch( value : any) {
    this.kritisch = value;
  }

  setBezeichnung( value : any) {
    this.bezeichnung = value;
  }

  setKategorie( value : any) {
    this.kategorie = value;
  }

}
