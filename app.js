//bypass cors issue
const cors = require("cors")

require("dotenv").config()
const port = process.env.port
const fruits = require('./fruits.json')
const express = require("express")
const app = express()

//const logger = require("./logger")
//app.use(logger)

//middleware to only be used in /fruits path
app.use('/fruits',express.json()) 

app.get('/', (req,res) => {
    res.send("Hello Fruit API")
})

app.get('/fruits', (req,res) => {
    res.send(fruits) //return all fruits
} )

app.get('/fruits/:name', (req,res) => {
    //fruit name from url
    const name = req.params.name.toLowerCase()
    //find obj with matching name
    //find fruit in database array as obj
    const fruit = fruits.find((fruit) => 
        //fruit is each individual fruits element
        fruit.name.toLowerCase() == name
    )
    if (fruit==undefined){
        //send not found status code
        res.status(404).send()
    //if found output data
    } else { 
        res.send(fruit)
        res.status(201).send(req.body)
    }
})


app.post('/fruits', (req,res) => {
    // const fruit = req.body
    // console.log(fruit)
    // //add fruit to json
    // res.send("New fruit created")

    const fruit = fruits.find((fruit)=>
        fruit.name.toLowerCase()==req.body.name.toLowerCase())
    //if fruit does not exist
    if (fruit === undefined){
        //add fruit
        fruits.push(req.body)
        //created
        res.status(201).send()
    //fruit already exists
    } else {
        //conflict 
        res.status(409).send()
    }

})

app.delete('/fruits/:name', (req,res) => {
    //see if it exists
    const fruit=fruits.find((fruit)=>fruit.name.toLowerCase()===req.params.name.toLowerCase())
    //delete fruit if exists
    if (fruit!==undefined){
        fruits.splice(fruits.indexOf(fruit),1)
        //no content 
        res.status(204).send()
    } else {
        //not found 
        res.status(404).send()
    }

})

app.listen(port, () => {
    console.log(`fruity API is listening on port ${port}`)
})
