import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import path from 'path';
import AuthRoutes from "./routes/authRoutes.js";
import UserRoutes from "./routes/userRoutes.js";
import EventRoutes from './routes/EventRoutes.js'
const app = express();

dotenv.config();

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));

const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use('/api/event', EventRoutes);
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(path.resolve(), "Client/dist")));
    app.get('*', (req, res) => {
      res.sendFile(path.join(path.resolve(), "Client/dist", "index.html"));
    });
  }
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});