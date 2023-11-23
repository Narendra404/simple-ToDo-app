document.addEventListener('DOMContentLoaded', function () {
    // Load tasks from local storage when the page is loaded
    loadTasks();
  });
  
  function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('taskList');
  
    var taskText = taskInput.value.trim();
  
    if (taskText !== '') {
      // Create a task item
      var taskItem = document.createElement('li');
      taskItem.className = 'list-group-item d-flex justify-content-between align-items-center';
  
      // Create a delete button
      var deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-danger btn-sm';
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = function () {
        // Remove the task from the list and update local storage
        taskList.removeChild(taskItem);
        updateLocalStorage();
      };
  
      // Append task text and delete button to the task item
      var taskTextSpan = document.createElement('span');
      taskTextSpan.textContent = taskText;
  
      taskItem.appendChild(taskTextSpan);
      taskItem.appendChild(deleteButton);
  
      // Append the task item to the task list
      taskList.appendChild(taskItem);
  
      // Clear the input field
      taskInput.value = '';
  
      // Update local storage with the new task
      updateLocalStorage();
    }
  }
  
  
  function updateLocalStorage() {
    var taskList = document.getElementById('taskList');
    var tasks = [];
  
    // Extract task text from each task item and add to the tasks array
    taskList.childNodes.forEach(function (taskItem) {
      if (taskItem.nodeType === 1) {
        tasks.push(taskItem.textContent);
      }
    });
  
    // Save tasks array to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function loadTasks() {
    var taskList = document.getElementById('taskList');
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Create task items from the tasks array
    tasks.forEach(function (taskText) {
      var taskItem = document.createElement('li');
      taskItem.className = 'taskItem';
  
      var deleteButton = document.createElement('button');
      deleteButton.className = 'deleteTaskBtn';
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = function () {
        taskList.removeChild(taskItem);
        updateLocalStorage();
      };
  
      taskItem.textContent = taskText;
      taskItem.appendChild(deleteButton);
  
      taskList.appendChild(taskItem);
    });
  }
  