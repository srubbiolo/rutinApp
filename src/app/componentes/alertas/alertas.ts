import { Component, Input } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'alerta',
  template: 'alertas.html'
})
export class Alertas {

  constructor(public alertCtrl: AlertController) {
  }

  mostrarAlerta(titulo: string, subtitulo: string, boton: string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: subtitulo,
      buttons: [boton]
    });
    alert.present();
  }
}