
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("MongoDB Connection Error:", err);
});

// Database schemas
const aboutSchema = new mongoose.Schema({}, { strict: false });
const skillsSchema = new mongoose.Schema({}, { strict: false });
const contactSchema = new mongoose.Schema({}, { strict: false });

// Models
const About = mongoose.model("About", aboutSchema, "about");
const Skills = mongoose.model("Skills", skillsSchema, "skills");
const Contact = mongoose.model("Contact", contactSchema, "contact");

// API routes
app.get("/api/about", async (req, res) => {
    try {
        const data = await About.findOne();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get("/api/skills", async (req, res) => {
    try {
        const data = await Skills.findOne();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get("/api/contact", async (req, res) => {
    try {
        const data = await Contact.findOne();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Serve website files
app.use(express.static(path.join(__dirname, "../public")));

async function startServer() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB");

        console.log("MongoDB Connected Successfully");

        app.listen(3000, () => {
            console.log("Server running at http://localhost:3000");
        });

    } catch (error) {
        console.log("MongoDB Connection Failed:", error.message);
    }
}

startServer();
