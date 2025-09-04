document.addEventListener('DOMContentLoaded', () =>{
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");
    const todoInput = document.getElementById("todo-input");


    let tasks =JSON.parse(localStorage.getItem('tasks'))|| [];

    tasks.forEach(task => renderTasks(task));

    addTaskButton.addEventListener("click", ()=>{
        const taskText = todoInput.value.trim(); // Get the trimmed value from the input field
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        } // Check if the input is not empty
        
        const newTask={
            id:Date.now(),
            text: taskText,
            completed: false
        } // Create a new task object

        tasks.push(newTask);
        saveTasks(); // Save the task to localStorage
        renderTasks(newTask); // Render the new task in the list
        todoInput.value = ""; //clear input field
        console.log(tasks); // Log the task array to the console
    });

    function renderTasks(task) {
        // console.log(task.text); // Log the task array to the console
        const li= document.createElement("li");
        li.setAttribute("data-id", task.id);
        if (task.completed) li.classList.add("completed"); // Add completed class if the task is completed
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn">Delete</button>`;
        li.addEventListener('click', (e) => {
            if(e.target.tagName==="BUTTON") return;
            task.completed = !task.completed; // Toggle the completed status
            li.classList.toggle("completed"); // Toggle the completed class
            saveTasks(); // Save the updated task list to localStorage
        });
        li.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent the click event from bubbling up to the li
            tasks = tasks.filter(t => t.id !== task.id); // Remove the task from the array
            li.remove(); // Remove the task from the DOM
            saveTasks(); // Save the updated task list to localStorage
        });

        todoList.appendChild(li); // Append the new list item to the task list
    }



    function saveTasks(){
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Save the task array to localStorage
    }
})