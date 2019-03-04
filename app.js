const express         = require("express"),
      mongoose        = require("mongoose"),
      passport        = require("passport"),
      config          = require("./config/db"),
      path            = require("path");

const postRoutes      = require("./routes/posts"),
      commentRoutes   = require("./routes/comments"),
      authRoutes      = require("./routes/authentication"),
      profileRoutes   = require("./routes/profile");


const app = express();
app.use(passport.initialize());

// MongoDB connection
const { db: { user, password, cluster, name } } = config;
const connectionString = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/${name}?retryWrites=true`;
mongoose.connect(connectionString, { useNewUrlParser: true }, err => {
  if(err) {
    console.log(err);
  }
});

// Static serve dist folder of angular app
app.use(express.static(path.join(__dirname, 'dist/blog')));

// Routes
app.use("/api/", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts/:id/comments", commentRoutes);
app.use('/', (req,res) => {
  res.sendFile(path.join(__dirname + '/dist/blog/index.html'));
});

// error handlers
// Catch unauthorised errors
app.use( (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
});

// Starting server 
app.listen(config.app.port, () => console.log(`Server started on port ${config.app.port}!`) );