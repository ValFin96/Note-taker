const path = require('path');
const router = require('express').Router();
const dbReader = require('../helpers/fsUtils');
// const fs = require('fs');

// GET Route for homepage
router.get('/notes', (req, res) => {
    console.log('GET test')
    dbReader.getData()
        .then((data) => {
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

// router.delete('/notes/:id', (req, res) => {
//     const id = req.params.id;
//     dbReader.getData().then((data) => {
//         return res.json(data)
//     })
// });

router.delete('/notes/:id', (req, res) => {
    console.log('test')
    var id = req.params.id;
    console.log(id)
    dbReader.getData()
    .then((parsedData) => {
        console.log(parsedData)
        for (var i = 0; i < parsedData.length; i++) {
            if (parsedData[i].id == id) {
                parsedData.splice(i, 1)
                console.log(parsedData);
                dbReader.writeData(parsedData);
                return res.json(true);
            }
        }
        return res.status(404).json(false);
    })  
});
module.exports = router;



