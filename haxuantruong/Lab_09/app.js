let tasks = [];

function renderTasks(data = tasks){

    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    data.forEach(function(task, index){

        taskList.innerHTML += `
            <li class="task-item">

                <div class="task-left">

                    <input 
                        type="checkbox"
                        ${task.completed ? "checked" : ""}
                        onchange="toggleTask(${index})"
                    >

                    <span class="
                        ${task.completed ? "completed" : ""}
                    ">
                        ${task.name}
                    </span>

                </div>

                <div class="action-buttons">

                    <button 
                        class="edit-btn"
                        onclick="editTask(${index})"
                    >
                        Sửa
                    </button>

                    <button 
                        class="delete-btn"
                        onclick="deleteTask(${index})"
                    >
                        Xóa
                    </button>

                </div>

            </li>
        `;
    });

    updateSummary();
}

function addTask(){

    let taskInput = document.getElementById("taskInput");

    let taskName = taskInput.value.trim();

    if(taskName === ""){

        alert("Vui lòng nhập công việc!");
        return;
    }

    tasks.push({
        name: taskName,
        completed: false
    });

    renderTasks();

    taskInput.value = "";
}

function deleteTask(index){

    if(confirm("Bạn có chắc muốn xóa công việc này?")){

        tasks.splice(index, 1);

        renderTasks();
    }
}

function editTask(index){

    let newTask = prompt(
        "Nhập nội dung mới:",
        tasks[index].name
    );

    if(newTask){

        tasks[index].name = newTask;

        renderTasks();
    }
}

function toggleTask(index){

    tasks[index].completed =
        !tasks[index].completed;

    renderTasks();
}

function filterTasks(type){

    if(type === "completed"){

        let completedTasks =
            tasks.filter(task => task.completed);

        renderTasks(completedTasks);
    }
    else if(type === "pending"){

        let pendingTasks =
            tasks.filter(task => !task.completed);

        renderTasks(pendingTasks);
    }
    else{

        renderTasks();
    }
}

function updateSummary(){

    let summary = document.getElementById("summary");

    let completedCount =
        tasks.filter(task => task.completed).length;

    let pendingCount =
        tasks.length - completedCount;

    summary.innerHTML = `
        <b>Tổng công việc:</b> ${tasks.length} <br>

        <b>Hoàn thành:</b> ${completedCount} <br>

        <b>Chưa hoàn thành:</b> ${pendingCount}
    `;
}

renderTasks();