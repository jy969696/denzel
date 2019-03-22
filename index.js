const express = require('express');
const cors = require('cors')
const PORT = 9292
const movieRouter = require('./src/routes/movie');
const graphql = require('./src/routes/graphql');


const app = express();

app.use(cors({origin: '*'}))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/movies', movieRouter);


app.use('/graphql', graphql);

app.listen(PORT, () => console.log(`listening on localhost:${ PORT }`))