// schema for graphql
export const typeDefs = `#graphql

    type Pelicula {
        _id: ID!,
        titulo: String!,
        duracionMin: Int!,
        butacasPorFila: Int!,
        aforo:Int!
    }

    type Sala {
        _id: ID!,
        nombre: String!,
        filas: Int!,
        butacasPorFila: Int!,
        aforo: Int!
    }

    type Sesion {
        _id: ID!,
        pelicula: Pelicula!,
        sala: Sala!,
        inicio: String!,
        precio: Int!,
        estado: String!,
        butacasLibres: Int!,
        ocupadas: [Butaca!]!
    }

    type Butaca {
        fila: Int!,
        numero: Int!
    }
    type Reserva {
        _id: ID!,
        sesion: Sesion!,
        cliente: String!,
        butacas: [Butaca!]!,
        importe: Int!,
        estado: String!,
        creadaEn: String!
    }

    type PaginaSesiones {
        datos: [Sesion!]!
        pagina: Int!,
        limite: Int!,
        totalElementos: Int!,
        totalPaginas: Int!
    }
`