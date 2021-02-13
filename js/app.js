/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
document.addEventListener('DOMContentLoaded', () => {

  const sections = document.querySelector('.sections-container').children;
  const navList = document.querySelector('.nav-unordered-list');
  const fragment = document.createDocumentFragment();
  for (let section of sections) {
    let newLiElement = document.createElement('li');
    let newLink = document.createElement('a');
    newLink.className = 'nav-unordered-list-item-link';
    newLink.href = `#${section.id}`;
    newLink.textContent = section.dataset.nav;
    newLiElement.appendChild(newLink);
    fragment.appendChild(newLiElement);

  }

  navList.appendChild(fragment);

})

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


