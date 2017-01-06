import { Persona } from './persona';
import { Rutina } from './rutina';
import { Gimnasio } from './gimnasio';

export class Cliente extends Persona {
    gimnasio: Gimnasio;
    entrenador: number;
    tieneFichaMedica: boolean;
    rutina: Rutina [];
}