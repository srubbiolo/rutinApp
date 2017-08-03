import { Component, Input, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ServicioPersonas } from '../../servicios/servicio.persona';
import { ServicioLocal } from '../../servicios/servicio.local';
import { ServicioRutinas } from '../../servicios/servicio.rutina';

import { Entrenador } from '../../Modelo/entrenador';
import { Cliente } from '../../Modelo/cliente';
import { Gimnasio } from '../../Modelo/gimnasio';
import { Rutina } from '../../Modelo/rutina';

import { AlertController } from 'ionic-angular';

@Component({
  selector: 'ver-ejercicio',
  templateUrl: 'verEjercicio.html'
})
export class VerEjercicio implements OnInit {
  constructor(public viewCtrl: ViewController, private servicioPersonas: ServicioPersonas,
              private cliente: Cliente, private entrenador: Entrenador,
              private gimnasio: Gimnasio, public formBuilder: FormBuilder,
              private servicioLocal: ServicioLocal, private alertCtrl: AlertController,
              private servicioRutinas: ServicioRutinas, public navParams: NavParams) { }
  ejercicio;
  ejercicioAMostrar;
  series;

  ngOnInit(): void {
    var usuarioRegistrado: any = this.servicioLocal.getUsuarioRegistrado();
    this.ejercicio = this.navParams.get('ejercicioSeleccionado');
    this.series = [];
    this.ejercicioAMostrar = JSON.parse(JSON.stringify(this.ejercicio));
      for (let i = 0; i < this.ejercicio.series; i++) {
        if (i === 0) {
          var serie = {
            numeroDeSerie: i + 1,
            repeticiones: this.ejercicioAMostrar.repeticiones,
            peso: this.ejercicioAMostrar.peso
          }
        } else {
          var serie = {
            numeroDeSerie: i + 1,
            repeticiones: this.ejercicioAMostrar.repeticiones += this.ejercicio.cambioRepeticiones,
            peso: this.ejercicioAMostrar.peso += this.ejercicio.cambioPeso
          }
        }

        this.series.push(serie);
      }
  }

  cerrarModal(): void {
    this.viewCtrl.dismiss();
  }
}