import { Component, Input, OnInit } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ServicioEjercicios } from '../../servicios/servicio.ejercicio';
import { ServicioPersonas } from '../../servicios/servicio.persona';
import { ServicioLocal } from '../../servicios/servicio.local';
import { ServicioRutinas } from '../../servicios/servicio.rutina';

import { Entrenador } from '../../Modelo/entrenador';
import { Cliente } from '../../Modelo/cliente';
import { Ejercicio } from '../../Modelo/ejercicio';
import { Gimnasio } from '../../Modelo/gimnasio';
import { Rutina } from '../../Modelo/rutina';
import { RutinaDiaria } from '../../Modelo/rutinaDiaria';
import { AsignarRutina } from '../../componentes/asignarRutina/asignarRutina';

import { Alertas } from '../alertas/alertas';

@Component({
  selector: 'crear-rutina',
  templateUrl: 'crearRutina.html'
})
export class CrearRutina implements OnInit {
  miForm: FormGroup;
  infoRutina: {numeroDeDias: string;
                  titulo: String;
                  descripcion: String;
                } = {
                numeroDeDias: null,
                titulo: null,
                descripcion: null};
  todosLosEjercicios;
  todosLosEjerciciosDelEntrenador;
  ejerciciosDeLaRutina;
  nombreDeLaRutina;
  descripcionDeLaRutina;
  ejerciciosUsuario;
  ejerciciosTodos;
  rutinaActual;
  arrayDeDias;
  pasoUnoCompleto;
  constructor(public viewCtrl: ViewController, private servicioPersonas: ServicioPersonas,
              private cliente: Cliente, private entrenador: Entrenador,
              private gimnasio: Gimnasio, public formBuilder: FormBuilder,
              private servicioLocal: ServicioLocal, private ejercicio: Ejercicio,
              private servicioEjercicios: ServicioEjercicios, private alerta: Alertas,
              private servicioRutinas: ServicioRutinas, private navCtrl: NavController) { }

  ngOnInit(): void {
    this.cargarEjercicios();
    this.ejerciciosUsuario = true;
    this.ejerciciosTodos = false;
    this.rutinaActual = [];
    this.pasoUnoCompleto = false;
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
  }

  cambioElNombreDe(index) {
    this.arrayDeDias[index].titulo = this.infoRutina.titulo;
  }

  cambioLaDescripcionDe(index) {
    this.arrayDeDias[index].descripcion = this.infoRutina.descripcion;
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

  pasarASiguientePaso(): void {
    if (this.infoRutina.numeroDeDias !== null &&
        this.nombreDeLaRutina !== undefined &&
        this.descripcionDeLaRutina !== undefined) {
      this.pasoUnoCompleto = true;
    }
  }

  cargarEjercicios(): void {
    this.servicioEjercicios.getTodosLosEjercicios().then((ejercicios) => {
      this.todosLosEjercicios = ejercicios;
    })
    var entrenadorRegistrado: any = this.servicioLocal.getUsuarioRegistrado();
    this.todosLosEjerciciosDelEntrenador = entrenadorRegistrado.listaDeEjercicios;
  }

  crearRutina(): void {
    var datosCompletos = false;
    for (let i = 0;  i < this.arrayDeDias.length; i++) {
      if (this.arrayDeDias[i].titulo === undefined ||
         this.arrayDeDias[i].descripcion === undefined ||
         this.arrayDeDias[i].ejerciciosDeLaRutina.length === 0) {
        datosCompletos = false;
      }
      else {
        datosCompletos = true;
      }
    }

    if (datosCompletos) {
      var rutina = new Rutina;
      var usuarioRegistrado: any = this.servicioLocal.getUsuarioRegistrado();

      rutina.nombreRutina = this.nombreDeLaRutina;
      rutina.descripcionRutina = this.descripcionDeLaRutina;
      rutina.emailDelCreador = usuarioRegistrado.email;
      rutina.listaDeDias = [];

      for (let i = 0;  i < this.arrayDeDias.length; i++) {
        var rutinaDiaria = new RutinaDiaria;
        rutinaDiaria.diaNumero = i + 1;
        rutinaDiaria.titulo = this.arrayDeDias[i].titulo;
        rutinaDiaria.descripcion = this.arrayDeDias[i].descripcion;
        rutinaDiaria.listaDeEjercicios = this.arrayDeDias[i].ejerciciosDeLaRutina;
        rutina.listaDeDias.push(rutinaDiaria);
      }
      console.log(rutina);
      this.servicioRutinas.setRutina(rutina);
      this.alerta.mostrarToast('Se le ha creado la rutina con éxito', 'top', 2500);
      this.viewCtrl.dismiss();

    } else {
      this.alerta.mostrarAlerta('Atención', 'Campos no completos', 'Volver');
    }
  }

  crearRutinaYAsignar(): void {
    var datosCompletos = false;
    for (let i = 0;  i < this.arrayDeDias.length; i++) {
      if (this.arrayDeDias[i].titulo === undefined ||
         this.arrayDeDias[i].descripcion === undefined ||
         this.arrayDeDias[i].ejerciciosDeLaRutina.length === 0) {
        datosCompletos = false;
      }
      else {
        datosCompletos = true;
      }
    }

    if (datosCompletos) {
      var rutina = new Rutina;
      var usuarioRegistrado: any = this.servicioLocal.getUsuarioRegistrado();

      rutina.nombreRutina = this.nombreDeLaRutina;
      rutina.descripcionRutina = this.descripcionDeLaRutina;
      rutina.emailDelCreador = usuarioRegistrado.email;
      rutina.listaDeDias = [];

      for (let i = 0;  i < this.arrayDeDias.length; i++) {
        var rutinaDiaria = new RutinaDiaria;
        rutinaDiaria.diaNumero = i + 1;
        rutinaDiaria.titulo = this.arrayDeDias[i].titulo;
        rutinaDiaria.descripcion = this.arrayDeDias[i].descripcion;
        rutinaDiaria.listaDeEjercicios = this.arrayDeDias[i].ejerciciosDeLaRutina;
        rutina.listaDeDias.push(rutinaDiaria);
      }
      this.servicioRutinas.setRutina(rutina);
      this.viewCtrl.dismiss();
      this.alerta.mostrarToast('Se le ha creado la rutina con éxito', 'top', 2500);
      this.navCtrl.push(AsignarRutina, {rutinaCreada: rutina});

    } else {
      this.alerta.mostrarAlerta('Atención', 'Campos no completos', 'Volver');
    }
  }
}