const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const e = require("express");
const upload = multer()

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
})

app.listen(3000, () => {
    console.log("http://localhost:3000")
})

// form handling

app.post("/submit", upload.none(), (req, res) => {
    const data = req.body
    
    const gender = data.gender;
    const age = parseInt(data.age);
    const weight = parseInt(data.weight);
    const height = parseInt(data.height);
    const exercise = data.exercise;


    let weeklyBmr = null;
    // get weekly base metabolic rate
    if(gender === "Male") {
        weeklyBmr = 7*(10*weight + 6.25*height -5*age + 5);
    }
    else {
        weeklyBmr = 7*(10*weight + 6.25*height -5*age + -161);
    }

    let burnedCalories = null;
    // calculate total energy expenditure weekly
    if(exercise === "low") {
        burnedCalories = 150;
    }
    else if(exercise === "light") {
        burnedCalories = 900;
    }
    else if(exercise === "medium") {
        burnedCalories = 2025;
    }
    else if(exercise === "high") {
        burnedCalories = 3900;
    }

    const dailyCalories = Math.round((weeklyBmr + burnedCalories)/7);

    const bmr100 = dailyCalories;
    const bmr93 = Math.round(0.93*dailyCalories);
    const bmr86 = Math.round(0.86*dailyCalories);
    const bmr73 = Math.round(0.73*dailyCalories);

    const calories = [
        bmr100, bmr93, bmr86, bmr73
    ]
    const text = [
        "Maintain weight", "Mild weight loss", "Weight loss", "Extreme weight loss"
    ]

    const response = calories.map((dailyCalories1, i) => {
        return {
            calories: dailyCalories1,
            text: text[i]
        }
    })
    console.log(response)
    res.json(response)

})