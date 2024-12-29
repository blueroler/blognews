async function fetchNews() {
  const response = await fetch(`${databaseUrl}/news.json`);
  const news = await response.json();
  const newsArray = Object.entries(news || {}).map(([id, item]) => ({
    id,
    ...item,
  }));

  // Sắp xếp bài viết theo timestamp từ mới nhất đến cũ nhất
  newsArray.sort((a, b) => b.timestamp - a.timestamp);

  const container = document.getElementById('news-container');
  container.innerHTML = '';

  for (let article of newsArray) {
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('news-item'); // Thêm class để dễ style
    articleDiv.onclick = () => viewNews(article.id); // Gắn sự kiện khi nhấn vào toàn bộ khung

    articleDiv.innerHTML = `
      <div class="post-container">
        <img src="${article.summary}" width="200" height="auto" />
        <div class="text-section">
          <div>
            <h4 style="display: inline-block;">${article.name}</h4>
          </div>
          <small>${new Date(article.timestamp).toLocaleDateString()}</small>
        </div>
      </div>
    `;
    container.appendChild(articleDiv);
  }

}

async function HotsNews() {
  const response = await fetch(`${databaseUrl}/hots.json`);
  const news = await response.json();
  const newsArray = Object.entries(news || {}).map(([id, item]) => ({
    id,
    ...item,
  }));

  // Sắp xếp bài viết theo timestamp từ mới nhất đến cũ nhất
  newsArray.sort((a, b) => b.timestamp - a.timestamp);

  const container = document.getElementById('hots');
  container.innerHTML = '';

  for (let article of newsArray) {
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('news-item'); // Thêm class để dễ style
    articleDiv.onclick = () => viewNews(article.id); // Gắn sự kiện khi nhấn vào toàn bộ khung

    articleDiv.innerHTML = `
      <div class="Hots-News">
        <img src="${article.summary}" width="200" height="auto" />
        <div class="hots-section">
          <div>
            <h4 style="display: inline-block;">${article.name}</h4>
          </div>
          <small>${new Date(article.timestamp).toLocaleDateString()}</small>
        </div>
      </div>
    `;
    container.appendChild(articleDiv);
  }

}

async function viewNews(id) {
window.open(`posts.html?id=${id}`, '_blank');
}

HotsNews();
fetchNews();
