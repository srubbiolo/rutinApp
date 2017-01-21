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
  selector: 'crear-rutina',
  templateUrl: 'crearRutina.html'
})
export class CrearRutina implements OnInit{
todosLosEjercicios;
todosLosEjerciciosDelEntrenador;
ejerciciosDeLaRutina;
nombreDeLaRutina;
ejerciciosUsuario;
ejerciciosTodos;
rutinaActual;
  constructor(public viewCtrl: ViewController, private servicioPersonas: ServicioPersonas,
              private cliente: Cliente, private entrenador: Entrenador,
              private gimnasio: Gimnasio, public formBuilder: FormBuilder,
              private servicioLocal: ServicioLocal, private ejercicio: Ejercicio,
              private servicioEjercicios: ServicioEjercicios) { }

  ngOnInit(): void {
    this.cargarEjercicios();
    this.ejerciciosUsuario = true;
    this.ejerciciosTodos = false;
    this.rutinaActual = [];
  }

  cambiarLista(): void {
    if (this.ejerciciosUsuario === true) {
      this.ejerciciosUsuario = false;
      this.ejerciciosTodos = true;
    } else {
      this.ejerciciosUsuario = true;
      this.ejerciciosTodos = false;
    }
  }

  agregarEjercicio(ejercicio): void {
    if (this.ejerciciosUsuario === true) {
      this.todosLosEjerciciosDelEntrenador = this.todosLosEjerciciosDelEntrenador.filter(ejer =>{
        return ejer.nombre !== ejercicio.nombre
      })
    } else {
      this.todosLosEjercicios = this.todosLosEjercicios.filter(ejer =>{
        return ejer.nombre !== ejercicio.nombre
      })
    }

    this.rutinaActual.push(ejercicio);
  }

  removerEjercicio(ejercicio): void {
    if (this.ejerciciosUsuario === true) {
      this.todosLosEjerciciosDelEntrenador.push(ejercicio);
    } else {
      this.todosLosEjercicios.push(ejercicio);
    }

    this.rutinaActual = this.rutinaActual.filter(ejer =>{
        return ejer.nombre !== ejercicio.nombre
      })
  }

  cerrarModal(): void {
    this.viewCtrl.dismiss();
  }

  cargarEjercicios(): void {
    this.servicioEjercicios.getTodosLosEjercicios().then((ejercicios) => {
      this.todosLosEjercicios = ejercicios;
    })
    var entrenadorRegistrado: any = this.servicioLocal.getUsuarioRegistrado();
    this.todosLosEjerciciosDelEntrenador = entrenadorRegistrado.listaDeEjercicios;
  }
}