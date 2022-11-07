{
    let tasks = [];
    let hideDoneTasks = false;

    const cleanInput = () => {
        document.querySelector(".js-newTask").value = "";
        document.querySelector(".js-newTask").focus();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, }
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {

        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const markAllTaskDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toggleHideDoneTask = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleEvents = () => {
        const toggleDoneButton = document.querySelectorAll(".js-done");

        toggleDoneButton.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class="taskList__item">


        <button class="taskList__button__done js-done">
        ${task.done ? "✔" : ""}
        </button>


        <span
        ${task.done ? " style=\"text-decoration: line-through\"" : ""}>
        ${task.content}
        </span>


        <button class="taskList__button__remove js-remove">
        🗑
        </button>


        </li>
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const buttons = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttons.innerHTML = "";
            return;
        };

        buttons.innerHTML = `
        <button class="taskList__button js-toggleHideDoneButton">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="taskList__button js-markAllDoneButton"
        ${tasks.every(({ done }) => done) ? "disabled" : ""}
        >
        Ukończ wszystkie
        </button>
        `;
    };

    const bindButtonsEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDoneButton");

        if (markAllDoneButton) {
            markAllDoneButton.addEventListener("click", markAllTaskDone);
        }

        const toggleHideDoneTaskButton = document.querySelector(".js-toggleHideDoneButton");

        if (toggleHideDoneTaskButton) {
            toggleHideDoneTaskButton.addEventListener("click", toggleHideDoneTask);
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindToggleEvents();
        bindButtonsEvents();
        bindEvents();

    };

    const onFormSumbit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        cleanInput();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSumbit);
    };

    init();
}