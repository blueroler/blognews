async function List_News() {
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
        <img src="${article.summary}" />
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

async function Hots_News() {
  let count = 0; // Khởi tạo biến đếm
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
    if (count >= 3) break; // Dừng vòng lặp khi đã lặp 3 lần
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('news-item'); // Thêm class để dễ style
    articleDiv.onclick = () => viewHots(article.id); // Gắn sự kiện khi nhấn vào toàn bộ khung

    articleDiv.innerHTML = `
      <div class="hots-news">
        <div class="image-placeholder">
          <img loading="lazy" src="${article.summary}" />
        </div>
        <div class="hots-section">
          <div>
            <h4 style="display: inline-block;">${article.name}</h4>
          </div>
        </div>
      </div>
    `;
    container.appendChild(articleDiv);
    count++; // Tăng biến đếm sau mỗi lần lặp
  }

}

async function Hots_News_Foot(skip = 3) {
  let count = 0; // Khởi tạo biến đếm
  const response = await fetch(`${databaseUrl}/hots.json`);
  const news = await response.json();
  const newsArray = Object.entries(news || {}).map(([id, item]) => ({
    id,
    ...item,
  }));

  // Sắp xếp bài viết theo timestamp từ mới nhất đến cũ nhất
  newsArray.sort((a, b) => b.timestamp - a.timestamp);

  const container = document.getElementById('foot');
  container.innerHTML = '';

  // Bắt đầu từ bài viết thứ `skip`
  for (let i = skip; i < newsArray.length; i++) {
    if (count >= 3) break; // Dừng vòng lặp khi đã lặp 3 lần
    const article = newsArray[i];
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('news-item'); // Thêm class để dễ style
    articleDiv.onclick = () => viewHots(article.id); // Gắn sự kiện khi nhấn vào toàn bộ khung

    articleDiv.innerHTML = `
      <div class="hots-news">
        <div class="image-placeholder">
          <img loading="lazy" src="${article.summary}" />
        </div>
        <div class="hots-section">
          <div>
            <h4 style="display: inline-block;">${article.name}</h4>
          </div>
        </div>
      </div>
    `;
    container.appendChild(articleDiv);
    count++; // Tăng biến đếm sau mỗi lần lặp
  }
}


async function viewNews(id) {
window.open(`posts.html?id=News${id}`, '_blank');
}

async function viewHots(id) {
  window.open(`posts.html?id=Hots${id}`, '_blank');
  }

Hots_News();
List_News();
Hots_News_Foot(skip = 3)
