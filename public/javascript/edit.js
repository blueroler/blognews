const databaseUrl = 'https://blueroler-blogapp-default-rtdb.firebaseio.com/';
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
const dataContainer = document.getElementById('hbody');

// Lấy dữ liệu bài viết để hiển thị
async function fetchPostData() {
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
        if (post.name) {
            htmlContent += `<h2>${post.name}</h2>`;
        }
        if (post.summary) {
            htmlContent += `<p>${post.summary}</p>`;
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
            }
        } else {
            alert('Lưu dữ liệu thất bại.');
        }
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lưu dữ liệu:', error);
        alert('Đã xảy ra lỗi khi lưu dữ liệu.');
    }

    fetchAndDisplayData(); // Cập nhật dữ liệu hiển thị
}


// Tải dữ liệu khi mở trang
fetchAndDisplayData();
fetchPostData();