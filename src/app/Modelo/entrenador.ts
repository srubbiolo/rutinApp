import { Persona } from './persona';
import { Rutina } from './rutina';
import { Cliente } from './cliente';
import { Gimnasio } from './gimnasio';
import { Ejercicio } from './ejercicio';

export class Entrenador extends Persona {
	listaDeEjercicios: Ejercicio [];
    gimnasio: Gimnasio;
    listaDeClientes: Cliente [];
    listaDeRutinas: Rutina [];
}