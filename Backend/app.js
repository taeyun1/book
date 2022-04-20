const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/book-routes");
const cors = require("cors");
const app = express();
const port = 5000;

// 미들웨어
app.use(express.json());
app.use(cors());
app.use("/books", router); // http://localhost:5000/books // 해당 url에 접속하면 그 라우터 보여주기

mongoose
  .connect(
    "mongodb+srv://admin:1q2w3e4r@cluster0.7mzfa.mongodb.net/bookStore?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("mongoDB connecting!!");
  })
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
