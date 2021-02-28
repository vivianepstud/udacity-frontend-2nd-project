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

const timers = [];

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

/**
 * @description  Creates a unordered list of items with links to the sections
 * presented on the webpage
 * @param {HTMLCollection} sections - Children Elements.
 * @returns {DocumentFragment} fragment containing the unordered list
 */

function createUnorderedListItems(sections) {
  const fragment = document.createDocumentFragment();
  for (const section of sections) {
    const newLiElement = document.createElement('li');
    const newLink = document.createElement('a');
    newLink.className = 'nav-unordered-list-item-link';
    newLink.href = `#${section.id}`;
    newLink.dataset.section = section.id;
    newLink.textContent = section.dataset.nav;
    newLiElement.appendChild(newLink);
    fragment.appendChild(newLiElement);
  }
  return fragment;
}

/**
* @description Clear previously scheduled timers
*/

function clearTimers() {
  timers.map((timer) => {
    clearTimeout(timer);
  });
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
*/
/**
 * End Main Functions
 * Begin Events
 *
*/

document.addEventListener('DOMContentLoaded', () => {
  /**
 * @description  After DOM is ready, creates a unordered list items with links to the sections
 * presented on the webpage and creates a the navigation menu
 */
  const sections = document.querySelector('.sections-container').children;
  const navList = document.querySelector('.nav-unordered-list');
  navList.appendChild(createUnorderedListItems(sections));
});

window.addEventListener('scroll', () => {
  /**
 * @description  Changes visibility of  the navigation menu if user is not scrolling the page
 */
  clearTimers();
  const element = document.querySelector('.navigation-menu');
  element.style.display = 'block';
  timers.push(setTimeout(() => {
    element.style.display = 'none';
  }, 2000));
});

/**
 * Adds a Listener to the scroll event, everytime a scroll is performed
 * calculation is made to estimate current element on the viewport.
 * Current element on viewport is set to active.
 *
 */
/*
window.addEventListener('scroll', function () {
  const sections = document.querySelector('.sections-container').children;
  let currentElementOnTheScreen;
  let maxDistanceTopAndBottom = 10000;
  for (let section of sections) {
    var position = section.getBoundingClientRect();
    var sumDistanceTopAndBottom = position.top + position.bottom;
    if (sumDistanceTopAndBottom >= 0 && sumDistanceTopAndBottom <= maxDistanceTopAndBottom) {
      currentElementOnTheScreen = section;
      maxDistanceTopAndBottom = sumDistanceTopAndBottom;
    }
  }
  let currentActiveElement = document.querySelector('.active-section');
  if (currentActiveElement)
    currentActiveElement.className = "";
  if(currentElementOnTheScreen)
    currentElementOnTheScreen.className = "active-section";

});
*/

/**
 * Adds a Listener to the load event, a instance of Intersection Observer is created
 * to observe the visibility of sections. When visibility is
 * higher or equal to 50% the element is set to active.
 *
 */

window.addEventListener('load', () => {
  /**
 * @description  Intersection Observer is created to observe the visibility of sections.
 * When visibility of a section is higher or equal to 50% the element is active.
 */
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      const position = entry.target.getBoundingClientRect();
      const positionTop = position.top;
      if (entry.isIntersecting && positionTop < 300 && positionTop > -300) {
        const currentActiveElement = document.querySelector('.active-section');
        const currentNavItem = document.querySelector(`a[data-section=${currentActiveElement.id}]`);
        if (currentActiveElement) {
          currentActiveElement.className = '';
        }
        if (currentNavItem) {
          currentNavItem.className = 'nav-unordered-list-item-link';
        }
        const newNavItem = document.querySelector(`a[data-section=${entry.target.id}]`);
        if (newNavItem) {
          newNavItem.className = 'nav-unordered-list-item-link-active';
        }
        entry.target.className = 'active-section';
      }
    });
  }, options);

  const sections = document.querySelector('.sections-container').children;
  for (const section of sections) {
    observer.observe(section);
  }
});

document.querySelector('.navigation-container').addEventListener('click', (event) => {
  /**
 * @description  Changes the behaviour for links with class nav-unordered-list-item-link
 * to scroll smoothly to the anchor ID
 */
  if (event.target.className === 'nav-unordered-list-item-link') {
    event.preventDefault();
    const targetSection = document.querySelector(`#${event.target.dataset.section}`);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
});
