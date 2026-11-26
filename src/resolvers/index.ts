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
import { totalmem } from "node:os";


const checkPeliculaExiste = async (peliculaId: ObjectId) =>{
    const collection = getPeliculasCollection();
    const pelicula = await collection.findOne({_id: peliculaId});

    if(!pelicula){
        throw new GraphQLError("Pelicula no existe",{
            extensions: {code: "NOT_FOUND"}
        })
    }
    return pelicula;
}

const checkSalaExiste = async (salaId: ObjectId) =>{
    const collection = getSalasCollection();
    const sala = await collection.findOne({_id: salaId});

    if(!sala){
        throw new GraphQLError("Sala no existe",{
            extensions: {code: "NOT_FOUND"}
        })
    }
    return sala;
}

const checkSesionExiste = async (SesionId: ObjectId) =>{
    const collection = getSesionesCollection();
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
            const filter: any = {};
            if(peliculaId){
                if (!ObjectId.isValid(peliculaId)) {
                    throw new GraphQLError("ID de pelicula no valido", {extensions: {code : "BAD_USER_INPUT"}})
                }
                filter.peliculaId = new ObjectId(peliculaId);
            }
            if(desde){
                filter.inicio = {$gte:desde}; //greater than equal
            }
            if(hasta){
                filter.inicio = {...filter.inicio, $lte: hasta}; //less than equal
            }

            const totalElementos = await collection.countDocuments(filter); 
            const totalPaginas = Math.ceil(totalElementos/ limite);

            const datos = await collection.find(filter).sort({inicio: 1}).skip((pagina-1)*limite).limit(limite).toArray();

            return {datos , pagina, limite, totalElementos, totalPaginas}
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