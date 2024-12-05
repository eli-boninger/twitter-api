import axios from 'axios';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 8080;
const credential = Buffer.from(`${process.env.X_CLIENT_ID}:${process.env.X_CLIENT_SECRET}`).toString('base64');
const scopes = ['tweet.read', 'tweet.write'].join('%20');

app.use(cors());

app.get('/', (req, res) => res.send("ROOT GET"));

app.get('/twitter-auth', async (req, res) => {
    const res = await axios.get(`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${process.env.X_CLIENT_ID}&redirect_uri=${encodeURI(process.env.X_REDIRECT_URI)}&scope=${scopes}&state=state&code_challenge=challenge&code_challenge_method=plain`, { headers: { Authorization: `Bearer ${credential}` } });
});

app.get('/callback', (req, res) => {
    const { state, code } = req.params;
    console.log("STATE", state, "CODE", code);
    res.sendStatus(200);
});

app.listen(port, () => console.log("Server listening on port " + port));