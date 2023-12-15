import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Auth from "./utils/auth";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Header />
        {Auth.loggedIn() ? (
          <>
            <main className="main-wf row">
              <div className="col s2 sidenav-wf sidenav-display-wf">
                <ul>
                  <li className="sidenav-item-wf">
                    <a href="/">Home</a>
                  </li>
                  <li className="sidenav-item-wf">
                    <a href="/chat">Chat</a>
                  </li>
                  <li className="sidenav-item-wf">
                    <a href="/videochat">Video Chat</a>
                  </li>
                </ul>
              </div>
              <div className="mobile-display-wf">
                <Outlet />
              </div>
              <div className="desktop-display-wf">
                <div className="col s2"></div>
                <div className="col s10">
                  <Outlet />
                </div>
              </div>
            </main>
          </>
        ) : (
          <>
            <main className="main-wf row">
              <Outlet />
            </main>
          </>
        )}
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
