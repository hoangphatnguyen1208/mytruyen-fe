export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Chính sách bảo mật</h1>

        <div className="prose dark:prose-invert max-w-none">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">Tuyên bố quan trọng:</h3>
            <p className="text-yellow-700 dark:text-yellow-300 mt-2">
              <strong>Chúng tôi không thể đảm bảo 100% bảo mật thông tin của bạn.</strong> 
              Việc cung cấp thông tin cá nhân trên internet luôn tiềm ẩn rủi ro. 
              Bạn sử dụng dịch vụ với sự hiểu biết và chấp nhận những rủi ro này.
            </p>
          </div>

          <p>
            Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn khi sử dụng My Truyện. 
            <strong>Bằng việc sử dụng dịch vụ, bạn đồng ý với việc xử lý thông tin theo chính sách này.</strong>
          </p>

          <h2>1. Thông tin chúng tôi thu thập</h2>
          <h3>Thông tin bạn cung cấp:</h3>
          <ul>
            <li>Tên đăng nhập và mật khẩu</li>
            <li>Địa chỉ email (nếu cung cấp)</li>
            <li>Nội dung bình luận và đánh giá</li>
            <li>Thông tin liên hệ (nếu bạn gửi)</li>
          </ul>

          <h3>Thông tin tự động thu thập:</h3>
          <ul>
            <li>Địa chỉ IP</li>
            <li>Thông tin trình duyệt và thiết bị</li>
            <li>Lịch sử đọc và tương tác</li>
            <li>Cookies và dữ liệu theo dõi</li>
          </ul>

          <h2>2. Cách chúng tôi sử dụng thông tin</h2>
          <ul>
            <li>Cung cấp và vận hành dịch vụ</li>
            <li>Cải thiện trải nghiệm người dùng</li>
            <li>Gửi thông báo liên quan đến dịch vụ</li>
            <li>Ngăn chặn gian lận và lạm dụng</li>
            <li>Tuân thủ yêu cầu pháp lý</li>
          </ul>

          <h2>3. Chia sẻ thông tin với bên thứ ba</h2>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <h3 className="font-semibold text-red-800 dark:text-red-200">Miễn trách nhiệm:</h3>
            <p className="text-red-700 dark:text-red-300 mt-2">
              Chúng tôi có thể chia sẻ thông tin của bạn trong các trường hợp sau mà không cần thông báo trước:
            </p>
            <ul className="text-red-700 dark:text-red-300 mt-2">
              <li>• Khi có yêu cầu từ cơ quan pháp luật</li>
              <li>• Để bảo vệ quyền lợi hợp pháp của chúng tôi</li>
              <li>• Trong trường hợp khẩn cấp</li>
              <li>• Với các đối tác dịch vụ (hosting, analytics, v.v.)</li>
              <li>• Khi có sự thay đổi cấu trúc doanh nghiệp</li>
            </ul>
          </div>

          <h2>4. Bảo mật thông tin</h2>
          <p>
            Chúng tôi sử dụng các biện pháp bảo mật hợp lý để bảo vệ thông tin của bạn. 
            Tuy nhiên, <strong>không có hệ thống nào là hoàn toàn an toàn 100%</strong>. 
            Chúng tôi không thể đảm bảo tuyệt đối về việc bảo mật thông tin của bạn.
          </p>

          <h3>Trách nhiệm của bạn:</h3>
          <ul>
            <li>Giữ bí mật thông tin đăng nhập</li>
            <li>Sử dụng mật khẩu mạnh</li>
            <li>Đăng xuất sau khi sử dụng</li>
            <li>Không chia sẻ tài khoản với người khác</li>
          </ul>

          <h2>5. Cookies và công nghệ theo dõi</h2>
          <p>
            Chúng tôi sử dụng cookies và các công nghệ tương tự để:
          </p>
          <ul>
            <li>Ghi nhớ tùy chọn của bạn</li>
            <li>Phân tích lưu lượng truy cập</li>
            <li>Cải thiện dịch vụ</li>
            <li>Hiển thị nội dung phù hợp</li>
          </ul>
          <p>
            <strong>Bạn có thể vô hiệu hóa cookies trong trình duyệt, nhưng điều này có thể ảnh hưởng đến trải nghiệm sử dụng.</strong>
          </p>

          <h2>6. Quyền của bạn</h2>
          <p>Tùy thuộc vào pháp luật áp dụng, bạn có thể có quyền:</p>
          <ul>
            <li>Truy cập thông tin cá nhân của mình</li>
            <li>Yêu cầu sửa đổi thông tin không chính xác</li>
            <li>Yêu cầu xóa thông tin (trong một số trường hợp)</li>
            <li>Từ chối xử lý thông tin cho mục đích marketing</li>
          </ul>
          <p>
            <strong>Lưu ý:</strong> Việc thực hiện các quyền này có thể ảnh hưởng đến khả năng sử dụng dịch vụ của bạn.
          </p>

          <h2>7. Lưu trữ thông tin</h2>
          <p>
            Chúng tôi lưu trữ thông tin của bạn trong thời gian cần thiết để cung cấp dịch vụ hoặc tuân thủ nghĩa vụ pháp lý. 
            <strong>Chúng tôi có thể lưu trữ một số thông tin vô thời hạn cho mục đích bảo mật và ngăn chặn lạm dụng.</strong>
          </p>

          <h2>8. Trẻ em dưới 13 tuổi</h2>
          <p>
            Dịch vụ của chúng tôi không dành cho trẻ em dưới 13 tuổi. 
            Chúng tôi không cố ý thu thập thông tin từ trẻ em dưới 13 tuổi. 
            Nếu bạn là cha mẹ và phát hiện con mình đã cung cấp thông tin, vui lòng liên hệ với chúng tôi.
          </p>

          <h2>9. Chuyển giao dữ liệu quốc tế</h2>
          <p>
            Thông tin của bạn có thể được xử lý và lưu trữ ở các quốc gia khác có thể có luật bảo mật khác với quốc gia của bạn. 
            <strong>Bằng việc sử dụng dịch vụ, bạn đồng ý với việc chuyển giao này.</strong>
          </p>

          <h2>10. Thay đổi chính sách</h2>
          <p>
            Chúng tôi có thể cập nhật chính sách này bất cứ lúc nào. 
            Các thay đổi quan trọng sẽ được thông báo trên website. 
            <strong>Việc tiếp tục sử dụng dịch vụ sau khi thay đổi có nghĩa là bạn chấp nhận chính sách mới.</strong>
          </p>

          <h2>11. Liên hệ</h2>
          <p>
            Nếu bạn có câu hỏi về chính sách này, vui lòng liên hệ: privacy@mytruyen.com
          </p>
          <p>
            <strong>Lưu ý:</strong> Chúng tôi sẽ cố gắng phản hồi nhưng không cam kết thời gian phản hồi cụ thể.
          </p>

          <p className="text-sm text-muted-foreground mt-6">
            Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
          </p>
        </div>
      </div>
    </div>
  )
}
