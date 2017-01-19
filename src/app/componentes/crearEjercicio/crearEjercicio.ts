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
  infoUsuario: {nombre: string,
                repeticiones: string,
                series: string,
                peso: string,
                esCombinado: boolean,
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

  tuVieja(): void {
    this.servicioPersonas.actualizarUsuario();
  }

  onSubmit() {

  }
}