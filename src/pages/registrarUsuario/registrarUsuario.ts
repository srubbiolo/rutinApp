//TODO: permitir seleccionar entrenador al usuario,sería igual que el select gimnasio.
//TODO: validar bien todo los campos, por ahora no valido un orto
import { Component , OnInit} from '@angular/core';

import { NavController } from 'ionic-angular';
import { ServicioPersonas } from '../../app/servicios/servicio.persona';
import { ServicioLocal } from '../../app/servicios/servicio.local';
import { Cliente } from '../../app/Modelo/cliente';
import { Entrenador } from '../../app/Modelo/entrenador';
import { Gimnasio } from '../../app/Modelo/gimnasio';
import { Alertas } from '../../app/componentes/alertas/alertas';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'registrar-usuario',
  templateUrl: 'registrarUsuario.html'
})
export class RegistrarUsuario implements OnInit{

  TIEMPO_TIMEOUT = 300;
  todosLosClientes;
  todosLosEntrenadores;
  gimnasios:  Gimnasio[];
  gimnasioSeleccionado;
  usuarioSeleccionado;
  datosCompletados;
  tipoUsuario;
  gimnasioDeUsuario: Gimnasio;
  sonPasswordsIguales;
  dniDuplicado;
  emailDuplicado;

   miForm: FormGroup;
   infoUsuario: {nombre: string,
              apellido: string,
              dni: string,
              fechaDeNacimiento: Date,
              email: string,
              telefono: string,
              password: string,
              password2: string
            } = {
              nombre: '',
              apellido: '',
              dni: '',
              fechaDeNacimiento: null,
              email: '',
              telefono: '',
              password: '',
              password2: ''};

  constructor(public navCtrl: NavController, private servicioPersonas: ServicioPersonas,
              private cliente: Cliente, private alertas: Alertas, private entrenador: Entrenador,
              private gimnasio: Gimnasio, public formBuilder: FormBuilder,
              private servicioLocal: ServicioLocal) {
    this.miForm = this.formBuilder.group({
      'nombre': ['', [Validators.required, this.nombreValidator.bind(this)]],
      'apellido': ['', [Validators.required, this.nombreValidator.bind(this)]],
      'dni': ['', [Validators.required, this.dniValidator.bind(this)]],
      'fechaDeNacimiento': ['', [Validators.required]],
      'email': ['', [Validators.required, this.emailValidator.bind(this)]],
      'telefono': ['', [Validators.required, this.telefonoValidator.bind(this)]],
      'password': ['', [Validators.required, this.passwordValidator.bind(this)]],
      'password2': ['', [Validators.required, this.passwordValidator.bind(this)]]
    });
  }

  ngOnInit(): void {
    this.gimnasioSeleccionado = false;
    this.usuarioSeleccionado = true;
    this.datosCompletados = true;
    this.sonPasswordsIguales = false;
    this.dniDuplicado = false;
    this.emailDuplicado = false;
    this.recargarGimnasios();
    this.cargarTodosLosUsuarios();
  }

  cargarTodosLosUsuarios(): void {
    this.servicioPersonas.getTodosLosClientes().then((val) => {
      this.todosLosClientes = val;
    })

    this.servicioPersonas.getTodosLosEntrenadores().then((val) => {
      this.todosLosEntrenadores = val;
    })
  }

  verificarDniDuplicado(): void {
    //TODO: Ver que quede rojo también el field
    var todosLosUsuarios;

    if (this.todosLosEntrenadores == null) {
      todosLosUsuarios = this.todosLosClientes;
    } else if (this.todosLosClientes == null) {
      todosLosUsuarios = this.todosLosEntrenadores;
    } else if (this.todosLosClientes == null && this.todosLosEntrenadores == null) {
      todosLosUsuarios = null;
    } else {
      todosLosUsuarios = this.todosLosClientes.concat(this.todosLosEntrenadores);
    }
    console.log(todosLosUsuarios);

    var usuarioDuplicado = todosLosUsuarios.find(usuario => usuario.dni == this.infoUsuario.dni);
    console.log(usuarioDuplicado);

    if (usuarioDuplicado !== undefined) {
      this.dniDuplicado = true;
    } else {
      this.dniDuplicado = false;
    }
  }

