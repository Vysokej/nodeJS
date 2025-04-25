// radio buttons ui feedback

// gender btns

const genderBtns = document.querySelectorAll(".genderBtn");

genderBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        genderBtns.forEach((el) => {
            el.classList.remove("active")
        })
        btn.classList.add("active");
    })
})

// radio exercise buttons

const exerciseBtns = document.querySelectorAll(".radio");

exerciseBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        exerciseBtns.forEach((el) => {
            el.classList.remove("active")
        })
        btn.classList.add("active");
    })
})

// form data handling

const form = document.querySelector("form")

form.addEventListener("submit", (event) => {
    event.preventDefault();

    fetch("/submit", {
        method: "POST",
        body: new FormData(form)
    })
    .then((response) => response.json())
    .then((data) => {
        loadCalories(data);
    })
    .catch((error) => {
        console.log(error)
    })
})

function loadCalories(data) {
    const container = document.getElementById("output");
    const userInput = document.getElementById("userInput")

    for(let i = 0; i < data.length; i++) {
        const div = document.createElement("div");
        div.classList.add("caloriesDisplay", "column");
        div.innerHTML = `
            <p class="px18 text light">${data[i].text}</p>
            <p class="px32 text bold">${data[i].calories}</p>
        `
        container.appendChild(div);   
    }
    container.classList.remove("active");
    userInput.classList.remove("active");
}
