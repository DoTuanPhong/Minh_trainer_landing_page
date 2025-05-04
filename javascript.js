<script>
    const form = document.getElementById('form');
    const result = document.getElementById('result');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        // Hiển thị thông báo đang xử lý
        result.innerHTML = "Đang xử lý, vui lòng chờ...";
        // Hiển thị element kết quả nếu trước đó ẩn đi
        result.style.display = "block";
        result.style.color = "white"; // Đặt màu chữ cho dễ nhìn trên nền primary


        fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    // Hiển thị thông báo thành công
                    result.innerHTML = json.message;
                    result.style.color = "lightgreen"; // Màu xanh cho thành công
                } else {
                    console.log(response);
                    // Hiển thị thông báo lỗi
                    result.innerHTML = json.message;
                     result.style.color = "salmon"; // Màu đỏ cho lỗi
                }
            })
            .catch(error => {
                console.log(error);
                // Hiển thị thông báo lỗi chung
                result.innerHTML = "Đã xảy ra lỗi. Vui lòng thử lại!";
                 result.style.color = "salmon"; // Màu đỏ cho lỗi
            })
            .then(function() {
                // Reset form sau khi gửi thành công hoặc thất bại
                form.reset();
                // Tùy chọn: ẩn thông báo kết quả sau 3 giây
                setTimeout(() => {
                    result.style.display = "none";
                }, 5000); // Ẩn sau 5 giây
            });
    });
</script>
