import express from "express";

const app = express();

export default app;

app.get("/api/services/hello/:name", (req, res) => {
    res.send(`Hello World from expressjs to ${req.params.name}`)
})