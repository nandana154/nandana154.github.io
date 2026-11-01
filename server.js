
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/ResumeDB")
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Resume running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

// MongoDB collection
const resumeSchema = new mongoose.Schema({}, {
    strict: false,
    collection: "personalDetails"
});

const Resume = mongoose.model("Resume", resumeSchema);

// API to fetch resume data
app.get("/api/resume", async (req, res) => {
    try {
        const data = await Resume.findOne().lean();

        if (!data) {
            return res.status(404).json({
                message: "Resume data not found"
            });
        }

        res.json(data);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching resume data"
        });
    }
});

// Display resume page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Resume.html"));
});
