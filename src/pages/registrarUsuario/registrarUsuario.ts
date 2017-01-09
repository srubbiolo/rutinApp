//TODO: permitir seleccionar entrenador al usuario,sería igual que el select gimnasio.
//TODO: validar bien todo los campos, por ahora no valido un orto
import { Component , OnInit} from '@angular/core';

import { NavController } from 'ionic-angular';
import { ServicioPersonas } from '../../app/servicios/servicio.persona';
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
  gimnasios:  Gimnasio[];
  gimnasioSeleccionado;
  usuarioSeleccionado;
  datosCompletados;
  tipoUsuario;
  gimnasioDeUsuario: Gimnasio;

   myForm: FormGroup;
   userInfo: {nombre: string,
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
              private gimnasio: Gimnasio, public formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
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

  passwordValidator(control: FormControl): {[s: string]: boolean} {
      if (control.value !== '') {
          if (!control.value.match(/^(?=.*\d).{4,30}$/)) {
              return {invalidPassword: true};
          }
      }
  }

  nombreValidator(control: FormControl): {[s: string]: boolean} {
      if (control.value !== '') {
          if (!control.value.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/)) {
              return {invalidNombre: true};
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

  isValid(field: string) {
      let formField = this.myForm.get(field);
      return formField.valid || formField.pristine;
  }

  onSubmit() {
      console.log(this.userInfo);
  }

  ngOnInit(): void {
    this.gimnasioSeleccionado = false;
    this.usuarioSeleccionado = true;
    this.datosCompletados = true;
    this.recargarGimnasios();
  }

  recargarGimnasios(): void {
    this.servicioPersonas.getGimnasios().then((val) => {
      this.gimnasios = val;
    })
  }

  tipoUsuarioSeleccionado() {
    setTimeout(() => {
      console.log('usuarioSeleccionado', this.tipoUsuario);
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
