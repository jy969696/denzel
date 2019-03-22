/* eslint-disable no-console, no-process-exit */
const imdb = require('./imdb');



const DENZEL_IMDB_ID = 'nm0000243';

async function sandbox(actor = DENZEL_IMDB_ID) {
    try {
        console.log(`📽️  fetching filmography of ${ actor }...`);
        const movies = await imdb(actor);
        console.log(`🍿 ${ movies.length } movies found.`);
        return movies
    } catch (e) {
        console.error(e);
    }
}

// sandbox(DENZEL_IMDB_ID);
module.exports = sandbox


