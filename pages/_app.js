import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache
} from "@apollo/client"
import 'react-calendar/dist/Calendar.css';

function MyApp({ Component, pageProps }) {
  
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache
  })
  return(
  <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
