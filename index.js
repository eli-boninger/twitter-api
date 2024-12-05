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
    const response = await axios.get(`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${process.env.X_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.X_REDIRECT_URI)}&scope=${scopes}&state=state&code_challenge=challenge&code_challenge_method=plain`, { headers: { Authorization: `Bearer ${credential}` } });
    res.redirect(response.data);
});

app.post('/token', async (req, res) => {
    const { state, code } = req.body;
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', process.env.X_REDIRECT_URI);
    params.append('code_verifier', 'challenge');
    const token = await axios.post('https://api.x.com/2/oauth2/token', params, { headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Bearer ${credential}` } });
    console.log(res.data);
    res.json(token);
});

app.listen(port, () => console.log("Server listening on port " + port));