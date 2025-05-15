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