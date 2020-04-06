import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import AWSAppSyncClient from "aws-appsync";
import { AppSync } from "./AppSync";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";

const client = new AWSAppSyncClient({
  url: AppSync.aws_appsync_graphqlEndpoint,
  region: AppSync.aws_appsync_region,
  auth: {
    type: AppSync.aws_appsync_authenticationType,
    apiKey: AppSync.aws_appsync_apiKey,
  },
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Rehydrated>
  </ApolloProvider>
);

ReactDOM.render(<WithProvider />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
