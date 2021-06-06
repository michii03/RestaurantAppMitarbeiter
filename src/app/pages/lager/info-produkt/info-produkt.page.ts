import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { lagerProdukt } from 'src/app/_interfaces/produkte';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-info-produkt',
  templateUrl: './info-produkt.page.html',
  styleUrls: ['./info-produkt.page.scss'],
})
export class InfoProduktPage implements OnInit {

  @Input() item : lagerProdukt;
  @Input() modalController: ModalController;
  @Input() lager            : lagerProdukt[];

  newFuellstand   : any;
  newMin          : any;
  newMax          : any;
  newBezeichnung  : string;

  constructor(public alertController: AlertController) { }

  ngOnInit() {
      this.newFuellstand = this.item.fuellstand;
      this.newMin = this.item.min;
      this.newMax = this.item.max;
      this.newBezeichnung = this.item.bezeichnung;
  }

  setFuellstand(value: any) {
    this.newFuellstand = value;
  }
  setMin(value: any) {
    this.newMin = value;
  }
  setMax(value: any) {
    this.newMax = value;
  }
  setBezeichnung(value: any) {
    this.newBezeichnung = value;
  }

  speichern() {
    if (this.validation()) {
      this.item.fuellstand = this.newFuellstand;
      this.item.min = this.newMin;
      this.item.max = this.newMax;
      this.item.bezeichnung = this.newBezeichnung;
      this.persist();
      this.dismiss();
    }
  }

  deleteFinal() {
    let index = this.lager.indexOf(this.item);

    if (index > -1) {
      this.lager.splice(index, 1);
    }
    this.dismiss();
  }

  async delete(){
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
            this.deleteFinal();
        }
}

  persist() {
    // in Datenbank speichern.
  }

  validation() : boolean {
    if (this.newMax < this.newMin) {
      this.presentAlert("Maximum muss größer als Minimum sein");
      return false;
    }
    if (this.newBezeichnung.length == 0) { 
      this.presentAlert("Bezeichnung zu kurz");
      return false;
    }
    if (this.newFuellstand > this.newMax || this.newFuellstand < 0) {
      this.presentAlert("Füllstand Error");
      return false;
    }
    if (this.newBezeichnung.length > 18) {
      this.presentAlert("Bezeichnung zu lang");
      return false;
    }
    return true;
  }

  async presentAlert(text: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Achtung!',
      message: text,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  isCritical() : boolean {
    return this.item.fuellstand < this.item.min;
  }

}
