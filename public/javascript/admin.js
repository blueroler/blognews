// Lấy danh sách bài viết
async function savePost(event) {
    event.preventDefault();

    const postId = document.getElementById('post-id').value;
    const name = document.getElementById('name').value;
    const summary = document.getElementById('summary').value;

    const postData = {
        name,
        summary,
        timestamp: postId ? Date.now() : Date.now(),
    };

    const method = postId ? 'PUT' : 'POST';
    const url = postId
        ? `${databaseUrl}/news/${postId}.json`
        : `${databaseUrl}/news.json`;

    await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
    });

    document.getElementById('post-form').reset();
    fetchPosts();
}

// Lấy bài viết và sắp xếp theo timestamp
async function fetchPosts() {
    const response = await fetch(`${databaseUrl}/news.json`);
    const posts = await response.json();

    const postsArray = Object.entries(posts || {}).map(([id, item]) => ({
        id,
        ...item,
    }));

    // Sắp xếp bài viết theo timestamp từ mới nhất đến cũ nhất
    postsArray.sort((a, b) => b.timestamp - a.timestamp);

    const listContainer = document.getElementById('posts-list');
    listContainer.innerHTML = '';

    for (let post of postsArray) {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `
            <h3>${post.name}</h3>
            <p>${post.summary}</p>
            <small>Ngày đăng: ${new Date(post.timestamp).toLocaleString()}</small>
            <button style="background: #2ecc71;" onclick="redirectToEdit('${post.id}')">Sửa</button>
            <button style="background: #f1c40f;" onclick="deletePost('${post.id}')">Xóa</button>
        `;
        listContainer.appendChild(postDiv);
    }
}

// Chuyển hướng đến trang chỉnh sửa bài viết
function redirectToEdit(id) {
    window.location.href = `edit.html?id=${id}`;
}

// Xóa bài viết
async function deletePost(id) {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
        await fetch(`${databaseUrl}/news/${id}.json`, { method: 'DELETE' });
        fetchPosts();
    }
}

// Gắn sự kiện cho form
document.getElementById('post-form').addEventListener('submit', savePost);

// Lấy danh sách bài viết khi tải trang
fetchPosts();
