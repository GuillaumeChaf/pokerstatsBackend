import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import { ComputePrompt } from "./Classes/bases/Response";
import { Organiser } from "./Classes/processing/Organiser";
import { statsCallback } from "./Classes/bases/types";
var cors = require("cors");

const app: Application = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Pokerstats API");
});
//système de calcul pour éviter les erreur lorsqu'il y a moins de 4 cartes
app.post(
  "/",
  (req: Request<never, never, ComputePrompt>, res: Response<statsCallback>) => {
    const prompt = new ComputePrompt(req.body);
    const callback = Organiser.startingProcess(prompt);
    res.setHeader("Content-type", "application/json");
    res.json(callback);
  }
);

app.listen(3000, () => {
  console.log("Server running");
});
