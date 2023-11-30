const express = require('express');
const mongoose = require('mongoose');

const { MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PASS } = require('./config/config.js');
const postRouter = require('./routes/postRoute');

const port = process.env.PORT || 3000;

const app = express();

async function main() {
  await mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`);
}


function retryToConnect() {
main().then(() => console.log("successfully connected to DB")).catch(err => {
  console.log(err);
  setTimeout(() => {
    retryToConnect();
  }, 3000);
});
}

retryToConnect();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('<h2>Hi there dumbo!! blah !!!</h2>');
});

app.use("/api/v1/posts", postRouter);


app.listen(port, () => console.log(`Listening on port ${port}`));
