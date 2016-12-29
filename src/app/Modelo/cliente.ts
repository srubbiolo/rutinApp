import { Persona } from './persona';
import { Rutina } from './rutina';

export class Cliente extends Persona{
    entrenador: number;
    tieneFichaMedica: boolean;
    rutina: Rutina [];
}