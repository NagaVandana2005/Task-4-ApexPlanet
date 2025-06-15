function showSection(id) {
  document.querySelectorAll("section").forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  if (email.trim() === "") {
    document.getElementById("formMessage").textContent = "Please enter a valid email.";
  } else {
    document.getElementById("formMessage").textContent = "Thanks for reaching out!";
  }
});

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

function renderTasks() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.textContent = task;
    li.onclick = () => {
      tasks.splice(i, 1);
      saveTasks();
      renderTasks();
    };
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value.trim()) {
    tasks.push(input.value.trim());
    input.value = "";
    saveTasks();
    renderTasks();
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();

const products = [
  { name: "Smartphone", category: "electronics", price: 699, rating: 4.8 },
  { name: "Laptop", category: "electronics", price: 999, rating: 4.5 },
  { name: "Shirt", category: "clothing", price: 30, rating: 4.0 },
  { name: "Jeans", category: "clothing", price: 50, rating: 4.3 },
  { name: "Watch", category: "accessories", price: 199, rating: 4.6 },
  { name: "Backpack", category: "accessories", price: 70, rating: 4.2 },
  { name: "Blender", category: "home", price: 60, rating: 4.1 },
  { name: "Desk Lamp", category: "home", price: 40, rating: 4.3 },
];

function filterProducts() {
  const category = document.getElementById("categoryFilter").value;
  const sort = document.getElementById("sortOption").value;
  let filtered = [...products];
  if (category) filtered = filtered.filter(p => p.category === category);
  filtered.sort((a, b) => b[sort] - a[sort]);

  const container = document.getElementById("productList");
  container.innerHTML = filtered.map(p => `
    <div class="product">
      <h3>${p.name}</h3>
      <p><strong>Category:</strong> ${p.category}</p>
      <p><strong>Price:</strong> $${p.price}</p>
      <p><strong>Rating:</strong> ⭐ ${p.rating}</p>
    </div>`).join("");
}

filterProducts();
