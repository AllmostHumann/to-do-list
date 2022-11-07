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

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class="taskList__item">
        <button class="taskList__button__done js-done">
        ${task.done ? "✔" : ""}
        </button>
        <p
        ${task.done ? " style=\"text-decoration: line-through\"" : ""}>
        ${task.content}
        </p>
        <button class="taskList__button__remove js-remove">
        🗑
        </button>
        </li>
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => { };

    const bindButtonsEvents = () => { };

    const render = () => {
        renderTasks();
        renderButtons();

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