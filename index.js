require("dotenv").config()
const app = require("./app")
//const port = process.env.port

// app.listen(port,()=>{
//     console.log(`Fruit API on ${port} port`)
// })

module.exports = app
