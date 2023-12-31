// Get references to DOM elements
let dropDown = document.getElementById('dropDown');
let dropdownOpen = dropDown.querySelector('#dropdownOpen');
let dropdownClose = dropDown.querySelector('#dropdownClose');
let taskList = document.querySelector('.task-list');
let setupSection = document.querySelector('.setup');
let userNameContainer = document.getElementById('userName');
let userName = userNameContainer.querySelector('span');
let userNameAbbr = document.querySelector('#userNameAbbr');
let userNameButton = userNameContainer.children[0];
let notificationButton = document.querySelector('#notibell');
let close = document.querySelector('#close');
let planNotice = document.querySelector('#planNotice');
let buttons = document.querySelectorAll('button');
let loading1Buttons = document.querySelectorAll('.loading-1');
let incompleteButtons = document.querySelectorAll('.incomplete');
let iconContainer = document.querySelectorAll('.icon-container');
let completeButtons = document.querySelectorAll('.complete');
let progress = document.querySelector('#progress');
let progressbarContainer = document.querySelector('#progressbarContainer');

// Function to toggle the visibility of elements
function toggleContent(contents, shouldShow) {
  if (shouldShow) {
    contents.forEach((content) => {
      content.classList.remove('hidden');
    });
  } else {
    contents.forEach((content) => {
      content.classList.add('hidden');
    });
  }
}

// Function to introduce a delay using a Promise
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to check the count of completed tasks and update the progress bar
function checkCountAndUpdate(index) {
  let completeButtons = document.querySelectorAll('.complete');
  let count = 0;
  completeButtons.forEach((completeButton) => {
    if (completeButton.classList.contains('show')) {
      count++;
    }
    progress.innerHTML = count;
  });
  let taskList = document.querySelector('.task-list');
  let taskNumber = taskList.children.length;
  let widthValue = `${(100 * count) / taskNumber}%`;
  progressbarContainer.style.setProperty('--after-width', widthValue);
  if (index < taskNumber - 1) {
    for (let i = 0; i < taskNumber; i++) {
      if (taskList.children[i].classList.contains('active')) {
        taskList.children[i].classList.remove('active');
      }
      toggleContent(
        taskList.children[i].querySelectorAll('.more-content'),
        false
      );
    }

    taskList.children[index + 1].classList.toggle('active');
    toggleContent(
      taskList.children[index + 1].querySelectorAll('.more-content'),
      true
    );
  }
}

// Event listener for when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Event listener for icon container clicks
  iconContainer.forEach((container, index) => {
    let loading1Button = container.children[1];
    container.addEventListener('click', async () => {
      let incompleteButton = loading1Button.previousElementSibling;
      let loading2Button = loading1Button.nextElementSibling;
      let timeLoadingButton = loading2Button.nextElementSibling;
      let completeButton = timeLoadingButton.nextElementSibling;
      if (!completeButton.classList.contains('show')) {
        loading2Button.addEventListener('transitionend', () => {
          console.log('got here');
          timeLoadingButton.classList.toggle('show');
          loading2Button.classList.toggle('show');
        });
        timeLoadingButton.addEventListener('transitionend', () => {
          console.log('got here too');
          completeButton.classList.toggle('show');
          loading1Button.classList.toggle('show');
          timeLoadingButton.classList.toggle('show');
          checkCountAndUpdate(index);
        });
        await delay(1);
        incompleteButton.classList.toggle('hidden');
        loading2Button.classList.toggle('show');
        loading1Button.classList.toggle('show');
        container.style.setProperty('--display', 'none');
        await delay(52);
        loading2Button.classList.toggle('rotate');
        await delay(103);
        timeLoadingButton.classList.toggle('blur');
      } else {
        await delay(1);
        timeLoadingButton.classList.toggle('blur');
        loading2Button.classList.toggle('rotate');
        container.style.removeProperty('--display');
        completeButton.classList.toggle('show');
        incompleteButton.classList.toggle('hidden');
        checkCountAndUpdate(index);
      }
    });
  });

  // Event listener for dropdown toggle
  dropDown.addEventListener('click', () => {
    taskList.classList.toggle('open');
    dropdownOpen.classList.toggle('hidden');
    dropdownClose.classList.toggle('hidden');
    if (taskList.classList.contains('open')) {
      toggleContent(
        taskList.children[0].querySelectorAll('.more-content'),
        true
      );
    } else {
      toggleContent(
        taskList.children[0].querySelectorAll('.more-content'),
        false
      );
    }
    taskList.children[0].classList.toggle('active');
  });

  // Event listener for close button
  close.addEventListener('click', () => {
    planNotice.remove();
  });

  // Event listener for username button
  userNameButton.addEventListener('click', () => {
    let dropdownContainer =
      userNameButton.nextElementSibling.nextElementSibling;
    dropdownContainer.classList.toggle('hidden');
  });

  // Event listener for notification button
  notificationButton.addEventListener('click', () => {
    let alertContainer = userNameButton.nextElementSibling;
    alertContainer.classList.toggle('hidden');
  });

  // Event listeners for task focus and blur
  let tasks = document.querySelectorAll('.expandable');
  let focusedTask = null;

  function handleTaskFocus(event) {
    var target = event.target;
    var task = target.closest('.expandable');

    if (task) {
      // Store the currently focused task
      focusedTask = task;
      // Toggle the 'more content' based on the focus state
      toggleContent(task.querySelectorAll('.more-content'), true);
    }
  }

  function handleTaskBlur(event) {
    var target = event.relatedTarget || event.explicitOriginalTarget;
    var task = focusedTask;

    if (!task || !task.contains(target)) {
      // Toggle the 'more content' based on the blur state
      toggleContent(task.querySelectorAll('.more-content'), false);
    }
  }

  // Add focus and blur event listeners to each task
  tasks.forEach(function (task) {
    task.addEventListener('focusin', handleTaskFocus);
    task.addEventListener('focusout', handleTaskBlur);
  });
});

// Function to get the first letters of a string
function getFirstLetters(inputString) {
  // Split the string into an array of words
  let words = inputString.split(/\s+/);

  // Extract the first letter of each word
  let firstLetters = words.map((word) => word.charAt(0));

  // Join the first letters into a new string
  let resultString = firstLetters.join('');

  return resultString;
}

// Set the abbreviation of the username
userNameAbbr.innerHTML = getFirstLetters(userName.textContent);
