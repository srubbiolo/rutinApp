import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ServicioPersonas } from '../../app/servicios/servicio.persona';
import { ServicioLocal } from '../../app/servicios/servicio.local';
import { Cliente } from '../../app/Modelo/cliente';
import { Entrenador } from '../../app/Modelo/entrenador';
import { Alertas } from '../../app/componentes/alertas/alertas';
import { Gimnasio } from '../../app/Modelo/gimnasio';

import { RegistrarUsuario } from '../../pages/registrarUsuario/registrarUsuario';
import { MainEntrenador } from '../../pages/mainEntrenador/mainEntrenador';
import { MainCliente } from '../../pages/mainCliente/mainCliente';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 implements OnInit {

  constructor(public navCtrl: NavController, private servicioPersonas: ServicioPersonas,
              private cliente: Cliente, private alertas: Alertas, private servicioLocal: ServicioLocal) { }

  email = '';
  contrasenna = '';
  habilitarBoton = false;
  todosLosClientes;
  todosLosEntrenadores;
  mostrarDevTools;

  ngOnInit(): void {
    this.servicioPersonas.getUsuarioIniciadoSesion().then((val) => {
      console.log(val);
      if(val.sesionIniciada) {
        if (val.claseUsuario == 'cliente') {
          this.servicioLocal.setUsuarioRegistrado(val.datosDeUsuario);
          this.navCtrl.push(MainCliente);
        } else if (val.claseUsuario == 'entrenador') {
          this.servicioLocal.setUsuarioRegistrado(val.datosDeUsuario);
          this.navCtrl.push(MainEntrenador);
        }
      }
    })
    .catch((err) => {
      this.servicioPersonas.logOut();
      console.log('primera vez que se entra en este dispositivo');
    });

    this.servicioPersonas.getTodosLosClientes().then((val) => {
      this.todosLosClientes = val;
    });

    this.servicioPersonas.getTodosLosEntrenadores().then((val) => {
      this.todosLosEntrenadores = val;
    });

    this.mostrarDevTools = true;
  }

  iniciarSesion(): void {
    console.log('esto valen todos los clientes', this.todosLosClientes);
    var cliente = this.todosLosClientes.find(usuario => usuario.email == this.email),
        entrenador = this.todosLosEntrenadores.find(usuario => usuario.email == this.email);
    if (cliente !== undefined && entrenador === undefined) {
      if (cliente.contraseña === this.contrasenna) {
        console.log('tengo un cliente válido');
        this.servicioPersonas.setUsuarioIniciadoSesion(cliente, 'cliente');
        this.servicioLocal.setUsuarioRegistrado(cliente);
        this.navCtrl.push(MainCliente);
      } else {
        this.contrasenna = '';
        this.revisarCampos();
        this.alertas.mostrarAlerta('Uuups!', 'Contraseña equivocada, inténtelo de nuevo', 'Ok');
      }
    } else if (cliente === undefined && entrenador !== undefined) {
      if (entrenador.contraseña === this.contrasenna) {
        console.log('tengo un entrenador válido');
        this.servicioPersonas.setUsuarioIniciadoSesion(entrenador, 'entrenador');
        this.servicioLocal.setUsuarioRegistrado(entrenador);
        //redirigir apagina de entrenador
        this.navCtrl.push(MainEntrenador);
      } else {
        this.contrasenna = '';
        this.revisarCampos();
        this.alertas.mostrarAlerta('Uuups!', 'Contraseña equivocada, inténtelo de nuevo', 'Ok');
      }
    } else {
      this.email = '';
      this.contrasenna = '';
      this.revisarCampos();
      this.alertas.mostrarAlerta('Uuups!', 'Usuario no existente!', 'Ok');
    }
  }

  registrarUsuario(): void {
      this.email = '';
      this.contrasenna = '';
      this.revisarCampos();
      this.navCtrl.push(RegistrarUsuario);
  }

  revisarCampos(): void {
    this.habilitarBoton = true;

    if(this.email == '' || this.contrasenna == '') {
        this.habilitarBoton = false;
        //fire up alert component
    }
  }

agregarGimnasios(): void {
  this.servicioPersonas.setGimnasios();
}

mostrarGimnasios(): void {
    this.servicioPersonas.getGimnasios().then((val) => {
       console.log('todos los gimnasios', val);
     })
}

eliminar(): void {
    this.servicioPersonas.eliminarTodo();
}

mostrar(): void {
    this.servicioPersonas.getTodosLosClientes().then((val) => {
       console.log('todos los clientes', val);
     })
    this.servicioPersonas.getTodosLosEntrenadores().then((val) => {
       console.log('todos los entrenadores', val);
     })
}

cargar1y1(): void {
  var cliente = new Cliente;
  var entrenador = new Entrenador;
  var gym1 = new Gimnasio();
  gym1.barrio = 'Nueva Córdoba';
  gym1.ciudad = 'Córdoba';
  gym1.cp = 5000;
  gym1.id = 1;
  gym1.nombre = 'Synergy';
  gym1.pais = 'Argentina';

  cliente.nombre = 'Santiago';
  cliente.apellido = 'Rubbiolo';
  cliente.dni = 34315653;
  cliente.email = 'rubbiolo@gmail.com';
  cliente.gimnasio = gym1;
  cliente.contraseña = 'itnas1';
  cliente.fechaNacimiento = new Date('11-4-1989');
  cliente.telefono = 3516775504;

  entrenador.nombre = 'Federico';
  entrenador.apellido = 'Ussei';
  entrenador.dni = 34315654;
  entrenador.email = 'fede@gmail.com';
  entrenador.gimnasio = gym1;
  entrenador.contraseña = 'fede1';
  entrenador.fechaNacimiento = new Date('2-5-1988');
  entrenador.telefono = 3516775505;

  this.servicioPersonas.setUsuario(cliente, 'cliente');
  this.servicioPersonas.setUsuario(entrenador, 'entrenador');
}

toggleDevTools(): void {
  if (this.mostrarDevTools) {
    this.mostrarDevTools = false;
  } else {
    this.mostrarDevTools = true;
  }
}



}
