'use strict';

// preloader

window.addEventListener('load', function () {
    setTimeout(function () {
        document.body.classList.add('loaded');
    }, 1000); 
}); 


//  evento 


const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



//  navbar 

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



//  header, top 


const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});


// scroll efeito

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 1.1) {
      sections[i].classList.add("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

//  accordion 

const accordionAction = document.querySelectorAll("[data-accordion-action]");

const toggleAccordion = function () { this.classList.toggle("active"); }

addEventOnElem(accordionAction, "click", toggleAccordion);



// search

const items = {
  "coleção": "#collection",
  "produtos": "#shop",
  "contato": "#contato"

};

const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

searchInput.addEventListener("input", updateResults);

function updateResults() {
  const searchTerm = searchInput.value.toLowerCase();
  searchResults.innerHTML = "";

  if (searchTerm.length === 0) {
      searchResults.style.display = "none";
      return;
  }

  const matchingItems = Object.keys(items).filter(item => item.includes(searchTerm));

  if (matchingItems.length === 0) {
      searchResults.style.display = "block";
      searchResults.textContent = "Item não encontrado";
  } else {
      searchResults.style.display = "block";
      matchingItems.forEach(item => {
          const resultItem = document.createElement("a");
          resultItem.href = items[item];
          resultItem.textContent = item;
          searchResults.appendChild(resultItem);

          resultItem.addEventListener("click", () => {
              searchResults.style.display = "none";
          });
      });
  }
}


document.addEventListener("click", (event) => {
  if (!searchResults.contains(event.target) && event.target !== searchInput) {
      searchResults.style.display = "none";
  }
});

// scroll remove

window.addEventListener("scroll", () => {
  if (window.scrollY >= 100) {
      searchResults.style.display = "none";
  }
});

// video

function toggleVideo() {
  const trailer = document.querySelector('.trailer');
  const video = document.querySelector('video');
  trailer.classList.toggle('active');

  if (trailer.classList.contains('active')) {
      video.currentTime = 0;
      video.play();
  } else {
      video.pause();
  }

  document.addEventListener('scroll', function () {
      if (video) {
          const trailer = document.querySelector('.trailer.active');
          if (trailer) {
              toggleVideo(trailer.id);
          }
      }
  });
}
