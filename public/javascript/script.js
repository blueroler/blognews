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
        <h2>${article.name}</h2>
        <p>${article.summary}</p>
        <small>Ngày đăng: ${new Date(article.timestamp).toLocaleString()}</small>
      `;
      container.appendChild(articleDiv);
    }
    
  }

  async function viewNews(id) {
    window.open(`posts.html?id=${id}`, '_blank');
  }
  
  
  function closeModal() {
    document.getElementById('news-modal').style.display = 'none';
  }
  
  
  fetchNews();
  