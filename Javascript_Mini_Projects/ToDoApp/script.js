// Selecting DOM elements
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

// Initialize task data from localStorage or an empty array
const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {}; // To hold the current task being edited

// Function to add or update a task
const addOrUpdateTask = () => {
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };

  if (dataArrIndex === -1) {
    taskData.unshift(taskObj); // Add new task to the beginning of array
  } else {
    taskData[dataArrIndex] = taskObj; // Update existing task
  }

  localStorage.setItem("data", JSON.stringify(taskData)); // Save updated data to localStorage
  updateTaskContainer() // Update the UI with the new/updated task
  reset() // Reset form inputs
};

// Function to update the tasks container in the UI
const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";

  taskData.forEach(
    ({ id, title, date, description }) => {
        (tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button onclick="editTask(this)" type="button" class="btn">Edit</button>
          <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
        </div>
      `)
    }
  );
};

// Function to delete a task
const deleteTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  buttonEl.parentElement.remove(); // Remove task from UI
  taskData.splice(dataArrIndex, 1); // Remove task from data array
  localStorage.setItem("data", JSON.stringify(taskData)); // Update localStorage
}

// Function to populate the form with task data for editing
const editTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  // Set current task for editing
  currentTask = taskData[dataArrIndex];

  // Populate form inputs with task data
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  addOrUpdateTaskBtn.innerText = "Update Task"; // Change button text to 'Update'
  taskForm.classList.toggle("hidden"); // Display the task form
}

// Function to reset form inputs and task form state
const reset = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  addOrUpdateTaskBtn.innerText = "Add Task"; // Reset button text
  taskForm.classList.add("hidden"); // Hide the task form
  currentTask = {}; // Clear current task
};

// Event listeners
// Toggle task form visibility
if (taskData.length) {
  updateTaskContainer();
};

// Close task form handler
closeTaskFormBtn.addEventListener("click", () => {
  // Check if form inputs have unsaved changes
  const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
  const formInputValuesUpdated = titleInput.value !== currentTask.title ||
    dateInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description;

  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal(); // Show confirmation dialog
  } else {
    reset(); // Reset form
  }
});

// Cancel closing the form
cancelBtn.addEventListener("click", () => {
  confirmCloseDialog.close(); // Close confirmation dialog
});

// Discard changes and close confirmation dialog
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close(); // Close confirmation dialog
  reset(); // Reset form
});

// Form submission handler (Add or Update task)
taskForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  addOrUpdateTask(); // Add or update task based on current state
});

// Initialize UI with existing tasks on page load
if (taskData.length) {
  updateTaskContainer();
}