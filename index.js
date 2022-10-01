const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");
const logger = require("./config/Logger");
const connectDB = require("./config/db");

const { errorLogger,errorResponder, invalidPathHandler } = require("./middleware/ErrorHandler");
// Error Handling middlewares

const app = express(); // main thing
app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);
dotenv.config();
//await connectDB();
app.use(express.json()); // to accept json data


// cors config
const allowedOrigins = ["http://localhost:3000", "http://192.168.10.62:3000"];
app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin
            // (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials:true,
        optionSuccessStatus:200,
    })
);

app.get("/", (req, res) => {
    res.send("API is running...");
});


app.use(express.static("public"));



const PORT = process.env.PORT || 5000;

app.listen(PORT, logger.info(`Server started on Port ${PORT}`));
