interface IGetSuperheroesModel {
    id: number;
    nombre: string;
    nombreReal: string;
    biografia: string;
    afiliacion: string;
    origen: string;
    imagen: string;
    edad: number;
    nivelPoder: number;
}

export class GetSuperheroesModel {
    public readonly id: number;
    public readonly nombre: string;
    public readonly nombreReal: string;
    public readonly biografia: string;
    public readonly afiliacion: string;
    public readonly origen: string;
    public readonly imagen: string;
    public readonly edad: number;
    public readonly nivelPoder: number;

    constructor(data: IGetSuperheroesModel) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.nombreReal = data.nombreReal;
        this.biografia = data.biografia;
        this.afiliacion = data.afiliacion;
        this.origen = data.origen;
        this.imagen = data.imagen;
        this.edad = data.edad;
        this.nivelPoder = data.nivelPoder;
    }

    public static getKeys(): Record<keyof IGetSuperheroesModel, string> {
        return {
            id: 'id',
            nombre: 'name',
            nombreReal: 'realName',
            biografia: 'biography',
            afiliacion: 'affiliation',
            origen: 'origin',
            imagen: 'imageUrl',
            edad: 'age',
            nivelPoder: 'powerLevel',
        };
    }
}
