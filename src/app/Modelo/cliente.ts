import { Persona } from './persona';
import { Rutina } from './rutina';
import { Gimnasio } from './gimnasio';
import { Entrenador } from './entrenador';

export class Cliente extends Persona {
	solicitoRutina: boolean;
    gimnasio: Gimnasio;
    entrenador: Entrenador;
    rutina: Rutina [];
}