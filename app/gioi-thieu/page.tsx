export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">
                    Giới thiệu về My Truyện
                </h1>

                <div className="prose dark:prose-invert max-w-none">
                    <p>
                        My Truyện là một nền tảng đọc truyện chữ trực tuyến,
                        cung cấp kho tàng truyện đa dạng và phong phú từ nhiều
                        thể loại khác nhau như Tiên Hiệp, Kiếm Hiệp, Ngôn Tình,
                        Đô Thị, và nhiều thể loại khác.{" "}
                        <strong>
                            Tất cả nội dung trên website chỉ mang tính chất giải
                            trí và không phù hợp với mọi độ tuổi.
                        </strong>
                    </p>
                    <h2>Về nền tảng</h2>
                    <p>
                        My Truyện hoạt động như một nền tảng chia sẻ nội dung do
                        người dùng tạo ra và cung cấp.
                        <strong>
                            Chúng tôi không tạo ra, kiểm duyệt hoặc chịu trách
                            nhiệm về nội dung được đăng tải.
                        </strong>
                        Mọi nội dung đều do người dùng đóng góp và chia sẻ.
                    </p>
                    <h2>Tuyên bố miễn trách nhiệm</h2>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                            Quan trọng:
                        </h3>
                        <ul className="text-yellow-700 dark:text-yellow-300 mt-2">
                            <li>
                                • Nội dung trên website chỉ mang tính chất giải
                                trí
                            </li>
                            <li>
                                • Chúng tôi không chịu trách nhiệm về độ chính
                                xác, tính pháp lý của nội dung
                            </li>
                            <li>
                                • Người dùng có trách nhiệm tuân thủ pháp luật
                                khi sử dụng dịch vụ
                            </li>
                            <li>
                                • Mọi tranh chấp liên quan đến nội dung là trách
                                nhiệm của tác giả/người đăng
                            </li>
                        </ul>
                    </div>
                    <h2>Giá trị cốt lõi</h2>
                    <ul>
                        <li>
                            <strong>Cộng đồng:</strong> Xây dựng một nền tảng để
                            cộng đồng yêu thích văn học chia sẻ và thảo luận.
                        </li>
                        <li>
                            <strong>Đa dạng:</strong> Hỗ trợ nhiều thể loại
                            truyện khác nhau để phục vụ sở thích đa dạng của độc
                            giả.
                        </li>
                        <li>
                            <strong>Minh bạch:</strong> Rõ ràng về vai trò và
                            trách nhiệm của nền tảng.
                        </li>
                        <li>
                            <strong>Tự do sáng tạo:</strong> Tôn trọng quyền tự
                            do sáng tạo trong giới hạn pháp luật cho phép.
                        </li>
                    </ul>
                    <h2>Lưu ý quan trọng</h2>{" "}
                    <p>
                        Website này được vận hành tại Việt Nam và tuân thủ pháp
                        luật Việt Nam.
                        <strong>
                            Người dùng có trách nhiệm đảm bảo việc truy cập và
                            sử dụng website không vi phạm pháp luật tại quốc gia
                            của họ.
                        </strong>
                        Chúng tôi khuyến khích người dùng chỉ đọc những nội dung
                        phù hợp với độ tuổi và giá trị của mình.
                    </p>
                    <h2>Liên hệ với chúng tôi</h2>
                    <p>
                        Nếu bạn có bất kỳ câu hỏi, góp ý hoặc đề xuất nào, vui
                        lòng liên hệ với chúng tôi qua email:{" "}
                        <a href="mailto:contact@mytruyen.com">
                            contact@mytruyen.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
