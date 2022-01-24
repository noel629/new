const { ApolloServer, gql } = require('apollo-server')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const server = new ApolloServer({typeDefs, resolvers})

const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017')
mongoose.connect('mongodb+srv://yoj:030103@cluster0.ypxyo.mongodb.net/project?retryWrites=true&w=majority')
mongoose.connection.once('open', () => console.log('Connected to database!'))

server.listen(4000).then( ({url}) => console.log(`Server ready at port ${url}`))