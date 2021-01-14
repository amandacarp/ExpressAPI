const express = require('express');
const router = express.Router();
const chirpsStore = require('../chirpstore')

router.get('/:id?', (req, res, next) => {
    const id = req.params.id
    const chirps = id ? chirpsStore.GetChirp(id) : chirpsStore.GetChirps()
    if(id){
        res.json({id: id, ...chirps}) //same as .send but lets you send objects
    } else {
        const newChirps = Object.keys(chirps).map(key => {
            return {
                id:key,
                user: chirps[key].user,
                msg: chirps[key].msg
            }
        })
        newChirps.pop()
        res.json(newChirps.reverse())
    }   
})

router.post('/', (req, res, next) => {
    const chirp = req.body
    chirpsStore.CreateChirp(chirp)
    res.send("Chirp created")
})

router.put('/:id', (req, res, next) => {
    const chirpID = req.params.id;
    const chirpInfo = req.body
    chirpsStore.UpdateChirp(chirpID, chirpInfo)
    res.send(`chirp ${chirpID} edited`);
})

router.delete('/:id', (req, res, next) => {
    const chirpID = req.params.id;
    chirpsStore.DeleteChirp(chirpID);
    res.send(`chirp ${chirpID} deleted!`)
} )

module.exports = router;