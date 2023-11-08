const HOSTNAME = 'localhost';
const HTTPPORT = 8000;
const HTTPSPORT = 8001;
var https = require('https');
var http = require('http');
var fs = require('fs');
const helmet = require("helmet");
const express = require('express');
require('dotenv').config();

const app = express()
var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/jarofmilk.com/privkey.pem', 'utf8'),
    cert: fs.readFileSync('/etc/letsencrypt/live/jarofmilk.com/fullchain.pem', 'utf8')
  };


app.get('/', (req, res) => {
    res.end('Hello World!');
});

app.get('/getDream/:dream', async(req, res) => {
    let reqDream = req.params.dream
    let lastChar = reqDream.slice(-1)
    
    if(lastChar != '.'){
        reqDream = reqDream + "."
    }

    //console.log(reqDream)
    try{
        let dreamInter = await get_dream(reqDream)
        res.header('Access-Control-Allow-Origin', '*');
        res.send({result: dreamInter})
    } catch(e){
        console.log(e)
        res.sendStatus(500)
    }
})


async function get_dream(inputText){
    const { Configuration, OpenAIApi } = require("openai");
    
    const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    inputText = "What do you think the interpretation of my dream is?   "+inputText

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        //model: "text-curie-001",
        prompt: inputText, 
        max_tokens: 256,
        n: 1,
        top_p: .5,
        });
    //console.log(completion.data.choices[0].text);
    return completion.data.choices[0].text
}

var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

httpServer.listen(HTTPPORT, ()=>{
    console.log(`HTTP server is running at ${HTTPPORT}`)
});
httpsServer.listen(HTTPSPORT, ()=>{
    console.log(`HTTPS server is running at ${HTTPSPORT}`)
});