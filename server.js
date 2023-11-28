const express = require('express');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
    res.send('<h2>Hi there dumbo!! blah !!!</h2>');
});

async function main() {
  await mongoose.connect('mongodb://sandro:mypassword@mongo:27017/?authSource=admin');
}

main().then(() => console.log("successfully connected to DB")).catch(err => console.log(err));

app.listen(port, () => console.log(`Listening on port ${port}`));
