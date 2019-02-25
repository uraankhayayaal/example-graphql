const axios = require('axios');
const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema} = require('graphql');

// Article Type
const ArticleType = new GraphQLObjectType({
    name: 'Article',
    fields: () => ({
        id: {type: GraphQLInt},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        createdAt: {type: GraphQLString},
        isPublic: {type: GraphQLBoolean},
        comment: {type: CommentType}
    })
});

// Portfolio Type
const PortfolioType = new GraphQLObjectType({
    name: 'Portfolio',
    fields: () => ({
        id: {type: GraphQLInt},
        photo: {type: GraphQLString},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        isPublic: {type: GraphQLBoolean},
        status: {type: GraphQLString},
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString},
        userId: {type: GraphQLInt},
        User: {type: UserType},
    })
});

// User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLInt},
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString},
    })
});

// Comment Type
const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: {type: GraphQLInt},
        text: {type: GraphQLString},
        createdAt: {type: GraphQLString},
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        portfolios: {
            type: new GraphQLList(PortfolioType),
            resolve(parents, args){
                return axios.get('http://localhost:3000/api/portfolios')
                    .then(res => res.data);
            }
        },
        portfolio: {
            type: PortfolioType,
            args: {
                id: { type: GraphQLInt}
            },
            resolve(parents, args){
                return axios.get(`http://localhost:3000/api/portfolios/${args.id}`)
                    .then(res => res.data);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parents, args){
                return axios.get('http://localhost:3000/api/users')
                    .then(res => res.data);
            }
        },
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLInt}
            },
            resolve(parents, args){
                return axios.get(`http://localhost:3000/api/users/${args.id}`)
                    .then(res => res.data);
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});