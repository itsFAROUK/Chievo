
// Show old tasks
showTasks();

// Upload given task to local storage and update tasks on the page
document.forms[0].onsubmit = function (event) {
    // Get task that user entered
    let newTask = document.querySelector("input[type='text']").value.trim();

    // No input No action
    if (!newTask) {
        return event.preventDefault();
    }

    // List to hold tasks objects
    let tasks = [];

    // Get old tasks if existed
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    // Append new task to list of tasks
    tasks.push({id: `${Math.floor(Math.random() * 10 ** 8)}`, title: `${newTask}`, done: false});

    // Transfomr list to string and upload it to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    showTasks();
};

// Function to show tasks from local storage
function showTasks() {
    // Remove current ul of tasks content
    let ul = document.querySelector("ul.tasks");
    ul.innerHTML = '';

    // Indicate the user of no tasks
    if (JSON.parse(localStorage.getItem("tasks")) === null || JSON.parse(localStorage.getItem("tasks")).length === 0) {
        ul.innerHTML = 'NO  OLD TASKS TO SHOW !';
        ul.style.textAlign = "center";
    }
    // Otherwise show the already existing tasks
    else {
        // Get tasks from local storage 
        locStrgTasks = JSON.parse(localStorage.getItem("tasks"));

        // Add each task to page inside ul element
        for (let i = 0; i < locStrgTasks.length; i++) {
            let li = document.createElement("li");
            let p = document.createElement("p");
            p.appendChild(document.createTextNode(` ${locStrgTasks[i].title}`));
            let moreDiv = document.createElement("div");
            let checkboxInput = document.createElement("input");
            let dltBTN = document.createElement("span");
            let editBTN = document.createElement("span");

            li.setAttribute("id", `${locStrgTasks[i].id}`);
            checkboxInput.setAttribute("type", `checkbox`);
            if (locStrgTasks[i].done === true) {
                checkboxInput.checked = true;
                li.classList.add("done");
            }
            dltBTN.setAttribute("class", "lnr lnr-trash dltBtn");
            editBTN.setAttribute("class", "lnr lnr-pencil");

            moreDiv.appendChild(checkboxInput);
            moreDiv.appendChild(dltBTN);
            moreDiv.appendChild(editBTN);
            
            li.appendChild(p);
            li.appendChild(moreDiv);

            ul.appendChild(li);
            
            // Function set task state (done / not done)
            checkboxInput.onclick = function() {
                locStrgTasks.forEach(taskObject => {
                    if (taskObject.id === li.id) {
                        if (taskObject.done === false) {
                            taskObject.done = true;
                            li.classList.add("done");
                        } 
                        else {
                            taskObject.done = false;
                            li.classList.remove("done");
                        }
                    }
                });
                localStorage.setItem("tasks", JSON.stringify(locStrgTasks));
            }
            
            // Function to delete task
            dltBTN.onclick = function() {
                locStrgTasks = locStrgTasks.filter(taskObject => taskObject.id != li.id);
                localStorage.setItem("tasks", JSON.stringify(locStrgTasks));
                showTasks();
            }

            // Function edit task
            editBTN.onclick = function() {
                let editInput = document.createElement("input");
                editInput.setAttribute("type", "text");
                editInput.setAttribute("value", `${locStrgTasks[i].title}`);
                editInput.setAttribute("class", `editInput`);
                
                li.removeChild(p);
                li.insertBefore(editInput, moreDiv);

                editInput.focus();
                editInput.setSelectionRange(editInput.value.length, editInput.value.length);
                editInput.scrollLeft = editInput.scrollWidth; // Ensure cursor is scrolled into view

                // Save the new task when Enter is pressed
                editInput.onkeydown = function(event) {
                    if (event.key === 'Enter') {
                        saveEditedTask();
                        showTasks();
                    }
                }

                // Save the new task when input loses focus (click outside)
                editInput.onblur = function(event) {
                    saveEditedTask();
                    showTasks();
                }

                function saveEditedTask() {
                    let editedTask = editInput.value.trim();
                    // Delte task if user try to save empty edited task
                    if (!editedTask) {
                        return dltBTN.click();
                    }

                    // Update task
                    locStrgTasks.forEach(taskObject => {
                        if (taskObject.id === li.id) {
                            taskObject.title = `${editedTask}`
                        }
                    });
                    localStorage.setItem("tasks", JSON.stringify(locStrgTasks));
                }
            }
        } 
    }
}