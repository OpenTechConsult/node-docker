const express = require('express');
const mongoose = require('mongoose');
const RedisStore = require('connect-redis').default;
const session = require('express-session');
const { createClient } = require('redis');

const { 
  MONGO_IP, 
  MONGO_PORT, 
  MONGO_USER, 
  MONGO_PASS, 
  REDIS_HOST, 
  REDIS_PORT, 
  SESSION_SECRET 
} = require('./config/config.js');

const postRouter = require('./routes/postRoute');
const userRouter = require('./routes/userRoute');

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

// initialize client
let redisClient = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});

redisClient.connect().catch(console.error); 

// Initialize store
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});


app.use(session({
  store: redisStore,
  secret: SESSION_SECRET,
  cookie: {
    secure: false,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: 60000,
  }
})) 

app.use(express.json());


app.get('/api/vi', (req, res) => {
  res.send('<h2>Hi there dumbo!! blah !!!</h2>');
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);



app.listen(port, () => console.log(`Listening on port ${port}`));
