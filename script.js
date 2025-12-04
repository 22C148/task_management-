const API = "http://localhost:5000/tasks";

async function loadTasks() {
    const res = await fetch(API);
    const tasks = await res.json();

    let html = "";
    tasks.forEach(t => {
        html += `<li>
            ${t.completed ? "<del>" : ""}${t.title}${t.completed ? "</del>" : ""}
            <button onclick="completeTask(${t.id})">✔</button>
            <button onclick="deleteTask(${t.id})">🗑</button>
        </li>`;
    });

    document.getElementById("taskList").innerHTML = html;
}

async function addTask() {
    const title = document.getElementById("taskInput").value;
    if (!title.trim()) return;

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    });

    document.getElementById("taskInput").value = "";
    loadTasks();
}

async function completeTask(id) {
    await fetch(`${API}/${id}`, { method: "PUT" });
    loadTasks();
}

async function deleteTask(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadTasks();
}

loadTasks();
