// schema for graphql
export const typeDefs = `#graphql

    type Pelicula {
        _id: ID!,
        titulo: String!,
        duracionMin: Int!,
        edadMinima: Int!,
        genero:String!,
        sesiones:[Sesion!]!,
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
        fin: String!,
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

    type Query{
        peliculas(genero: String): [Pelicula!]!,
        pelicula(id: ID!): Pelicula,
        sesiones(peliculaId: ID, desde:String, hasta:String, pagina:Int, limite:Int): PaginaSesiones!
        sesion(id: ID!):Sesion,
        reservasCliente(cliente:String!):[Reserva!]!
    }

    type Mutation {
        crearPelicula(titulo,duracionMin,edadMinima,genero): Pelicula!
        crearSala(nombre,filas,butacasPorFila):Sala!
        crearSesion(peliculaId,salaId,inicio,precio):Sesion!
        cancelarSesion(id:ID!): Sesion!
        reservar(sesionId:ID!,cliente:String!,butacas:[ButacaInput!]!):Reserva!
        cancelarReserva(id:ID!):Reserva!
    }
`