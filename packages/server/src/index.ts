import express from "express";
import {redirectTo} from '@purple-messenger/core';

const app = express();
const port = 4000;

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world! "+req.path);
});

// // start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
  console.log(redirectTo('https://sample.com'))
});

export default app