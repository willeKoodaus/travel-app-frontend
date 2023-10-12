import { ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'https://wsk2-travel-app-backend.azurewebsites.net/graphql',
  });
  

const authLink = setContext((_, { headers }) => {
    // get the token from sessionStorage
    const token = sessionStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      }
    }
  });
  
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
