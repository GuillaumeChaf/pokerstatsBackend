"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var cors = require("cors");
const app = (0, express_1.default)();
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
//système de calcul pour éviter les erreur lorsqu'il y a moins de 4 cartes
// app.post("/", (req: Request, res: Response) => {
//   const calc = new Calculation(req.body);
//   calc.fullCalculation();
//   res.setHeader("Content-type", "application/json");
//   res.json(calc.getFinalScore());
//   console.log("Done");
// });
app.listen(5000, () => {
    console.log("Server running");
});
//# sourceMappingURL=app.js.map