  verificarEmailDuplicado(): void {
    //TODO: Ver que quede rojo también el field
    var todosLosUsuarios;

    if (this.todosLosEntrenadores == null) {
      todosLosUsuarios = this.todosLosClientes;
    } else if (this.todosLosClientes == null) {
      todosLosUsuarios = this.todosLosEntrenadores;
    } else if (this.todosLosClientes == null && this.todosLosEntrenadores == null) {
      todosLosUsuarios = null;
    } else {
      todosLosUsuarios = this.todosLosClientes.concat(this.todosLosEntrenadores);
    }

    var usuarioDuplicado = todosLosUsuarios.find(usuario => usuario.email == this.infoUsuario.email);

    if (usuarioDuplicado !== undefined) {
      this.emailDuplicado = true;
    } else {
      this.emailDuplicado = false;
    }
  }

  nombreValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value !== '') {
        if (!control.value.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/)) {
            return {invalidNombre: true};
        }
    }
  }

  dniValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value !== '') {
        if (!control.value.match(/^\s*?[0-9]{7,8}\s*$/)) {
            return {invalidDni: true};
        }
    }
  }

  emailValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value !== '') {
        if (!control.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return {invalidEmail: true};
        }
    }
  }

  telefonoValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value !== '') {
        if (!control.value.match(/^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/)) {
            return {invalidTelefono: true};
        }
    }
  }

  passwordValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value !== '') {
        if (!control.value.match(/^(?=.*\d).{4,30}$/)) {
            return {invalidPassword: true};
        }
    }
  }

  revisarPasswordsIguales(): void {
    if(this.infoUsuario.password === this.infoUsuario.password2) {
      this.sonPasswordsIguales = true;
    } else {
      this.sonPasswordsIguales = false;
    }
  }

  isValid(field: string) {
      let formField = this.miForm.get(field);
      return formField.valid || formField.pristine;
  }

  onSubmit() {
    var usuario = (this.tipoUsuario == 'cliente') ? new Cliente : new Entrenador;
    usuario.nombre = this.infoUsuario.nombre;
    usuario.apellido = this.infoUsuario.apellido;
    usuario.dni = parseInt(this.infoUsuario.dni);
    usuario.email = this.infoUsuario.email;
    usuario.gimnasio = this.gimnasioDeUsuario;
    usuario.contraseña = this.infoUsuario.password;
    usuario.fechaNacimiento = new Date(this.infoUsuario.fechaDeNacimiento);
    usuario.telefono = parseInt(this.infoUsuario.telefono);
    // TODO: si es usuario agregar en caso que haya seleccionado un entrenador

    if (this.tipoUsuario == 'cliente') {
      this.servicioPersonas.setUsuario(usuario, 'cliente');
      // this.servicioPersonas.setUsuarioIniciadoSesion(usuario, 'cliente');
      // this.servicioLocal.setUsuarioRegistrado(usuario);
      //this.navCtrl.push(MainCliente)
    } else {
      this.servicioPersonas.setUsuario(usuario, 'entrenador')
      // this.servicioPersonas.setUsuarioIniciadoSesion(usuario, 'entrenador');
      // this.servicioLocal.setUsuarioRegistrado(usuario);
      //this.navCtrl.push(MainEntrenador)
    }

  }

  recargarGimnasios(): void {
    this.servicioPersonas.getGimnasios().then((val) => {
      this.gimnasios = val;
    })
  }

  tipoUsuarioSeleccionado() {
    setTimeout(() => {
      this.usuarioSeleccionado = true;
      this.datosCompletados = false;
    }, this.TIEMPO_TIMEOUT);
  }

  agregarGimnasio(gym: Gimnasio) {
    setTimeout(() => {
      this.gimnasioDeUsuario = gym;
      this.gimnasioSeleccionado = true;
      this.usuarioSeleccionado = false;
    }, this.TIEMPO_TIMEOUT);
  }

  sinGimnasio() {
    setTimeout(() => {
      this.gimnasioDeUsuario = null;
      this.gimnasioSeleccionado = true;
      this.usuarioSeleccionado = false;
    }, this.TIEMPO_TIMEOUT);
  }

  getItems(ev: any) {
    //TODO revisar que solo cuando borras todo fonca
    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.gimnasios = this.gimnasios.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.recargarGimnasios();
    }
  }



}
