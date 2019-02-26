const express         = require("express"),
      mongoose        = require("mongoose"),
      passport        = require("passport"),
      jwt             = require("express-jwt"),
      config          = require("./config/db"),
      jwtconfig       = require("./config/jwt");

const postRoutes      = require("./routes/posts"),
      commentRoutes   = require("./routes/comments"),
      authRoutes      = require("./routes/authentication"),
      profileRoutes   = require("./routes/profile");


const app = express();
app.use(passport.initialize());

// JWT Route Authentication Config
const auth = jwt( jwtconfig );

// Routes
app.use("/api/", authRoutes);
app.use("/api/profile", auth, profileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts/:id/comments", commentRoutes);

// error handlers
// Catch unauthorised errors
app.use( (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
});

// MongoDB connection
const { db: { user, password, cluster, name } } = config;
const connectionString = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/${name}?retryWrites=true`;
mongoose.connect(connectionString, { useNewUrlParser: true }, err => {
  if(err) {
    console.log(err);
  }
});

// Starting server 
app.listen(config.app.port, () => console.log(`Server started on port ${config.app.port}!`) );

