const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

require('./JokeSchema')

const jokeModel = mongoose.model('joke')

main().catch(err => console.log(err));


async function main() {
   await mongoose.connect(`${process.env.MONGO_URI}`);  
}

mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

app.use(express.json())
app.use(cors())

app.get('/getJokes',async (req,res)=>{
       const jokes = await jokeModel.find({});
       res.json({jokes})
})

app.post('/post-joke',async (req,res)=>{
    try{
        const newJoke =  await jokeModel.create({
            joke:req.body.joke
        })
        res.json({newJoke:newJoke})
    }catch(err){
        console.log(err)
    }
   
})

app.listen(5000,()=>{
    console.log("server running on 5000")
})