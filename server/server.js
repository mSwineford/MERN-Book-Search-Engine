const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const { resolvers, typeDefs } = require("./schemas");
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth.js");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: authMiddleware
});
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

mongoose.connect(
  //left off here
)

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
