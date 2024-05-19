import { IUpdateSuperheroeFormValue } from '@modules/superheroes-module/domain';

interface IUpdateSuperheroeModel {
    id: number;
    nombre: string;
    nombreReal: string;
    afiliacion: string;
    edad: number;
    biografia: string;
    nivelPoder: number;
    origen: string;
    superPoderes: string[];
    habilidades: string[];
}

export class UpdateSuperheroeModel {
    public readonly id: number;
    public readonly nombre: string;
    public readonly nombreReal: string;
    public readonly afiliacion: string;
    public readonly edad: number;
    public readonly biografia: string;
    public readonly nivelPoder: number;
    public readonly origen: string;
    public readonly superPoderes: string[];
    public readonly habilidades: string[];

    constructor(data: IUpdateSuperheroeModel) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.nombreReal = data.nombreReal;
        this.afiliacion = data.afiliacion;
        this.edad = data.edad;
        this.biografia = data.biografia;
        this.nivelPoder = data.nivelPoder;
        this.origen = data.origen;
        this.superPoderes = data.superPoderes;
        this.habilidades = data.habilidades;
    }

    public static create(data: IUpdateSuperheroeFormValue): UpdateSuperheroeModel {
        return new UpdateSuperheroeModel({
            id: data.id!,
            nombre: data.nombre!.trim(),
            nombreReal: data.nombreReal!.trim(),
            afiliacion: data.afiliacion!.trim(),
            edad: data.edad!,
            biografia: data.biografia!.trim(),
            nivelPoder: data.nivelPoder!,
            origen: data.origen!.trim(),
            superPoderes: data.superPoderes?.map((sp) => sp.trim()) ?? [],
            habilidades: data.habilidades?.map((h) => h.trim()) ?? [],
        });
    }
}
