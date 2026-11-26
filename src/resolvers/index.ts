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

export const resolvers = {
    Query:{

    },
    Mutation:{

    }
};