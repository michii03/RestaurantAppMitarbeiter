import { Component, Input, OnInit } from '@angular/core';
import { lagerProdukt } from '../../_interfaces/produkte';
import { ModalController,AlertController } from '@ionic/angular';
import { AddProduktPage } from '../lager/add-produkt/add-produkt.page';
import { InfoProduktPage } from './info-produkt/info-produkt.page';
import { MessageClient } from "cloudmailin";
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-lager',
  templateUrl: './lager.page.html',
  styleUrls: ['./lager.page.scss'],
})
export class LagerPage implements OnInit {


  lager: lagerProdukt[] = [
    {
      id: 1,
      bezeichnung: "Rotwein",
      fuellstand: 10,
      einheit: "Liter",
      min: 5,
      max: 40,
      kategorie: "getraenk"
    },
    {
      id: 2,
      bezeichnung: "Weißwein",
      fuellstand: 4,
      einheit: "Liter",
      min: 5,
      max: 40,
      kategorie: "getraenk"
    },
    {
      id: 3,
      bezeichnung: "Cola",
      fuellstand: 16,
      einheit: "Liter",
      min: 5,
      max: 40,
      kategorie: "getraenk"
    },
    {
      id: 4,
      bezeichnung: "Mehl",
      fuellstand: 20,
      einheit: "Kilogramm",
      min: 2,
      max: 30,
      kategorie: "zutat"
    },
    {
      id: 5,
      bezeichnung: "Zucker",
      fuellstand: 3,
      einheit: "Kilogramm",
      min: 5,
      max: 20,
      kategorie: "zutat"
    }
  ];

  kategorien: string[] = ["getraenk", "zutat"];
  einheiten: string[] = ["Liter", "Kilogramm"];

  @Input() editedProdukt: lagerProdukt;

  getraenkeCollapse: boolean = false;
  zutatenCollapse: boolean = false;
  percentage: number;
  filterTerm: string = "";

  constructor(public modalController: ModalController, public alertController: AlertController,) { }

  ngOnInit() {
    console.log(this.editedProdukt);
  }

  async openAddProdukte() {
    const modal = await this.modalController.create({
      component: AddProduktPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'modalController': this.modalController,
        'lager': this.lager
      }
    });
    return await modal.present();
  }

  async openInfoProdukte(item: lagerProdukt) {
    const modal = await this.modalController.create({
      component: InfoProduktPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'item': item,
        'modalController': this.modalController,
        'lager': this.lager
      }
    });
    return await modal.present();
  }

  deleteFinal(item: lagerProdukt) {

    let index = this.lager.indexOf(item);

    if (index > -1) {
      this.lager.splice(index, 1);
    }
  }

  async delete(item: lagerProdukt){
    const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Achtung',
        message: 'Wollen Sie sicher löschen?',
        buttons: [
            {
                text: 'Abbrechen',
                role: 'abbrechen'
            },
            {
                text: 'Löschen',
                role: 'bestaetigen'
            }
        ]
      });

      await alert.present();

      const { role } = await alert.onDidDismiss();
        if(role == "bestaetigen"){
            this.deleteFinal(item);
        }
}


  getPercentage(item: lagerProdukt): number {
    return item.fuellstand / item.max;
  }

  
  isCritical(item: lagerProdukt): string {
    if (item.fuellstand <= item.min) {

      return "danger";
    }

    if (this.getPercentage(item) <= 0.40) {
      // this.sendMail(item.bezeichnung);
      return "warning";
    }

    return "success";
  }

  addButton(item: lagerProdukt) {
    if (this.getPercentage(item) == 1) return;
    item.fuellstand++;
  }

  delButton(item: lagerProdukt) {
    if (this.getPercentage(item) == 0) return;
    item.fuellstand--;
  }

  setFuellstand(value: any, item: lagerProdukt) {
    item.fuellstand = value as number;
  }

}
