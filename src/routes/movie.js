var express = require('express');
var router = express.Router();

var Movie = require('../db/mongo')

router.get('/populate', (req, res) => {
    Movie.populate().then(count => {
        res.json(count)
    })
})

router.get('', (req, res) => {
    Movie.mustWatch().then(arr => {
        res.json(arr)
    })
})


router.get('/search', (req, res) => {
    Movie.search(req.query).then(data => {
        res.json(data)
    })
})


router.get('/:id', (req, res) => {
    Movie.specific(req.params.id).then(data => {
        res.json(data)
    })
})


router.post('/:id', (req, res) => {
    const {date, review} = req.body
    const {id} = req.params
    Movie.saveWatched({id, date, review}).then(data => {
        res.json(data)
    })
})

module.exports = router;
