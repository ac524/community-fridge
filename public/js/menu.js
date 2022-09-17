const menuToggleButton = document.getElementById('main-menu-toggle');
const mainMenu = document.getElementById('main-menu');

menuToggleButton.addEventListener('click', () => {
  const isActive = mainMenu.classList.contains('active');

  if (isActive) {
    mainMenu.classList.remove('active');
  } else {
    mainMenu.classList.add('active');
  }
});
