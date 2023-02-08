const path = require('path');
const router = require('express').Router();
const dbReader = require('../helpers/fsUtils');
// const fs = require('fs');

// GET Route for homepage
router.get('/notes', (req, res) => {
    dbReader.getData()
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => res.status(500).json(err));

    // fs.readFile('./db/db.json', 'utf8', (err, data) => {
    //     if (err) {
    //         console.error(err);
    //     } else {
    //         const parsedData = JSON.parse(data);
    //         return res.json(parsedData)

    //     }
    // });
});

// Create a post request to add a new note
router.post('/notes', (req, res) => {
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: Math.floor(Math.random() * 1000000),
        };
        dbReader.writeData(newNote).then((data) => {
            return res.json(data)
        })
    } else {
        res.error('Error in adding note');
    }
});



module.exports = router;



