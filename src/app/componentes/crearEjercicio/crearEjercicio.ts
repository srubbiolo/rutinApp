import { Component, Input, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ServicioEjercicios } from '../../servicios/servicio.ejercicio';
import { ServicioPersonas } from '../../servicios/servicio.persona';
import { ServicioLocal } from '../../servicios/servicio.local';

import { Entrenador } from '../../Modelo/entrenador';
import { Cliente } from '../../Modelo/cliente';
import { Ejercicio } from '../../Modelo/ejercicio';
import { Gimnasio } from '../../Modelo/gimnasio';
import { Alertas } from '../../componentes/alertas/alertas';

@Component({
  selector: 'crear-ejercicio',
  templateUrl: 'crearEjercicio.html'
})
export class CrearEjercicio {

  miForm: FormGroup;
  infoEjercicio: {nombre: string,
                series: number,
                repeticiones: number,
                peso: number,
                esCombinado: string,
                descarga: string,
                cambioPeso: number,
                cambioRepeticiones: number,
                descripcion: string
                } = {
                nombre: '',
                series: 1,
                repeticiones: 0,
                peso: 0,
                esCombinado: null,
                descarga: '',
                cambioPeso: 0,
                cambioRepeticiones: 0,
                descripcion: ''};

  constructor(public viewCtrl: ViewController, private servicioPersonas: ServicioPersonas,
              private cliente: Cliente, private entrenador: Entrenador,
              private gimnasio: Gimnasio, public formBuilder: FormBuilder,
              private servicioLocal: ServicioLocal, private ejercicio: Ejercicio,
              private servicioEjercicios: ServicioEjercicios, private alerta: Alertas) {
    this.miForm = this.formBuilder.group({
      'nombre': ['', [Validators.required]],
      'series': ['',],
      'repeticiones': ['', [Validators.required, this.repeticionesValidator.bind(this)]],
      'peso': ['',],
      'descarga': ['', [Validators.required]],
      'cambioRepeticiones': ['',],
      'cambioPeso': ['',],
      'esCombinado': ['', [Validators.required]],
      'descripcion': ['', [Validators.required]]
    });
  }

  repeticionesValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value == 0 || control.value == null) {
        return {invalidRepeticiones: true};
    }
  }

  cerrarModal(): void {
    this.viewCtrl.dismiss();
  }

  isValid(field: string) {
      let formField = this.miForm.get(field);
      return formField.valid || formField.pristine;
  }

  onSubmit() {
    var ejercicio = new Ejercicio;
    var usuarioRegistrado: any = this.servicioLocal.getUsuarioRegistrado();
    ejercicio.emailDelCreador = usuarioRegistrado.email;
    ejercicio.nombre = this.infoEjercicio.nombre;
    ejercicio.repeticiones = this.infoEjercicio.repeticiones;
    ejercicio.series = this.infoEjercicio.series;
    ejercicio.peso = this.infoEjercicio.peso;
    ejercicio.descarga = this.infoEjercicio.descarga;
    ejercicio.cambioRepeticiones = (this.infoEjercicio.descarga === 'noCambio' ||
      this.infoEjercicio.descarga === 'cambioPeso') ? 0 : this.infoEjercicio.cambioRepeticiones;
    ejercicio.cambioPeso = (this.infoEjercicio.descarga === 'noCambio' ||
      this.infoEjercicio.descarga === 'cambioRepeticiones') ? 0 : this.infoEjercicio.cambioPeso;
    ejercicio.esCombinado = (this.infoEjercicio.esCombinado == 'true') ? true : false;
    ejercicio.descripcion = this.infoEjercicio.descripcion;
    this.servicioEjercicios.setEjercicio(ejercicio);
    this.alerta.mostrarToast('Se le ha creado el ejercicio con éxito', 'top', 2500);
    this.viewCtrl.dismiss();
  }
}