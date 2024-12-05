import axios from 'axios';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.get('/', (req, res) => res.send("ROOT GET"));

app.listen(port, () => console.log("Server listening on port " + port));