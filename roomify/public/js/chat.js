// create new chats pop up logic
const createChatBtn = document.getElementById("createChat")
const addForm = document.getElementById("createChatsForm");

createChatBtn.addEventListener("click", () => {
    addForm.classList.toggle("hidden")

    if(addForm.classList.contains("hidden")) {
        createChatBtn.src = "assets/add.svg";
    }
    else {
        createChatBtn.src = "assets/remove.svg";
    }
})

// creating chats fetch
addForm.addEventListener("submit", (event) => {
    event.preventDefault();

    fetch("/createChat", {
        method: "POST",
        body: new FormData(addForm)
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })
    .catch((error) => {
        console.log("Error :", error)
    })
})

// gets all user chats
fetch("/getChats", {
    method: "GET",
})
.then((response) => response.json())
.then((data) => {
    console.log(data)
})
.catch((error) => {
    console.log(error)
})