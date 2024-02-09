const OpenAI = require('openai');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

const openAI_apiKey = "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";
const openai = new OpenAI({ apiKey: openAI_apiKey });

app.post('/image', async (req, res) => {
    const promptText = req.body.prompt; // Extracting the prompt text from the request body
    try {
        const image = await openai.images.generate({ model: "dall-e-3", prompt: promptText });

        // Extract the URL from the image data
        const imageUrl = image.data[0].url;

        // Send the URL in the response
        res.send(imageUrl);
    } catch (error) {
        console.error('Error:', error);
        // Send an error response if something goes wrong
        res.status(500).send('Internal Server Error');
    }
});



app.post('/text',async (req,res)=>{
    const promptText = req.body.prompt;
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: promptText }],
        model: "gpt-3.5-turbo",
      });
    
      console.log(completion.choices[0]);
      res.send(completion.choices[0]);
})

app.listen(3000, () => {
    console.log("server running");
});
