// Hàm xử lý gửi form chung cho cả hai form
function handleFormSubmit(event, formId, resultId) {
    event.preventDefault(); // Ngăn chặn gửi form theo cách truyền thống

    const form = document.getElementById(formId);
    const result = document.getElementById(resultId);

    // Lấy dữ liệu từ form
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Hiển thị thông báo đang xử lý
    result.innerHTML = "Đang xử lý, vui lòng chờ...";
    result.style.display = "block";
    result.style.color = "white"; // Đặt màu chữ cho dễ nhìn trên nền primary/success

    // Gửi dữ liệu đến Web3Forms API
    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let jsonResponse = await response.json();
            if (response.status == 200) {
                // Hiển thị thông báo thành công
                result.innerHTML = jsonResponse.message;
                result.style.color = "lightgreen"; // Màu xanh cho thành công
            } else {
                console.error('Web3Forms Error:', response.status, jsonResponse);
                // Hiển thị thông báo lỗi từ Web3Forms
                result.innerHTML = jsonResponse.message;
                result.style.color = "salmon"; // Màu đỏ cho lỗi
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            // Hiển thị thông báo lỗi chung
            result.innerHTML = "Đã xảy ra lỗi. Vui lòng thử lại!";
            result.style.color = "salmon"; // Màu đỏ cho lỗi
        })
        .then(function() {
            // Luôn reset form sau khi quá trình gửi (thành công hoặc thất bại) hoàn tất
            form.reset();
            // Tùy chọn: ẩn thông báo kết quả sau vài giây
            setTimeout(() => {
                result.style.display = "none";
            }, 5000); // Ẩn sau 5 giây
        });
}

// Lấy tham chiếu đến hai form và element kết quả
const form1 = document.getElementById('form1');
const result1 = document.getElementById('result1');

const form2 = document.getElementById('form2');
const result2 = document.getElementById('result2');


// Gắn trình lắng nghe sự kiện submit cho form thứ nhất
if (form1 && result1) { // Kiểm tra chắc chắn element tồn tại
    form1.addEventListener('submit', function(event) {
        handleFormSubmit(event, 'form1', 'result1');
    });
} else {
    console.error("Form 1 or Result 1 element not found!");
}

// Gắn trình lắng nghe sự kiện submit cho form thứ hai
if (form2 && result2) { // Kiểm tra chắc chắn element tồn tại
     form2.addEventListener('submit', function(event) {
        handleFormSubmit(event, 'form2', 'result2');
    });
} else {
     console.error("Form 2 or Result 2 element not found!");
}
