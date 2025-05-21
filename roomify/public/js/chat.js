// create new chats pop up logic
const createChatBtn = document.getElementById("createChat")
const addForm = document.getElementById("createChatsForm");
const wholeUserAddDiv = document.getElementById("userSearchWholeDiv")

createChatBtn.addEventListener("click", () => {
    wholeUserAddDiv.classList.toggle("hidden")

    if(wholeUserAddDiv.classList.contains("hidden")) {
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
        console.log(`will need to use data to render the chat if it already exists, data: ${data}`)
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
    console.log(data);
    const container = document.getElementById("chats")

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

// live user search
const search = document.getElementById("searchInput");

let debounceTimeout;

search.addEventListener("input", () => {
    clearTimeout(debounceTimeout)

    debounceTimeout = setTimeout(() => {
        const searchValue = search.value.trim();

        fetch(`/getUsers?search=${encodeURIComponent(searchValue)}`)
        .then((response) => response.json())
        .then((data) => {
            liveUserSearch(data)
        })
        .catch((error) => {
            console.log(error)
        })

    }, 300);
});

function liveUserSearch(data) {
    const container = document.getElementById("liveSearchResults")

    container.innerHTML = "";

    for(let i = 0; i < data.length; i++) {
        let chatBoxHTML = `
            <img src="${data[i].imageURL}" alt="profile picture" class="pfp" onerror="this.onerror=null; this.src='assets/default.webp';">
            <p class="medium px14 text">${data[i].username}</p>
        `
        const chat = document.createElement("div");
        chat.classList.add("searchResult", "row")
        chat.dataset.username = data[i].username
        chat.innerHTML = chatBoxHTML;

        chat.addEventListener("click", () => {
            const username = chat.dataset.username;
            search.value = username;
        })
        container.append(chat);
    }
}