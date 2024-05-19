import { FormControl } from '@angular/forms';

export interface ICreateSuperheroeForm {
    nombre: FormControl<string | null>;
    nombreReal: FormControl<string | null>;
    afiliacion: FormControl<string | null>;
    edad: FormControl<number | null>;
    biografia: FormControl<string | null>;
    nivelPoder: FormControl<number | null>;
    origen: FormControl<string | null>;
    superPoderes: FormControl<string[] | null>;
    habilidades: FormControl<string[] | null>;
}

export interface ICreateSuperheroeFormValue {
    nombre: string | null;
    nombreReal: string | null;
    afiliacion: string | null;
    edad: number | null;
    biografia: string | null;
    nivelPoder: number | null;
    origen: string | null;
    superPoderes: string[] | null;
    habilidades: string[] | null;
}
