import express from "express";
import { API_HOST } from "./constants.js";
import { infoLog } from "./src/utils/logger.js";

const app = express();

app.listen(API_HOST, () => {
	infoLog("Server is running on port 3000");
});
