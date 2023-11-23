document.addEventListener('DOMContentLoaded', function () {
  // Fetch NASA APOD image
  fetchNASAImage();
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

    // Create a container for task text and delete button
    var taskContentContainer = document.createElement('div');
    taskContentContainer.className = 'd-flex flex-wrap'; // Add flex-wrap class

    // Create a delete button
    var deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm ml-2'; // Add margin to separate from text
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
      // Remove the task from the list and update local storage
      taskList.removeChild(taskItem);
      updateLocalStorage();
    };

    // Append task text to the container
    var taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskText;

    // Append task text and delete button to the container
    taskContentContainer.appendChild(taskTextSpan);
    taskContentContainer.appendChild(deleteButton);

    // Append the container to the task item
    taskItem.appendChild(taskContentContainer);

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
      tasks.push(taskItem.querySelector('span').textContent);
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
    // Create a task item
    var taskItem = document.createElement('li');
    taskItem.className = 'list-group-item d-flex justify-content-between align-items-center';

    // Create a container for task text and delete button
    var taskContentContainer = document.createElement('div');
    taskContentContainer.className = 'd-flex flex-wrap'; // Add flex-wrap class

    // Create a delete button
    var deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm ml-2'; // Add margin to separate from text
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
      taskList.removeChild(taskItem);
      updateLocalStorage();
    };

    // Append task text to the container
    var taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskText;

    // Append task text and delete button to the container
    taskContentContainer.appendChild(taskTextSpan);
    taskContentContainer.appendChild(deleteButton);

    // Append the container to the task item
    taskItem.appendChild(taskContentContainer);

    // Append the task item to the task list
    taskList.appendChild(taskItem);
  });
}

function fetchNASAImage() {
  var apiKey = 'h75FZZdGNiexv8XGkX5DEHnkCF9u7ZBBgasHKdZc'; // Replace with your NASA API key
  var apiUrl = 'https://api.nasa.gov/planetary/apod';

  // You can customize the query parameters as needed
  var queryParams = {
    api_key: apiKey,
    thumbs: false, // Set to true if you want the URL of video thumbnail
  };

  // Construct the URL with query parameters
  var urlWithParams = `${apiUrl}?${new URLSearchParams(queryParams)}`;

  fetch(urlWithParams)
      .then(response => response.json())
      .then(data => {
        // Check if the media type is an image
        if (data.media_type === 'image') {
          // Log or use the data as needed
          console.log('NASA APOD Image Data:', data);

          // Here, you can handle the data, such as updating the background image
          updateBackgroundImage(data.url);
        } else {
          console.error('NASA APOD did not return an image.');
        }
      })
      .catch(error => console.error('Error fetching NASA APOD image:', error));
}

function updateBackgroundImage(imageUrl) {
  // Example: Set the background image of a container with ID 'background-container'
  var backgroundImageContainer = document.getElementById('background-container');
  backgroundImageContainer.style.backgroundImage = `url(${imageUrl})`;
  backgroundImageContainer.style.backgroundSize = '120%';
  backgroundImageContainer.style.backgroundPosition = 'center';
}
