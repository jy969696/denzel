const mongoose = require('mongoose');
var populate = require('../fetchData')

mongoose.connect('mongodb://47.52.162.192:27017/denzel', {useNewUrlParser: true});

const con = mongoose.connection;
con.on('error', console.error.bind(console, '连接数据库失败'));
con.once('open', () => {
    console.log('connect success')
})

var movieSchema = new mongoose.Schema({
    link: String,
    id: String,
    metascore: Number,
    poster: String,
    rating: Number,
    synopsis: String,
    title: String,
    votes: Number,
    year: Number,
    date: String,
    review: String
});

var Movie = mongoose.model('Movie', movieSchema);

module.exports = {
    populate() {
        // return Movie.deleteMany({})
        let arr = []
        return populate().then(movies => {
            arr = movies
            return Movie.deleteMany({})
        }).then(() => {
            return Movie.insertMany(arr)
        }).then(() => {
            return {
                total: arr.length
            }
        })
    },
    mustWatch() {
        return Movie.find({metascore: {$gt: 70}})
    },
    search({limit = 5, metascore = 0}) {
        return Movie.find({metascore: {$gt: metascore}}).then(data => {
            data.length = limit
            return data
        })
    },
    specific(id) {
        return Movie.findOne({id})
    },
    saveWatched({id, date, review}) {
        return Movie.findOneAndUpdate({id}, {date, review}).then(data => {
            return {
                _id: data._id
            }
        })
    }
}


