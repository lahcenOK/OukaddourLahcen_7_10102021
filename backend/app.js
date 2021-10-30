const express = require("express");
const app = express();

const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const path = require("path");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));


app.use("/api/auth", userRoutes);
app.use("/api/auth", profileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts/", commentRoutes);


module.exports = app;
