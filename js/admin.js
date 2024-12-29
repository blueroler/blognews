// Lấy danh sách bài viết khi tải trang
fetchNews();

// Lấy bài viết news và sắp xếp theo timestamp
async function fetchNews() {
    const response = await fetch(`${databaseUrl}/news.json`);
    const posts = await response.json();

    const postsArray = Object.entries(posts || {}).map(([id, item]) => ({
        id,
        ...item,
    }));

    // Sắp xếp bài viết theo timestamp từ mới nhất đến cũ nhất
    postsArray.sort((a, b) => b.timestamp - a.timestamp);

    const listContainer = document.getElementById('news');
    listContainer.innerHTML = ''; // Xóa nội dung cũ nếu có

    // Thêm nội dung vào các thẻ div đã tạo sẵn trong HTML
    let htmlContent = '';
    for (let post of postsArray) {
    htmlContent += `
        <div class="post-container">
            <img src="${post.summary}" alt="${post.name}" />
            <div class="text-section">
                <h3>${post.name}</h3>
                <small>Ngày đăng: ${new Date(post.timestamp).toLocaleString()}</small>
            </div>
            <div class="button-group">
                <button onclick="News_redirectToEdit('${post.id}')">Sửa</button>
                <button onclick="News_deletePost('${post.id}')">Xóa</button>
            </div>
        </div>
    `;
    }

    // Cập nhật nội dung cho container
    listContainer.innerHTML = htmlContent;

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

fetchHots();

// Lấy bài viết hots và sắp xếp theo timestamp
async function fetchHots() {
    const response = await fetch(`${databaseUrl}/hots.json`);
    const posts = await response.json();

    const postsArray = Object.entries(posts || {}).map(([id, item]) => ({
        id,
        ...item,
    }));

    // Sắp xếp bài viết theo timestamp từ mới nhất đến cũ nhất
    postsArray.sort((a, b) => b.timestamp - a.timestamp);

    const listContainer = document.getElementById('hots');
    listContainer.innerHTML = ''; // Xóa nội dung cũ nếu có

    // Thêm nội dung vào các thẻ div đã tạo sẵn trong HTML
    let htmlContent = '';
    for (let post of postsArray) {
    htmlContent += `
        <div class="post-container">
            <img src="${post.summary}" alt="${post.name}" />
            <div class="text-section">
                <h3>${post.name}</h3>
                <small>Ngày đăng: ${new Date(post.timestamp).toLocaleString()}</small>
            </div>
            <div class="button-group">
                <button onclick="Hots_redirectToEdit('${post.id}')">Sửa</button>
                <button onclick="Hots_deletePost('${post.id}')">Xóa</button>
            </div>
        </div>
    `;
    }

    // Cập nhật nội dung cho container
    listContainer.innerHTML = htmlContent;

}

function News_redirectToEdit(id) {
    window.location.href = `edit.html?id=News${id}`;
}

async function News_deletePost(id) {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
        await fetch(`${databaseUrl}/news/${id}.json`, { method: 'DELETE' });
        fetchNews();
    }
}

function Hots_redirectToEdit(id) {
    window.location.href = `edit.html?id=Hots${id}`;
}

async function Hots_deletePost(id) {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
        await fetch(`${databaseUrl}/hots/${id}.json`, { method: 'DELETE' });
        fetchHots();
    }
}