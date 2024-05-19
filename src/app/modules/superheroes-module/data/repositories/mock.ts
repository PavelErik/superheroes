import { IPaginationBasicQueryDTO, IPaginationVmDTO, IResponseDTO } from '@core/dtos';
import { IGetSuperheroeDTO, IGetSuperheroesDTO, ICreateSuperheroeDTO, IUpdateSuperheroeDTO } from '@modules/superheroes-module/data';

// external data
const superheroesMock: ISuperheroeMock[] = [
    {
        id: 1,
        name: 'Superman',
        realName: 'Clark Kent',
        superPowers: ['Super fuerza', 'Vuelo', 'Visión de rayos X'],
        affiliation: 'Liga de la Justicia',
        age: 35,
        biography: 'Superman es un superhéroe ficticio que aparece en los cómics estadounidenses publicados por DC Comics.',
        imageUrl: 'avatar-1.png',
        powerLevel: 90,
        abilities: ['Poderes solares', 'Resistencia', 'Velocidad'],
        origin: 'Krypton',
    },
    {
        id: 2,
        name: 'Batman',
        realName: 'Bruce Wayne',
        superPowers: ['Conocimientos de detective', 'Estrategia', 'Riqueza'],
        affiliation: 'Liga de la Justicia',
        age: 40,
        biography: 'Batman es un superhéroe ficticio que aparece en los cómics estadounidenses publicados por DC Comics.',
        imageUrl: 'avatar-2.png',
        powerLevel: 85,
        abilities: ['Dominio de artes marciales', 'Inteligencia', 'Tecnología'],
        origin: 'Gotham City',
    },
    {
        id: 3,
        name: 'Ironman',
        realName: 'Tony Stark',
        superPowers: ['Inteligencia', 'Tecnología', 'Riqueza'],
        affiliation: 'Avengers',
        age: 45,
        biography: 'Ironman es un superhéroe ficticio que aparece en los cómics estadounidenses publicados por Marvel Comics.',
        imageUrl: 'avatar-3.png',
        powerLevel: 80,
        abilities: ['Dominio de tecnología', 'Resistencia', 'Vuelo'],
        origin: 'Nueva York',
    },
    {
        id: 4,
        name: 'Capitán América',
        realName: 'Steve Rogers',
        superPowers: ['Super fuerza', 'Resistencia', 'Escudo indestructible'],
        affiliation: 'Avengers',
        age: 100,
        biography: 'Capitán América es un superhéroe ficticio que aparece en los cómics estadounidenses publicados por Marvel Comics.',
        imageUrl: 'avatar-4.png',
        powerLevel: 75,
        abilities: ['Dominio de artes marciales', 'Resistencia', 'Escudo indestructible'],
        origin: 'Nueva York',
    },
    {
        id: 5,
        name: 'Thor',
        realName: 'Thor Odinson',
        superPowers: ['Super fuerza', 'Vuelo', 'Control del clima'],
        affiliation: 'Avengers',
        age: 100,
        biography: 'Thor es un superhéroe ficticio que aparece en los cómics estadounidenses publicados por Marvel Comics.',
        imageUrl: 'avatar-5.png',
        powerLevel: 70,
        abilities: ['Super fuerza', 'Vuelo', 'Control del clima'],
        origin: 'Asgard',
    },
    {
        id: 6,
        name: 'Mujer Maravilla',
        realName: 'Diana Prince',
        superPowers: ['Super fuerza', 'Vuelo', 'Inmortalidad'],
        affiliation: 'Liga de la Justicia',
        age: 100,
        biography: 'Mujer Maravilla es un superhéroe ficticio que aparece en los cómics estadounidenses publicados por DC Comics.',
        imageUrl: 'avatar-6.png',
        powerLevel: 65,
        abilities: ['Super fuerza', 'Vuelo', 'Inmortalidad'],
        origin: 'Themyscira',
    },
    {
        id: 7,
        name: 'Linterna Verde',
        realName: 'Hal Jordan',
        superPowers: ['Anillo de poder'],
        affiliation: 'Liga de la Justicia',
        age: 28,
        biography:
            'Linterna Verde es un superhéroe ficticio que aparece en los cómics estadounidenses publicados por DC Comics. Usa un anillo que le otorga poderes extraordinarios.',
        imageUrl: 'avatar-7.png',
        powerLevel: 80,
        abilities: ['Creación de constructos de energía', 'Vuelo', 'Campo de fuerza'],
        origin: 'Tierra',
    },
    {
        id: 8,
        name: 'Flash',
        realName: 'Barry Allen',
        superPowers: ['Super velocidad', 'Viaje en el tiempo', 'Metabolismo acelerado'],
        affiliation: 'Liga de la Justicia',
        age: 25,
        biography:
            'Flash es un superhéroe ficticio que aparece en los cómics estadounidenses publicados por DC Comics, conocido por su capacidad para moverse a velocidades sobrehumanas.',
        imageUrl: 'avatar-8.png',
        powerLevel: 90,
        abilities: ['Reflejos ultrarrápidos', 'Regeneración acelerada', 'Manipulación de la energía'],
        origin: 'Tierra',
    },
    {
        id: 9,
        name: 'Aquaman',
        realName: 'Arthur Curry',
        superPowers: ['Hablar con la vida marina', 'Nadar a velocidades supersónicas', 'Fuerza sobrehumana'],
        affiliation: 'Liga de la Justicia',
        age: 32,
        biography:
            'Aquaman es un superhéroe ficticio que aparece en los cómics estadounidenses publicados por DC Comics. Es el soberano del reino submarino de Atlantis.',
        imageUrl: 'avatar-9.png',
        powerLevel: 85,
        abilities: ['Adaptación acuática', 'Durabilidad aumentada', 'Telepatía marina'],
        origin: 'Atlantis',
    },
    {
        id: 10,
        name: 'Shazam',
        realName: 'Billy Batson',
        superPowers: ['Magia', 'Super fuerza', 'Manipulación eléctrica'],
        affiliation: 'Liga de la Justicia',
        age: 15,
        biography:
            "Shazam es un superhéroe ficticio que aparece en los cómics estadounidenses publicados por DC Comics, un niño que se transforma en adulto con poderes mágicos al pronunciar la palabra 'Shazam'.",
        imageUrl: 'avatar-10.png',
        powerLevel: 90,
        abilities: ['Invocación de rayos', 'Vuelo', 'Inteligencia mágica'],
        origin: 'Tierra',
    },
    {
        id: 11,
        name: 'Martian Manhunter',
        realName: "J'onn J'onzz",
        superPowers: ['Telepatía', 'Cambio de forma', 'Invisibilidad'],
        affiliation: 'Liga de la Justicia',
        age: 100,
        biography:
            'Martian Manhunter es un superhéroe ficticio que aparece en los cómics estadounidenses publicados por DC Comics, un marciano que sirve como puente entre la humanidad y los seres extraterrestres.',
        imageUrl: 'avatar-11.png',
        powerLevel: 88,
        abilities: ['Intangibilidad', 'Vuelo', 'Telepatía avanzada'],
        origin: 'Marte',
    },
    {
        id: 12,
        name: 'Green Arrow',
        realName: 'Oliver Queen',
        superPowers: ['Maestro arquero', 'Agilidad excepcional'],
        affiliation: 'Liga de la Justicia',
        age: 33,
        biography:
            'Green Arrow es un superhéroe ficticio que aparece en los cómics estadounidenses publicados por DC Comics, conocido por su habilidad con el arco y las flechas.',
        imageUrl: 'avatar-12.png',
        powerLevel: 70,
        abilities: ['Combate cuerpo a cuerpo', 'Estrategia y táctica', 'Uso experto de arco y flechas'],
        origin: 'Tierra',
    },
    {
        id: 13,
        name: 'Black Canary',
        realName: 'Dinah Lance',
        superPowers: ['Grito sónico', 'Combate cuerpo a cuerpo', 'Espionaje'],
        affiliation: 'Liga de la Justicia',
        age: 29,
        biography:
            'Black Canary es una superhéroe ficticia que aparece en los cómics estadounidenses publicados por DC Comics, conocida por su poderoso grito sónico y habilidades en combate.',
        imageUrl: 'avatar-13.png',
        powerLevel: 75,
        abilities: ['Grito sónico', 'Maestra en artes marciales', 'Agilidad excepcional'],
        origin: 'Tierra',
    },
    {
        id: 14,
        name: 'Hawkman',
        realName: 'Carter Hall',
        superPowers: ['Vuelo', 'Fuerza sobrehumana', 'Resistencia mejorada'],
        affiliation: 'Liga de la Justicia',
        age: 38,
        biography:
            'Hawkman es un superhéroe ficticio que aparece en los cómics estadounidenses publicados por DC Comics, armado con un arnés de Nth metal que le otorga la habilidad de volar y poderes regenerativos.',
        imageUrl: 'avatar-14.png',
        powerLevel: 80,
        abilities: ['Manejo de armas antiguas', 'Vuelo', 'Conocimiento de la historia'],
        origin: 'Tierra',
    },
    {
        id: 15,
        name: 'Supergirl',
        realName: 'Kara Zor-El',
        superPowers: ['Super fuerza', 'Vuelo', 'Visión de calor'],
        affiliation: 'Liga de la Justicia',
        age: 21,
        biography:
            'Supergirl es una superhéroe ficticia que aparece en los cómics estadounidenses publicados por DC Comics, prima de Superman y también proveniente del planeta Krypton.',
        imageUrl: 'avatar-15.png',
        powerLevel: 90,
        abilities: ['Super fuerza', 'Vuelo', 'Invulnerabilidad'],
        origin: 'Krypton',
    },
];

