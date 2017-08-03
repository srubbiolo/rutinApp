import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Cliente } from '../Modelo/cliente';
import { Entrenador } from '../Modelo/entrenador';
import { Gimnasio } from '../Modelo/gimnasio';
import { Rutina } from '../Modelo/rutina';
import { ServicioLocal } from './servicio.local';

@Injectable()
export class ServicioPersonas {
    constructor(private storage: Storage, private gimnasio: Gimnasio,
                private servicioLocal: ServicioLocal) { }

    setUsuario(dataUsuario: any, tipoUsuario: string): void {
      var arrayUsuarios = [],
          usuario = (tipoUsuario == 'cliente') ? 'clientes' : 'entrenadores';
      this.storage.get(usuario).then((usuarios) => {
        if (usuarios == null) {
           arrayUsuarios.push(dataUsuario);
        } else {
           arrayUsuarios = usuarios;
           arrayUsuarios.push(dataUsuario);
        }
        this.storage.set(usuario, arrayUsuarios);
      })
    }

    actualizarUsuario(): void {
      var promesaCliente = this.getTodosLosClientes(),
          promesaEntrenador = this.getTodosLosEntrenadores(),
          nuevoArrayClientes = [],
          nuevoArrayEntrenadores = [],
          cantidadDeClientes = null,
          cantidadDeEntrenadores = null,
          usuarioRegistrado: any = this.servicioLocal.getUsuarioRegistrado();
      Promise.all([promesaCliente, promesaEntrenador]).then(val => {
        cantidadDeClientes = val[0].length;
        cantidadDeEntrenadores = val[1].length;

        nuevoArrayClientes = val[0].filter(elemento =>{
          return elemento.email !== usuarioRegistrado.email
        })

        nuevoArrayEntrenadores = val[1].filter(elemento =>{
          return elemento.email !== usuarioRegistrado.email
        })

        if (nuevoArrayClientes.length === cantidadDeClientes) {
          nuevoArrayEntrenadores.push(usuarioRegistrado);
          this.storage.set('entrenadores', nuevoArrayEntrenadores);
        } else {
          nuevoArrayClientes.push(usuarioRegistrado);
          this.storage.set('clientes', nuevoArrayClientes);
        }

      })
    }

    actualizarCliente(cliente: Cliente) {
      this.getTodosLosClientes().then(val => {

        var nuevoArrayClientes = val.filter(elemento =>{
          return elemento.email !== cliente.email;
        });
        nuevoArrayClientes.push(cliente);
        this.storage.set('clientes', nuevoArrayClientes);

      })
    }

    asignarRutinaACliente(cliente: Cliente, rutina: Rutina) {
      console.log(cliente);
      var usuarioRegistrado: any = this.servicioLocal.getUsuarioRegistrado();
      console.log(usuarioRegistrado);
      console.log(cliente.hasOwnProperty('tuVieja'));
      console.log(cliente.hasOwnProperty('listaDeRutinas'));
      console.log(cliente.hasOwnProperty('dni'));
      console.log(cliente.hasOwnProperty('apellido'));
      console.log(cliente.hasOwnProperty('nombre'));
      console.log(cliente.hasOwnProperty('gimnasio'));
      console.log(cliente.listaDeRutinas);
      console.log(cliente);
      console.log(cliente.nombre);
      console.log(cliente.apellido);
      if (cliente.hasOwnProperty('listaDeRutinas')) {
        console.log('entro en ture en hasownproperty');
        cliente.listaDeRutinas.push(rutina);
      } else {
        console.log('entro en false con el own property');
        cliente.listaDeRutinas = [];
        cliente.listaDeRutinas.push(rutina);
      }

      this.actualizarCliente(cliente);
    }

    setUsuarioIniciadoSesion(dataUsuario: any, tipoUsuario: String): void {
      var objetoUsuario = {sesionIniciada: true, datosDeUsuario: dataUsuario, claseUsuario: tipoUsuario};
      this.storage.set('usuario', objetoUsuario);
    }

    getUsuarioIniciadoSesion(): any {
      return this.storage.get('usuario');
    }

    logOut(): void {
      var objetoUsuario = {sesionIniciada: false, datosDeUsuario: {}};
      this.storage.set('usuario', objetoUsuario)
    }

    setGimnasio(gimnasio: Gimnasio): void {
      var arrayGimnasios = [];
        this.storage.get('gimnasios').then((gimnasios) => {
          if (gimnasios == null) {
             arrayGimnasios.push(gimnasio);
          } else {
             arrayGimnasios = gimnasios;
             arrayGimnasios.push(gimnasio);
          }
          this.storage.set('gimnasios', arrayGimnasios);
         })
    }

    asignarClienteAEntrenador(cliente: Cliente): void {
      var usuarioRegistrado: any = this.servicioLocal.getUsuarioRegistrado();
      var listaDeClientes = [];
      if (usuarioRegistrado.hasOwnProperty('listaDeClientes')) {
        usuarioRegistrado.listaDeClientes.push(cliente);
      } else {
        usuarioRegistrado.listaDeClientes = [];
        usuarioRegistrado.listaDeClientes.push(cliente);
      }

      this.servicioLocal.setUsuarioRegistrado(usuarioRegistrado);
      this.actualizarUsuario();

      //ahora se lo seteo al cliente.
      cliente.emailDelEntrenador = usuarioRegistrado.email;
      this.actualizarCliente(cliente);
    }

    getGimnasios(): any {
      return this.storage.get('gimnasios');
    }

    getTodosLosClientes(): any {
      return this.storage.get('clientes');
    }

    getTodosLosEntrenadores(): any {
      return this.storage.get('entrenadores');
    }

    eliminarTodo(): void {
      this.storage.clear();
    }

}