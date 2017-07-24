import { Persona } from './persona';
import { Rutina } from './rutina';
import { Gimnasio } from './gimnasio';

export class Cliente extends Persona {
    solicitoDieta: boolean;
	solicitoRutina: boolean;
    gimnasio: Gimnasio;
    emailDelEntrenador: string;
    listaDeRutinas: Rutina [];
}