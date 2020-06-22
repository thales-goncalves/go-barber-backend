import express from "express";

const app = express();

app.use(express.json())

app.get("/", (request, response) => {
  return response.json({ message: "HelloWorld" });
});

app.listen(3333, () => {
  console.log(`👂 on 3333!`);
});
