// require("dotenv").config({path:'./env'}); // Load environment variables from .env file
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env"
});



connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port : ${process.env.PORT || 8000}`);
        })
    })
    .catch((error) => {
        console.error("MONGODB connection FAILED", error)
        process.exit(1);
    });











/*
import express from 'express'
const app = express();

// always use semincolon before IIFE for professional approach
; (async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`,)
        app.on('error', (error) => {
            console.error('MongoDB connection error:', err);
            throw error;
        });
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR:", error)
        throw error;
    }
})()

*/// Import the required modules