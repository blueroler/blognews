// Lấy ID bài viết từ URL
const urlParams = new URLSearchParams(window.location.search);
const NewsHots = urlParams.get('id');
let postId;
let bien;


if (NewsHots == 'News'+ NewsHots.slice(4) ) {
    postId = NewsHots.slice(4);
    bien = 'news';
  } else {
    postId = NewsHots.slice(4);
    bien = 'hots';
  }



async function fetchPost() {
    const dataContainer = document.getElementById('hbody');
    if (!postId) return;

    try {
        const response = await fetch(`${databaseUrl}/${bien}/${postId}.json`);
        if (!response.ok) {
            console.error('Không thể lấy dữ liệu từ server.');
            return;
        }

        const post = await response.json();

        // Kiểm tra và hiển thị dữ liệu
        let htmlContent = '';
        if (post.name) {
            htmlContent += `<h2>${post.name}</h2>`;
        }
        if (post.summary) {
        htmlContent += `<p>${post.summary}</p>`;
        }
        if (post.timestamp) {
        htmlContent += `<small>Ngày đăng: ${new Date(post.timestamp).toLocaleString()}</small>`;
        }

        dataContainer.innerHTML = htmlContent;
    } catch (error) {
    fetchPostDetails();
    }
}

async function fetchAndDisplayData() {
if (!postId) {
    alert('Không tìm thấy ID bài viết!');
    return;
}

const fetchUrl = `${databaseUrl}/${bien}/${postId}.json`;
try {
    const response = await fetch(fetchUrl);
    if (!response.ok) {
        alert('Không thể lấy dữ liệu từ Firebase.');
        return;
    }

    const data = await response.json(); // Chuyển đổi dữ liệu JSON từ phản hồi
    const dataContainer = document.getElementById('tbody'); // Lấy thẻ div có id là tbody
    let htmlContent = '';

    for (const key in data) {
        const { field, value } = data[key]; // Lấy field và value từ từng object
        if (field === 'title') {
            htmlContent += `<h3>${value}</h3>`;
        } else if (field === 'content') {
            htmlContent += `<p>${value}</p>`;
        } else if (field === 'image') {
            htmlContent += `<img src="${value}" width="300" height="auto" />`;
        }
    }

    dataContainer.innerHTML = htmlContent; // Hiển thị nội dung vào div tbody
} catch (error) {
  fetchPostDetails();
}
}

async function fetchPostDetails() {
  const response = await fetch(`${databaseUrl}/${bien}/${postId}.json`);
  const post = await response.json();

  if (post) {
  } else {
    document.body.innerHTML = '<h1>Bài viết không tồn tại</h1>'+ `<button onclick="Return()">Return</button>`;
  }
}

function Return() {
  window.location.href = "index.html";
}

fetchPost();
fetchAndDisplayData();