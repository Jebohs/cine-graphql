import { Collection , MongoClient } from "mongodb";
import type { PeliculaT, SalaT,SesionT,ReservaT } from "../models/types.js";


const client = new MongoClient(process.env.MONGODB_URI!); //Change your .env to your Mongo url

let peliculasCollection: Collection<PeliculaT>;
let salasCollection: Collection<SalaT>;
let sesionesCollection: Collection<SesionT>;
let reservasCollection: Collection<ReservaT>;

export const connectDB = async () => {
    await client.connect();

    const db = client.db(process.env.DB_NAME); //Change .env to your database name

    peliculasCollection = db.collection<PeliculaT>("peliculas");
    salasCollection = db.collection<SalaT>("salas");
    sesionesCollection = db.collection<SesionT>("sesiones");
    reservasCollection = db.collection<ReservaT>("reservas");

    console.log("Conectado a MongoDB");
};

export const getPeliculasCollection = () => {
    return peliculasCollection
}

export const getSalasCollection = () => {
    return salasCollection
}
export const getSesionesCollection = () => {
    return sesionesCollection
}
export const getReservasCollection = () => {
    return reservasCollection
}