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
