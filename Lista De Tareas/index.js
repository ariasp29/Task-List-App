const taskInput = document.getElementById("taskInput")
const addTaskBtn = document.getElementById("addTaskBtn")
const taskList = document.getElementById("taskList")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

renderTasks()

addTaskBtn.addEventListener("click", addTask)

taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask()
    }
})

function addTask() {
    const text = taskInput.value.trim()
    if (text === "") return

    tasks.push({text, completed: false})
    taskInput.value = ""

    saveTasks()
    renderTasks()
}

function renderTasks() {
    taskList.innerHTML = ""

    tasks.forEach((task, index) => {
        const li = document.createElement("li")
        if (task.completed) li.classList.add("completed")

    
        const span = document.createElement("span")
        span.textContent = task.text

        span.addEventListener("click", () => {
            task.completed = !task.completed
            saveTasks()
            renderTasks()
        })

        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "X"
        deleteBtn.classList.add("delete-btn")

        deleteBtn.addEventListener("click", ()=> {
            tasks.splice(index, 1)
            saveTasks()
            renderTasks()
        })

        li.appendChild(span)
        li.appendChild(deleteBtn)
        taskList.appendChild(li)
    })
}

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks))
}