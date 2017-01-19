import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Cliente } from '../Modelo/cliente';
import { Entrenador } from '../Modelo/entrenador';
import { Gimnasio } from '../Modelo/gimnasio';
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