import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `#graphql

  enum ComponentType {
    Form
    Button
  }
  
  type Action {
    id_: String
    action: String
  }

  interface Component{
    type_: ComponentType
    label: String
    action: Action
  }

  type Button implements Component{
    type_: ComponentType
    label: String
    action: Action
  }

  type Form implements Component{
    type_: ComponentType
    label: String
    name: String
    value: String
    action: Action
  }

  type Layout {
    page: String
    components: [Component]
  }

  type Data {
    label: String
  }

  type Query {
    layout(page: String): Layout
    data: [Data]
  }
`;


const components = { Home: [
    {
      type_: 'Button',
      label: 'Click Me',
      action: {
        id_: 'btn',
        action: 'click'
      }
    },
    {
      type_: 'Form',
      label: 'Input Data',
      action: {
        id_: 'form',
        action: 'submit'
      }
    }
  ]
}


const resolvers = {
  Component: {
    __resolveType(component, contextValue, info){
      return component.type_;
    },
  },
  Query: {
    layout(parent, args, contextValue, info) {
        return {
          page: args.page,
          components: components[args.page]
        }
    },
    data() {
      return [{label: 'data'}]
    }
  }

};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);
