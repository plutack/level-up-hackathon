let dropDown = document.getElementById('dropDown');
let taskList = document.querySelector('.task');
let setupSection = document.querySelector('.setup');
dropDown.addEventListener('click', () => {
  taskList.classList.toggle('open');
});
