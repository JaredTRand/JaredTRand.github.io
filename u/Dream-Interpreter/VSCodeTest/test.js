const express = require('express')
require('dotenv').config();

async function get_dream(inputText){
    const { Configuration, OpenAIApi } = require("openai");
    
    const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    inputText = "What do you think the interpretation of my dream is?   "+inputText

    const completion = await openai.createCompletion({
        //model: "text-davinci-003",
        model: "text-curie-001",
        prompt: inputText, 
        max_tokens: 256,
        n: 1,
        top_p: .5,
        });
    console.log(completion.data.choices[0].text);
    return completion.data.choices[0].text
}

get_dream("i dreamed I was drowning.")