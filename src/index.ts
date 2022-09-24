import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 8002;
app.listen(port, async () => console.log(`SERVER ON! PORT : ${port}`));