interface ISuperheroeMock {
    id: number;
    name: string;
    realName: string;
    superPowers: string[];
    affiliation: string;
    age: number;
    biography: string;
    imageUrl: string;
    powerLevel: number;
    abilities: string[];
    origin: string;
}

// api functions
export const getSuperHeroesApi = (request: IPaginationBasicQueryDTO): IResponseDTO<IPaginationVmDTO<IGetSuperheroesDTO>> => {
    let result = [...superheroesMock];

    // filter search
    if (request.search !== null) {
        result = result.filter((superheroe) => superheroe.name.toLowerCase().includes(request.search!.toLowerCase()));
    }

    // sort by
    if (request.sortField !== null && request.sortOrder !== null) {
        result = result.sort((a, b) => {
            const fieldA = a[request.sortField! as keyof ISuperheroeMock];
            const fieldB = b[request.sortField! as keyof ISuperheroeMock];
            if (fieldA < fieldB) {
                return -1 * request.sortOrder!;
            }
            if (fieldA > fieldB) {
                return 1 * request.sortOrder!;
            }
            return 0;
        });
    } else {
        result = result.sort((a, b) => {
            if (a.id < b.id) {
                return 1;
            }
            if (a.id > b.id) {
                return -1;
            }
            return 0;
        });
    }

    // pagination
    const [pageIndex, pageSize] = [request.pageIndex - 1, request.pageSize];
    const totalCount = result.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const data = result.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
    const pagination: IPaginationVmDTO<IGetSuperheroesDTO> = {
        totalCount: totalCount,
        pageCount: totalPages,
        pageIndex: pageIndex,
        pageSize: pageSize,
        data: data.map((superheroe) => ({
            id: superheroe.id,
            nombre: superheroe.name,
            nombreReal: superheroe.realName,
            biografia: superheroe.biography,
            afiliacion: superheroe.affiliation,
            origen: superheroe.origin,
            imagen: superheroe.imageUrl,
            edad: superheroe.age,
            nivelPoder: superheroe.powerLevel,
        })),
    };

    return {
        status: 200,
        type: 'success',
        title: 'Operación exitosa',
        success: true,
        messages: [],
        result: pagination,
    } as IResponseDTO<IPaginationVmDTO<IGetSuperheroesDTO>>;
};

