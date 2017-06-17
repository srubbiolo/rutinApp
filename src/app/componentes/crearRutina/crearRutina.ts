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
export class CrearRutina implements OnInit {
  miForm: FormGroup;
  infoRutina: {numeroDeDias: string;
                  titulo: String;
                } = {
                numeroDeDias: null,
                titulo: null};
todosLosEjercicios;
todosLosEjerciciosDelEntrenador;
ejerciciosDeLaRutina;
nombreDeLaRutina;
ejerciciosUsuario;
ejerciciosTodos;
rutinaActual;
arrayDeDias;
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

  seleccionoDias(): void {
    this.arrayDeDias = new Array(parseInt(this.infoRutina.numeroDeDias));
    for(let i = 0; i < this.arrayDeDias.length; i++) {
      this.arrayDeDias[i] = {
        titulo: null,
        descripcion: null,
        ejerciciosDelEntrenador: this.todosLosEjerciciosDelEntrenador,
        ejerciciosDeTodos: this.todosLosEjercicios,
        ejerciciosDeLaRutina: new Array()
      };
    }
    console.log(this.infoRutina.numeroDeDias);
    console.log(this.arrayDeDias);
  }

  cambioElNombreDe(index) {
    this.arrayDeDias[index].titulo = this.infoRutina.titulo;
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

  agregarEjercicio(ejercicio, indexDia): void {
    if (this.ejerciciosUsuario === true) {
      this.arrayDeDias[indexDia].ejerciciosDelEntrenador = this.arrayDeDias[indexDia].ejerciciosDelEntrenador.filter(ejer =>{
        return ejer.nombre !== ejercicio.nombre
      })
    } else {
      this.arrayDeDias[indexDia].ejerciciosDeTodos = this.arrayDeDias[indexDia].ejerciciosDeTodos.filter(ejer =>{
        return ejer.nombre !== ejercicio.nombre
      })
    }

    this.arrayDeDias[indexDia].ejerciciosDeLaRutina.push(ejercicio);
  }

  removerEjercicio(ejercicio, indexDia): void {
    if (this.ejerciciosUsuario === true) {
      this.arrayDeDias[indexDia].ejerciciosDelEntrenador.push(ejercicio);
    } else {
      this.arrayDeDias[indexDia].ejerciciosDeTodos.push(ejercicio);
    }

    this.arrayDeDias[indexDia].ejerciciosDeLaRutina = this.arrayDeDias[indexDia].ejerciciosDeLaRutina.filter(ejer =>{
        return ejer.nombre !== ejercicio.nombre
      })
  }

  cerrarModal(): void {
    this.viewCtrl.dismiss();
  }

  crearRutina(): void {
    this.rutinaActual
  }

  cargarEjercicios(): void {
    this.servicioEjercicios.getTodosLosEjercicios().then((ejercicios) => {
      this.todosLosEjercicios = ejercicios;
    })
    var entrenadorRegistrado: any = this.servicioLocal.getUsuarioRegistrado();
    this.todosLosEjerciciosDelEntrenador = entrenadorRegistrado.listaDeEjercicios;
  }
}