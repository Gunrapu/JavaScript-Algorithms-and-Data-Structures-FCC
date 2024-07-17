// Selecting elements from the DOM
const authorContainer = document.getElementById('author-container');
const loadMoreBtn = document.getElementById('load-more-btn');

// Initial indices and data array
let startingIndex = 0;
let endingIndex = 8;
let authorDataArr = [];

// Fetching data from JSON endpoint
fetch('https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json')
  .then((res) => res.json())
  .then((data) => {
    authorDataArr = data;
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex));  
  })
  // Display error message if fetching fails
  .catch((err) => {
   authorContainer.innerHTML = '<p class="error-msg">There was an error loading the authors</p>';
  });

// Function to fetch and display more authors
const fetchMoreAuthors = () => {
  startingIndex += 8;
  endingIndex += 8;

  displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
  // Disable button and update text when all authors are loaded
  if (authorDataArr.length <= endingIndex) {
    loadMoreBtn.disabled = true;
  loadMoreBtn.style.cursor = "not-allowed";
    loadMoreBtn.textContent = 'No more data to load';
  }
};

// Function to display authors in the DOM
const displayAuthors = (authors) => {
  authors.forEach(({ author, image, url, bio }, index) => {
    // Template literal for author card HTML
    authorContainer.innerHTML += `
    <div id="${index}" class="user-card">
      <h2 class="author-name">${author}</h2>
      <img class="user-img" src="${image}" alt="${author} avatar">
      <div class="purple-divider"></div>
      <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + '...' : bio}</p>
      <a class="author-link" href="${url}" target="_blank">${author} author page</a>
    </div>
  `;
  });
};

// Event listener for the Load More button
loadMoreBtn.addEventListener('click', fetchMoreAuthors);