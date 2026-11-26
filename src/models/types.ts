import type { ObjectId } from "mongodb";

// fields which are missing will be calculated, they do not need to be stored,
// for example the movie end time can be done with inicio + duracion min.

export type Pelicula = {
        _id?: ObjectId,
        titulo: string,
        duracionMin: number,
        edadMinima: number,
        genero: string
    }

export type Sala = {
        _id?: ObjectId,
        nombre: string,
        filas: number,
        butacasPorFila: number,
    }

export type Sesion = {
        _id?: ObjectId,
        peliculaId: ObjectId,
        salaId: ObjectId,
        inicio: string,
        precio: number,
        estado: string,
    }

export type Butaca = {
        fila: number,
        numero: number
    }

export type Reserva = {
        _id?: ObjectId,
        sesionId: ObjectId,
        cliente: string,
        butacas: Butaca[],
        importe: number,
        estado: string,
        creadaEn: string
    }