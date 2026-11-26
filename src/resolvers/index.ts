import { ObjectId , type Collection } from "mongodb";
import {GraphQLError } from "graphql";

import {
    getPeliculasCollection,
    getSalasCollection,
    getSesionesCollection,
    getReservasCollection
} from "../config/db.js"

import type {
    PeliculaT, SalaT, SesionT, ButacaT, ReservaT
} from "../models/types.js"


const checkPeliculaExiste = async (peliculaId: ObjectId) =>{
    const collection = getPeliculasCollection();
    const pelicula = await collection.findOne({_id: peliculaId});

    if(!pelicula){
        throw new GraphQLError("Pelicula no existe",{
            extensions: {code: "BAD_USER_INPUT"}
        })
    }
    return pelicula;
}

const checkSalaExiste = async (salaId: ObjectId) =>{
    const collection = getPeliculasCollection();
    const sala = await collection.findOne({_id: salaId});

    if(!sala){
        throw new GraphQLError("Sala no existe",{
            extensions: {code: "NOT_FOUND"}
        })
    }
    return sala;
}

const checkSesionExiste = async (SesionId: ObjectId) =>{
    const collection = getPeliculasCollection();
    const Sesion = await collection.findOne({_id: SesionId});

    if(!Sesion){
        throw new GraphQLError("Sesion no existe",{
            extensions: {code: "NOT_FOUND"}
        })
    }
    return Sesion;
}


export const resolvers = {
    Query:{
        peliculas: async (_: unknown , args:{ genero?:string}) => {
            const collection = getPeliculasCollection();

            if(args.genero){
                return await collection.find ({genero : args.genero}).toArray();
            }

            return await collection.find().toArray();
        },

        pelicula: async (_: unknown, args: {id: string}) =>{
            const id = new ObjectId(args.id);
            const collection = getPeliculasCollection();

            return collection.findOne({_id : id});
        },

        // These filters are optional
        sesiones: async (_:unknown, args: {peliculaId?: string, desde?: string, hasta?:string ,pagina?:number ,limite?:number}) => {
            const collection = getSesionesCollection();
            const {peliculaId} = args
            const {desde} = args
            const {hasta} = args;
            const {pagina = 1} = args;
            const {limite = 10} = args; //default values

            if (pagina < 1 || limite < 1 || limite> 50){
                throw new GraphQLError("Paginas no validas",{
                    extensions: {code:  "BAD_UDER_INPUT" }
                });
            }
            //todo mongodb filter
            const filter: any = {};

            return;
        },

        sesion: async (_: unknown, args: {id: string}) =>{
            const id = new ObjectId(args.id);
            const collection = getSesionesCollection();

            return await collection.findOne({_id: id});
        },

        reservasCliente: async (_:unknown , args: {cliente:string}) =>{
            const collection = getReservasCollection();
            return await collection.find({
                cliente: args.cliente
            }).toArray();
        }
    },

    Mutation:{


    }
}