import { Component, Input } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'alerta',
  template: 'alertas.html'
})
export class Alertas {

  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  mostrarAlerta(titulo: string, subtitulo: string, boton: string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: subtitulo,
      buttons: [boton]
    });
    alert.present();
  }

  mostrarToast(mensaje: string, posicion: string, duracion: number, ) {
    //posicion: top/middle/bottom
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: duracion,
      position: posicion
    });
    toast.present(toast);
  }
}