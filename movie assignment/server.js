
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());
app.use(express.static("public"));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/MovieDB")
    .then(() => console.log("MovieDB Connected"))
    .catch(err => console.log(err));

// Movie Schema
const movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    year: Number,
    genre: String,
    rating: Number
});

// Movie Model
const Movie = mongoose.model("Movie", movieSchema, "movies");

// Home Page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/movies.html");
});

// Fetch All Movies
app.get("/movies", async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({
            message: "Error fetching movies"
        });
    }
});

// Fetch Single Movie by ID
app.get("/movies/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        res.json(movie);
    } catch (err) {
        res.status(400).json({
            message: "Invalid Movie ID"
        });
    }
});

// Start Server
app.listen(3000, () => {
    console.log("Movie Server running at http://localhost:3000");
});
