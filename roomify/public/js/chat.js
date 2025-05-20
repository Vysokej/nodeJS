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
    renderChats(data);
})
.catch((error) => {
    console.log(error)
})

function renderChats(data) {
    const container = document.getElementById("chats")
    console.log(data[0].username)

    for(let i = 0; i < data.length; i++) {
        let chatBoxHTML = `
            <img src="${data[i].imageURL}" alt="profile picture" class="pfp" onerror="this.onerror=null; this.src='assets/default.webp';">
            <div class="column">
                <p class="name px18 medium text">${data[i].username}</p>
                <span class="row">
                    <p class="px18 light text">last message (WIP)</p>
                    <div class="dot"></div>
                    <p class="px18 light text">when was last message sent (WIP)</p>
                </span>
            </div>
        `
        const chat = document.createElement("div");
        chat.classList.add("chat", "row")
        chat.dataset.chatId = data[i].idChats
        chat.innerHTML = chatBoxHTML;

        container.append(chat);
    }
}