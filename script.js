document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");
    



    // Load tasks from local storage when the page loads
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }

    function renderTasks() {
        taskList.innerHTML = "";

        for (const task of savedTasks) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span class="task-text">${task.text}</span>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
                <button class="complete">Complete</button>
            `;

            if (task.completed) {
                listItem.classList.add("completed");
            }

            taskList.appendChild(listItem);
            // Add event listener for editing this task
            const editButton = listItem.querySelector(".edit");
            editButton.addEventListener("click", function () {
                const taskTextElement = listItem.querySelector(".task-text");
                const taskText = taskTextElement.textContent;

                const editInput = document.createElement("input");
                editInput.type = "text";
                editInput.value = taskText;

                const saveButton = document.createElement("button");
                saveButton.textContent = "Save";

                listItem.innerHTML = "";
                listItem.appendChild(editInput);
                listItem.appendChild(saveButton);

                saveButton.addEventListener("click", function () {
                    const updatedText = editInput.value.trim();
                    if (updatedText !== "") {
                        task.text = updatedText;
                        taskTextElement.textContent = updatedText;
                        listItem.innerHTML = `
                            <span class="task-text">${updatedText}</span>
                            <button class="edit">Edit</button>
                            <button class="delete">Delete</button>
                            <button class="complete">Complete</button>
                        `;
                        saveTasks();
                    }
                });
            });

            // Add event listener for deleting this task
            const deleteButton = listItem.querySelector(".delete");
            deleteButton.addEventListener("click", function () {
                savedTasks.splice(i, 1);
                saveTasks();
                listItem.remove();
            });

            // Add event listener for completing this task
            const completeButton = listItem.querySelector(".complete");
            completeButton.addEventListener("click", function () {
                task.completed = !task.completed;
                listItem.classList.toggle("completed");
                saveTasks();
            
            });
        
    }
        }
    


    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            const newTask = {
                text: taskText,
                completed: false
            };
            
            savedTasks.push(newTask);
            saveTasks();
            renderTasks();

            taskInput.value = "";
        }
    });

    taskList.addEventListener("click", function (e) {
        const listItem = e.target.parentElement;

        if (e.target.classList.contains("delete")) {
            const index = Array.from(listItem.parentElement.children).indexOf(listItem);
            savedTasks.splice(index, 1);
            saveTasks();
            listItem.remove();
        } else if (e.target.classList.contains("edit")) {
            // ... (Code for editing task, as previously shown)
        } else if (e.target.classList.contains("complete")) {
            listItem.classList.toggle("completed");

            const index = Array.from(listItem.parentElement.children).indexOf(listItem);
            savedTasks[index].completed = !savedTasks[index].completed;
            saveTasks();
        }
    });

    // Render tasks when the page loads
    renderTasks();
});







