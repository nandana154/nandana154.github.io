
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());
app.use(express.static("public"));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/LoginDB")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// User Model
const User = mongoose.model("User", userSchema, "users");

// Home Page
app.get("/", (req, res) => {
    res.redirect("/login.html");
});

// Get Users
app.get("/users", async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

// Login API
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({
            username: username,
            password: password
        });

        if (user) {
            res.json({ message: "Login Successful!" });
        } else {
            res.status(401).json({
                message: "Invalid Username or Password!"
            });
        }
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Start Server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
