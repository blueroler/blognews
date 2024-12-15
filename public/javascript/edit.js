const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');


// Lấy dữ liệu bài viết để hiển thị
async function fetchPostData() {
    const dataContainer = document.getElementById('hbody');
    if (!postId) return;

    try {
        const response = await fetch(`${databaseUrl}/news/${postId}.json`);
        if (!response.ok) {
            console.error('Không thể lấy dữ liệu từ server.');
            return;
        }

        const post = await response.json();

        // Kiểm tra và hiển thị dữ liệu
        let htmlContent = '';
        htmlContent += `<tr>
                                <td>ID hay đường dẫn</td>
                                <td>${postId}</td>
                            </tr>`;
        if (post.name) {
            htmlContent += `<tr>
                                <td>Tên bài đăng</td>
                                <td>${post.name}</td>
                            </tr>`;
        }
        if (post.summary) {
            htmlContent += `<tr>
                                <td>Mô tả nhanhnhanh</td>
                                <td>${post.summary}</td>
                            </tr>`;
        }
        if (post.timestamp) {
            htmlContent += `<tr>
                                <td>Ngày đăng tải</td>
                                <td><small>${new Date(post.timestamp).toLocaleString()}</small></td>
                            </tr>`;
        }

        dataContainer.innerHTML = htmlContent;
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu:', error);
    }
}


async function fetchAndDisplayData() {
    if (!postId) {
        alert('Không tìm thấy ID bài viết!');
        return;
    }

    const fetchUrl = `${databaseUrl}/news/${postId}.json`;
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
                htmlContent += `
                                <tr>
                                    <td>Tiêu đề</td>
                                    <td>${value}</td>
                                    <td>
                                        <button onclick="removeID('${key}')">Delete</button>
                                    </td>
                                </tr>`;
            } else if (field === 'content') {
                htmlContent += `
                                <tr>
                                    <td>Nội dung</td>
                                    <td>${value}</td>
                                    <td>
                                        <button onclick="removeID('${key}')">Delete</button>
                                    </td>
                                </tr>`;
            } else if (field === 'image') {
                htmlContent += `
                                <tr>
                                    <td>Ảnh</td>
                                    <td><img src="${value}" width="300" height="auto" /></td>
                                    <td>
                                        <button onclick="removeID('${key}')">Delete</button>
                                    </td>
                                </tr>`;
            }
        }

        dataContainer.innerHTML = htmlContent; // Hiển thị nội dung vào div tbody
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu:', error);
        alert('Đã xảy ra lỗi khi lấy dữ liệu.');
    }
}

// remove message function
async function removeID(key) {
    if (!postId) {
        alert('Không tìm thấy ID bài viết!');
        return;
    }

    const deleteUrl = `${databaseUrl}/news/${postId}/${key}.json`;
    try {
        const response = await fetch(deleteUrl, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchAndDisplayData(); // Cập nhật lại danh sách sau khi xóa
            updatetime();
        } else {
            alert('Xóa dữ liệu thất bại.');
        }
    } catch (error) {
        console.error('Đã xảy ra lỗi khi xóa dữ liệu:', error);
        alert('Đã xảy ra lỗi khi xóa dữ liệu.');
    }
}


// Tạo ref mới và lưu dữ liệu
async function createNewRef(field, value) { 
    if (!postId) {
        alert('Không tìm thấy ID bài viết!');
        return;
    }

    const newRefUrl = `${databaseUrl}/news/${postId}.json`;
    const payload = {
        field,
        value,
        timestamp: Date.now(),
    };

    try {
        const response = await fetch(newRefUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            // Xóa dữ liệu trong trường nhập liệu
            if (field === 'title') {
                document.getElementById('title').value = '';
            } else if (field === 'content') {
                document.getElementById('content').value = '';
            } else if (field === 'image') {
                document.getElementById('image').value = '';
            }
        } else {
            alert('Lưu dữ liệu thất bại.');
        }
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lưu dữ liệu:', error);
        alert('Đã xảy ra lỗi khi lưu dữ liệu.');
    }

    fetchAndDisplayData(); // Cập nhật dữ liệu hiển thị
    updatetime();
}
async function updatetime() {
    const postData = {
        timestamp: postId ? Date.now() : Date.now(),
    };

    const method = postId ? 'PATCH' : 'POST';
    const url = postId
        ? `${databaseUrl}/news/${postId}.json`
        : `${databaseUrl}/news.json`;

    await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
    });
    fetchPostData();
}

// Tải dữ liệu khi mở trang
fetchAndDisplayData();
fetchPostData();