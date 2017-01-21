//TODO: falta validar los campos de este form, o mas facil, poner spinners para seleccionar data
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

@Component({
  selector: 'crear-ejercicio',
  templateUrl: 'crearEjercicio.html'
})
export class CrearEjercicio {

  miForm: FormGroup;
  infoEjercicio: {nombre: string,
                repeticiones: string,
                series: string,
                peso: string,
                esCombinado: string,
                descripcion: string
                } = {
                nombre: '',
                repeticiones: '',
                series: '',
                peso: '',
                esCombinado: null,
                descripcion: ''};

  constructor(public viewCtrl: ViewController, private servicioPersonas: ServicioPersonas,
              private cliente: Cliente, private entrenador: Entrenador,
              private gimnasio: Gimnasio, public formBuilder: FormBuilder,
              private servicioLocal: ServicioLocal, private ejercicio: Ejercicio,
              private servicioEjercicios: ServicioEjercicios) {
    this.miForm = this.formBuilder.group({
      'nombre': ['', [Validators.required]],
      'repeticiones': ['', [Validators.required]],
      'series': ['', [Validators.required]],
      'peso': ['', [Validators.required]],
      'esCombinado': ['', [Validators.required]],
      'descripcion': ['', [Validators.required]]
    });
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
    ejercicio.repeticiones = parseInt(this.infoEjercicio.repeticiones);
    ejercicio.series = parseInt(this.infoEjercicio.series);
    ejercicio.peso = parseInt(this.infoEjercicio.peso);
    ejercicio.esCombinado = (this.infoEjercicio.esCombinado == 'true') ? true : false;
    ejercicio.descripcion = this.infoEjercicio.descripcion;
    this.servicioEjercicios.setEjercicio(ejercicio);
    this.viewCtrl.dismiss();

  }
}