export const getByIdSuperHeroeApi = (id: number): IResponseDTO<IGetSuperheroeDTO> => {
    const superheroe = superheroesMock.find((superheroe) => superheroe.id === id);

    if (!superheroe) {
        throw new Error('Superheroe no encontrado');
    }

    return {
        status: 200,
        type: 'success',
        title: 'Operación exitosa',
        success: true,
        messages: [],
        result: {
            id: superheroe!.id,
            nombre: superheroe!.name,
            nombreReal: superheroe!.realName,
            biografia: superheroe!.biography,
            afiliacion: superheroe!.affiliation,
            origen: superheroe!.origin,
            imagen: superheroe!.imageUrl,
            edad: superheroe!.age,
            nivelPoder: superheroe!.powerLevel,
            superPoderes: superheroe!.superPowers,
            habilidades: superheroe!.abilities,
        },
    } as IResponseDTO<IGetSuperheroeDTO>;
};

export const createSuperHeroeApi = (dto: ICreateSuperheroeDTO): IResponseDTO<number> => {
    const newId = superheroesMock.length + 1;
    superheroesMock.push({
        id: newId,
        name: dto.nombre,
        realName: dto.nombreReal,
        superPowers: dto.superPoderes,
        affiliation: dto.afiliacion,
        age: dto.edad,
        biography: dto.biografia,
        imageUrl: 'onyamalimba.png',
        powerLevel: dto.nivelPoder,
        abilities: dto.habilidades,
        origin: dto.origen,
    });

    return {
        status: 200,
        type: 'success',
        title: 'Operación exitosa',
        success: true,
        messages: [],
        result: newId,
    } as IResponseDTO<number>;
};

export const updateSuperHeroeApi = (dto: IUpdateSuperheroeDTO): IResponseDTO<number> => {
    const index = superheroesMock.findIndex((superheroe) => superheroe.id === dto.id);

    if (index === -1) {
        throw new Error('Superheroe no encontrado');
    }

    superheroesMock[index] = {
        id: dto.id,
        name: dto.nombre,
        realName: dto.nombreReal,
        superPowers: dto.superPoderes,
        affiliation: dto.afiliacion,
        age: dto.edad,
        biography: dto.biografia,
        imageUrl: 'onyamalimba.png',
        powerLevel: dto.nivelPoder,
        abilities: dto.habilidades,
        origin: dto.origen,
    };

    return {
        status: 200,
        type: 'success',
        title: 'Operación exitosa',
        success: true,
        messages: [],
        result: dto.id,
    } as IResponseDTO<number>;
};

export const deleteSuperHeroeApi = (id: number): IResponseDTO<boolean> => {
    const index = superheroesMock.findIndex((superheroe) => superheroe.id === id);

    if (index === -1) {
        throw new Error('Superheroe no encontrado');
    }

    superheroesMock.splice(index, 1);

    return {
        status: 200,
        type: 'success',
        title: 'Operación exitosa',
        success: true,
        messages: [],
        result: true,
    } as IResponseDTO<boolean>;
};
