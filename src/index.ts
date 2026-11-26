import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema/index.js';
import { resolvers } from "./resolvers/index.js"
import { connectDB } from "./config/db.js"


const Server = new ApolloServer({
    typeDefs,
    resolvers
});

const startServer = async() => {
    await connectDB();

    const { url } = await startStandaloneServer(Server, {
        listen: {port: 3001}
    });

    console.log(`Server is up and running on ${ url }`)
};

startServer();