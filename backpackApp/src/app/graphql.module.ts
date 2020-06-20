import { NgModule } from '@angular/core';


// Apollo
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AuthService } from '@services/auth.service';
import { environment } from './../environments/environment';
import { DefaultOptions } from 'apollo-client';
// import { ApolloLink, concat } from 'apollo-link';
// import { HttpHeaders } from '@angular/common/http';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError.message}`);
  }
});

const uri = environment.GQL_URI;

@NgModule({
  exports: [
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private authService: AuthService
  ) {

    const currentUser = this.authService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.login.token;
    const defaultOptions: DefaultOptions = {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    }
    // const authMiddleware = new ApolloLink((operation, forward) => {
    //   if (isLoggedIn) {
    //     // add the authorization to the headers
    //     operation.setContext({
    //       headers: new HttpHeaders().set('Authorization', `Bearer ${currentUser.login.token || null}`)
    //     });
    //   }
    //   return forward(operation);
    // });

    // create Apollo
    this.apollo.create({
      // link: concat(authMiddleware, errorLink.concat(this.httpLink.create({ uri }))),
      link: errorLink.concat(this.httpLink.create({ uri })),
      cache: new InMemoryCache(),
      defaultOptions: defaultOptions,
    });
  }
}
