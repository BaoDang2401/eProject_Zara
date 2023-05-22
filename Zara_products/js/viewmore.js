$(document).ready(function () {
    // Khi nhấp vào nút "Xem thêm" hoặc "Ẩn bớt"
    $("#viewMoreBtn").click(function () {
        // Toggle lớp CSS "hidden" cho các món hàng còn lại
        $(".hidden").toggleClass("hidden");

        // Thay đổi nội dung của nút "Xem thêm" thành "Ẩn bớt" hoặc "Xem thêm"
        var buttonText = $(this).text();
        if (buttonText === "View All") {
            $(this).text("Hide");
        } else {
            $(this).text("View All");

            // Ẩn bớt các mặt hàng sau khi nhấp vào nút "Ẩn bớt"
            var totalProducts = $("#productList .col-lg-4.col-md-6").length;
            var visibleProducts = 3; // Số lượng mặt hàng hiển thị ban đầu
            var hiddenProducts = totalProducts - visibleProducts;
            var hiddenProductElements = $("#productList .col-lg-4.col-md-6:gt(" + (visibleProducts - 1) + ")");
            hiddenProductElements.addClass("hidden");
        }
    });
});