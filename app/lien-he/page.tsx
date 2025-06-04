"use client"

import { useState } from "react"
import { Mail, MapPin, Phone, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast({
      title: "Đã gửi yêu cầu",
      description: "Chúng tôi không cam kết thời gian phản hồi cụ thể. Vui lòng kiên nhẫn chờ đợi.",
    })

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Liên hệ với chúng tôi</h1>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">Lưu ý quan trọng:</h3>
              <ul className="text-yellow-700 dark:text-yellow-300 mt-1 text-sm">
                <li>• Chúng tôi không cam kết thời gian phản hồi cụ thể</li>
                <li>• Không phải tất cả tin nhắn đều được phản hồi</li>
                <li>• Chúng tôi có quyền từ chối trả lời những yêu cầu không phù hợp</li>
                <li>• Thông tin bạn cung cấp có thể được lưu trữ và sử dụng theo chính sách bảo mật</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="prose dark:prose-invert max-w-none">
              <h2>Thông tin liên hệ</h2>
              <p>
                Bạn có thể gửi tin nhắn qua form bên cạnh hoặc liên hệ trực tiếp qua các kênh dưới đây. 
                <strong>Lưu ý rằng việc liên hệ không đảm bảo bạn sẽ nhận được phản hồi.</strong>
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <h3 className="font-medium">Địa chỉ</h3>
                  <p className="text-muted-foreground">Việt Nam (Địa chỉ cụ thể không công khai)</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-primary" />                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">contact@mytruyen.com</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    * Không cam kết phản hồi tất cả email
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <h3 className="font-medium">Hỗ trợ</h3>
                  <p className="text-muted-foreground">Chỉ qua email và form liên hệ</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    * Không hỗ trợ qua điện thoại
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-medium mb-4">Mạng xã hội</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary">
                  Facebook
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  Twitter
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  Instagram
                </a>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                * Các liên kết chỉ mang tính minh họa
              </p>
            </div>

            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <h3 className="font-medium mb-2">Trước khi liên hệ:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Đọc kỹ Điều khoản sử dụng và Chính sách bảo mật</li>
                <li>• Kiểm tra FAQ (nếu có) để tìm câu trả lời nhanh</li>
                <li>• Đảm bảo câu hỏi của bạn phù hợp và lịch sự</li>
                <li>• Chấp nhận rằng có thể không nhận được phản hồi</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Gửi tin nhắn</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên *</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Tiêu đề *</Label>
                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Nội dung *</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Vui lòng viết rõ ràng và lịch sự..."
                />
              </div>              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
              </Button>

              <div className="text-xs text-muted-foreground mt-2 p-3 bg-gray-50 dark:bg-gray-900/50 rounded">
                <p className="font-medium mb-1">Lưu ý khi gửi:</p>
                <ul className="space-y-1">
                  <li>• Bằng việc gửi form này, bạn đồng ý với việc chúng tôi lưu trữ thông tin</li>
                  <li>• Chúng tôi có thể không phản hồi tất cả tin nhắn</li>
                  <li>• Thông tin có thể được sử dụng cho mục đích cải thiện dịch vụ</li>
                  <li>• Chúng tôi không chịu trách nhiệm về bất kỳ thiệt hại nào từ việc liên hệ này</li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
