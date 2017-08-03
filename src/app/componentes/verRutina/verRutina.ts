import { Component, Input, OnInit } from '@angular/core';
import { ViewController, NavParams, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ServicioPersonas } from '../../servicios/servicio.persona';
import { ServicioLocal } from '../../servicios/servicio.local';
import { ServicioRutinas } from '../../servicios/servicio.rutina';

import { Entrenador } from '../../Modelo/entrenador';
import { Cliente } from '../../Modelo/cliente';
import { Gimnasio } from '../../Modelo/gimnasio';
import { Rutina } from '../../Modelo/rutina';
import { Ejercicio } from '../../Modelo/ejercicio';

import { AlertController } from 'ionic-angular';

import { VerEjercicio } from '../verEjercicio/verEjercicio';

@Component({
  selector: 'ver-rutina',
  templateUrl: 'verRutina.html'
})
export class VerRutina implements OnInit {
  constructor(public viewCtrl: ViewController, private servicioPersonas: ServicioPersonas,
              private cliente: Cliente, private entrenador: Entrenador,
              private gimnasio: Gimnasio, public formBuilder: FormBuilder,
              private servicioLocal: ServicioLocal, private alertCtrl: AlertController,
              private servicioRutinas: ServicioRutinas, public navParams: NavParams,
              public navCtrl: NavController) { }
  diaSeleccionado;
  rutina;
  ngOnInit(): void {
    var usuarioRegistrado: any = this.servicioLocal.getUsuarioRegistrado();
    this.rutina = this.navParams.get('rutinaSeleccionada');
    this.diaSeleccionado = '1';
  }

  mostrarEjercicio(ejercicio: Ejercicio): void {
    console.log(ejercicio);
    this.navCtrl.push(VerEjercicio, {ejercicioSeleccionado: ejercicio});
  }

  cerrarModal(): void {
    this.viewCtrl.dismiss();
  }
}