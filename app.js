let dropDown = document.getElementById('dropDown');
let taskList = document.querySelector('.task-list');
let setupSection = document.querySelector('.setup');
let userNameContainer = document.getElementById('userName');
let userName = userNameContainer.querySelector('span');
let userNameAbbr = document.getElementById('userNameAbbr');
let close = document.querySelector('#close');
let planNotice = document.querySelector('#planNotice');
let buttons = document.querySelectorAll('button');
let incompleteButtons = document.querySelectorAll('.incomplete');
let completeButtons = document.querySelectorAll('.complete');
document.addEventListener('DOMContentLoaded', function () {
  incompleteButtons.forEach((incompleteButton) => {
    incompleteButton.addEventListener('click', () => {
      let loadingButton = incompleteButton.nextElementSibling;
      let completeButton = loadingButton.nextElementSibling;
      loadingButton.addEventListener('transitionend', () => {
        loadingButton.classList.toggle('hidden');
      });
      loadingButton.classList.toggle('hidden');
      incompleteButton.classList.toggle('hidden');
      loadingButton.style.transform = 'rotate(-90deg)'
      completeButton.classList.toggle('hidden');
    });
  });
  completeButtons.forEach((completeButton) => {
    completeButton.addEventListener('click', () => {
      completeButton.classList.toggle('hidden');
      setTimeout(() => {
        completeButton.previousElementSibling.previousElementSibling.classList.toggle(
          'hidden'
        );
      }, 500);
    });
  });
  dropDown.addEventListener('click', () => {
    taskList.classList.toggle('open');
  });
  close.addEventListener('click', () => {
    planNotice.remove();
  });

  let tasks = document.querySelectorAll('.expandable');
  let focusedTask = null;

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

function handleTaskFocus(event) {
  var target = event.target;
  var task = target.closest('.expandable');
  console.log(task);

  if (task) {
    // Toggle the 'more content' based on the focus state
    toggleContent(task.querySelectorAll('.more-content'), true);
  }
}

function handleTaskBlur(event) {
  var target = event.target;
  var task = target.closest('.expandable');

  if (task) {
    // Toggle the 'more content' based on the blur state
    toggleContent(task.querySelectorall('.more-content'), false);
  }
}

// Add focus and blur event listeners to each task
tasks.forEach(function (task) {
  task.addEventListener('focusin', handleTaskFocus);
  task.addEventListener('focusout', handleTaskBlur);
});
function getFirstLetters(inputString) {
  // Split the string into an array of words
  let words = inputString.split(/\s+/);

  // Extract the first letter of each word
  let firstLetters = words.map((word) => word.charAt(0));

  // Join the first letters into a new string
  let resultString = firstLetters.join('');

  return resultString;
}

// Function to toggle the visibility of additional content

userNameAbbr.innerHTML = getFirstLetters(userName.textContent);
