import express from "express";

const app = express();

app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Hello from Express + TypeScript backend!");
});

export default app;
