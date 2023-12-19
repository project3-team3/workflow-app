const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const firebase = require("./utils/firebase"); // Import the Firebase configuration

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const startApolloServer = async () => {
  try {
    await server.start();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    const apolloServerContext = ({ req }) => ({
      auth: authMiddleware,
      db,
      firebase,
    });
    
    app.use(
      "/graphql",
      expressMiddleware(server, {
        context: apolloServerContext,
      })
    );

    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../client/dist")));

      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/dist/index.html"));
      });
    }

    db.once("open", () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
      });
    });
  } catch (error) {
    console.error("Error starting Apollo Server:", error);
  }
};

startApolloServer();
