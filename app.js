import express from "express";
import routes from "./routes";
import cors from 'cors';
import "dotenv/config";
import "./utils/connectMongoDb";
const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", routes);

app.listen(port, () => console.log(`Server listening on port* ${port}`));
