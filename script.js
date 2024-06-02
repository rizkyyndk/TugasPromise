const apiKey = "29da33d0ca60415d905dde8f54fe14b1";
const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`;

document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("searchBox");
  const newsContainer = document.getElementById("newsContainer");

  // Function to fetch and display news
  const fetchNews = async (query = "") => {
    let url = apiUrl;
    if (query) {
      url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      const articles = data.articles;
      displayNews(articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  // Function to display news in card view
  const displayNews = (articles) => {
    newsContainer.innerHTML = "";
    if (articles.length === 0) {
      newsContainer.innerHTML = '<p class="text-center">No news found.</p>';
      return;
    }

    articles.forEach((article) => {
      const card = document.createElement("div");
      card.className = "col-md-4 my-3";
      card.innerHTML = `
        <div class="card">
          <img src="${article.urlToImage}" class="card-img-top" alt="${article.title}">
          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">${article.description}</p>
            <a href="${article.url}" class="btn btn-primary" target="_blank">Read More</a>
          </div>
        </div>
      `;
      newsContainer.appendChild(card);
    });
  };

  // Event listener for search
  searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = searchBox.value;
      fetchNews(query);
    }
  });

  // Initial fetch of news
  fetchNews();
});
