const express = require('express');
const fs = require('fs');
const app = express();

const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

let content = '';

projectID = 'ocr_project';
keyFilename = './brave-framework-312908-2978ab9ba272.json';

async function detectText(fileName){
    const vision = require('@google-cloud/vision');

    const client = new vision.ImageAnnotatorClient({projectID, keyFilename});

    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;

    let this_Res = []
    detections.forEach(text => {
        this_Res.push(test.description)
    });
    return this_Res;
}

app.post('/ocr', (req, res) => {
    console.log('ocr called');
    fs.writeFile('./images/out.png', req.body.name, 'base64', (err) => {
        if(err) throw err
    })
    detectText('./images/out.png').then(detected_res => {
        res.send({Res: detected_res[0]});
    })
});

app.listen(port, ()=> {
    console.log(`express is running on ${port}`);
})