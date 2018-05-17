module.exports = app => {
   

app.use("/api/auth", require("./api/auth"));

app.use("/api/user", require("./api/user"));

app.use("/api/shop", require("./api/shop"));

app.use("/api/message", require("./api/message"));

app.use("/api/comment", require("./api/comment"));

app.use("/api/appointment", require("./api/appointment"));

app.use("/api/complaint", require("./api/complaint"));

app.use("/api/admin", require("./api/admin"));

app.use("/api/", require("./api/index"));
  };