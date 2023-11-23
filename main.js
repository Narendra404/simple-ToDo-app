window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const task = input.value;

		const task_el = document.createElement('div');
		task_el.classList.add('task');

		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

		task_el.appendChild(task_content_el);

		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = task;
		task_input_el.setAttribute('readonly', 'readonly');

		task_content_el.appendChild(task_input_el);

		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');
		
		const task_edit_el = document.createElement('button');
		task_edit_el.classList.add('edit');
		task_edit_el.innerText = 'Edit';

		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Delete';

		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		task_el.appendChild(task_actions_el);

		list_el.appendChild(task_el);

		input.value = '';

		task_edit_el.addEventListener('click', (e) => {
			if (task_edit_el.innerText.toLowerCase() == "edit") {
				task_edit_el.innerText = "Save";
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();
			} else {
				task_edit_el.innerText = "Edit";
				task_input_el.setAttribute("readonly", "readonly");
			}
		});

		task_delete_el.addEventListener('click', (e) => {
			list_el.removeChild(task_el);
		});
	});
});

function fetchUnsplashImage() {
	var accessKey = '0T2uMNqSE-G_FsZVaW939Dj0SQ8PoG5TOSkOdy700D4'; // Replace with your Unsplash Access Key
	var apiUrl = 'https://api.unsplash.com/photos/random';

	// You can customize the query parameters as needed
	var queryParams = {
		query: 'sky',
		client_id: accessKey,
	};

	// Construct the URL with query parameters
	var urlWithParams = `${apiUrl}?${new URLSearchParams(queryParams)}`;

	fetch(urlWithParams)
		.then(response => response.json())
		.then(data => {
			// Log or use the data as needed
			console.log('Unsplash Image Data:', data);

			// Here, you can handle the data, such as updating the background image
			updateBackgroundImage(data.urls.regular);
		})
		.catch(error => console.error('Error fetching Unsplash image:', error));
}

function updateBackgroundImage(imageUrl) {
	// Example: Set the background image of a container with ID 'background-container'
	var backgroundImageContainer = document.getElementById('background-container');

	// Apply smooth transition
	backgroundImageContainer.style.transition = 'background-image 0.5s ease-in-out';

	// Set the new background image
	backgroundImageContainer.style.backgroundImage = `url(${imageUrl})`;
	backgroundImageContainer.style.backgroundSize = 'cover';
	backgroundImageContainer.style.backgroundPosition = 'center';
	// backgroundImageContainer.style.backgroundRepeat = 'no-repeat';
}

fetchUnsplashImage();

// Change the background every hour
setInterval(fetchUnsplashImage, 86400000); // 3600000 milliseconds =