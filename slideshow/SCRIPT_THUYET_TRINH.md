# KỊCH BẢN THUYẾT TRÌNH DỰ ÁN BLUEMOON

## Slide 1: Trang bìa (30 giây)

Xin chào quý thầy cô và các bạn. Hôm nay nhóm em xin trình bày đồ án môn học IT3180 - Phát triển ứng dụng web.

Dự án của nhóm em có tên là **BlueMoon - Web Quản Lý Chung Cư**.

Đây là hệ thống quản lý thu phí và cư trú thông minh, được xây dựng trên nền tảng Next.js kết hợp với Prisma ORM và SQLite. Hệ thống hỗ trợ song ngữ Việt - Anh và áp dụng mô hình phân quyền RBAC (Role-Based Access Control).

---

## Slide 2: Tổng quan dự án (1 phút)

BlueMoon là hệ thống web quản lý chung cư toàn diện, được xây dựng nhằm giải quyết bài toán quản lý thu phí, cư trú và báo cáo cho các khu chung cư cao cấp.

**Đối tượng sử dụng chính:**
- Quản trị viên hệ thống
- Kế toán viên phụ trách thu phí
- Tổ trưởng quản lý cư trú
- Ban quản trị chung cư

**Quy mô hệ thống:**
- Hơn 30 API endpoints
- 11 database models
- 3 vai trò người dùng chính

Hệ thống hỗ trợ đa ngôn ngữ và đã được tối ưu để triển khai trên nền tảng Vercel.

---

## Slide 3: Công nghệ sử dụng (1 phút)

Về mặt công nghệ, nhóm em sử dụng stack hiện đại:

**Frontend:** Next.js 16.2, React 19, TypeScript, Tailwind CSS
**Backend:** Prisma ORM, SQLite, JWT Authentication
**Tính năng:** RBAC, PDF Export, CSV Export, Audit Logging, i18n

**Yêu cầu hệ thống:**
- Node.js phiên bản 22 trở lên
- npm phiên bản 10 trở lên
- Git

Hệ thống đã được build production-ready và tương thích với Vercel hosting.

---

## Slide 4: Kiến trúc hệ thống (1 phút)

Kiến trúc hệ thống được thiết kế theo mô hình 4 lớp:

**Lớp Presentation:** Sử dụng Next.js App Router, React Components, Tailwind CSS, client-side rendering.

**Lớp API:** REST API với Route Handlers, Authentication Middleware, RBAC Authorization.

**Lớp Business Logic:** Prisma Client, Validation, Audit Logging, PDF/CSV Generation.

**Lớp Data:** SQLite Database, Prisma ORM, Migrations, Seeding.

Đặc điểm nổi bật: Serverless-ready, không cần custom server, hoạt động tốt trên Vercel, multi-tenant ready.

---

## Slide 5: Database Schema (1 phút)

Hệ thống sử dụng 8 bảng chính:

**User:** Quản lý thông tin người dùng, vai trò, trạng thái khóa.
**Household:** Quản lý hộ khẩu với thông tin căn hộ, chủ hộ, diện tích.
**Resident:** Quản lý nhân khẩu, loại cư trú.
**FeeType:** Danh mục khoản thu (bắt buộc/tự nguyện, tính theo m2/cố định).
**FeePeriod:** Đợt thu theo tháng/năm.
**Obligation:** Nghĩa vụ thu phí của từng hộ.
**Payment:** Giao dịch thu phí với thông tin người thu, người nộp.
**AuditLog:** Nhật ký hoạt động hệ thống.

---

## Slide 6: Chức năng chính (1 phút)

Hệ thống cung cấp 11 chức năng chính:

1. Quản lý hộ khẩu và nhân khẩu chi tiết
2. Quản lý khoản thu (bắt buộc/tự nguyện)
3. Quản lý đợt thu theo tháng/năm
4. Theo dõi nghĩa vụ và thu phí
5. Dashboard với biểu đồ và KPI
6. Báo cáo đa dạng (PDF/CSV)
7. Quản lý biến động cư trú
8. Hệ thống nhắc phí tự động
9. Phân quyền RBAC chi tiết
10. Audit log đầy đủ
11. Đa ngôn ngữ (Việt/Anh)

---

## Slide 7: Quản lý cư trú (1 phút)

Phân hệ quản lý cư trú bao gồm:

**Quản lý hộ khẩu:** Thông tin căn hộ, tầng, chủ hộ, số điện thoại, liên hệ khẩn cấp, số chỗ xe, ngày vào ở, trạng thái sở hữu, ngày hết hợp đồng, diện tích.

**Quản lý nhân khẩu:** Họ tên, ngày sinh, giới tính, CCCD/CMND, loại cư trú (thường trú/tạm trú).

**Biến động cư trú:** Ghi nhận tạm trú, tạm vắng, chuyển đến, chuyển đi. Có timeline theo dõi các biến động.

---

## Slide 8: Quản lý thu phí (1 phút)

Phân hệ thu phí được thiết kế linh hoạt:

**Danh mục khoản thu:**
- Phí bắt buộc: bảo vệ, vệ sinh, vận hành, quản lý
- Phí tự nguyện: từ thiện, biển đảo
- Tính theo mét vuông hoặc cố định

**Quy trình thu phí:**
Tạo đợt thu → Tạo nghĩa vụ → Thu phí → In phiếu thu → Cập nhật công nợ

**Thanh toán:** Hỗ trợ tiền mặt và chuyển khoản. Theo dõi người nộp, người thu, mã giao dịch ngân hàng.

---

## Slide 9: Báo cáo & Phân tích (1 phút)

Hệ thống cung cấp báo cáo đa dạng và chuyên nghiệp:

- Báo cáo tổng hợp thu phí theo tháng
- Báo cáo công nợ theo hộ gia đình
- Biểu đồ tỷ lệ thu theo tháng
- Biểu đồ nợ theo tuổi nợ (aging)
- Phân tích hiệu quả thu theo tầng
- Top người thu hiệu quả nhất
- Export PDF chuyên nghiệp
- Export CSV cho Excel analysis
- Biểu đồ histogram tương tác
- Dashboard KPI real-time

---

## Slide 10: Bảo mật & Phân quyền (1 phút)

**Xác thực (Authentication):**
- Password hash PBKDF2
- Session token server-side
- Cookie httpOnly + sameSite=lax
- Khóa tài khoản sau 5 lần đăng nhập sai

**Phân quyền (RBAC):**
- 3 vai trò: ADMIN (toàn quyền), ACCOUNTANT (thu phí), TEAM_LEADER (cư trú)
- Phân quyền module-level: SYSTEM, FEE, RESIDENT, REPORT

**Audit Logging:** Ghi nhận đầy đủ: đăng nhập/đăng xuất, tạo/cập nhật/xóa, thu phí, khóa/mở khóa tài khoản.

**Input Validation:** API error contract chuẩn hóa, validation email/phone/số, giới hạn pagination.

---

## Slide 11: Kiểm thử & Triển khai (1 phút)

**E2E Testing:** Smoke test cho các API critical: authentication, core read APIs, report export, audit log.

**Security Testing:** Password hashing, session management, RBAC enforcement, input validation, audit logging.

**Triển khai:**
- Production build với Next.js
- Vercel-compatible
- SQLite cho local development
- PostgreSQL cho production
- Environment variables: DATABASE_URL, ALLOW_BOOTSTRAP_SIGNUP

---

## Slide 12: Cảm ơn (30 giây)

Nhóm em xin cảm ơn quý thầy cô và các bạn đã lắng nghe.

Dự án BlueMoon - Web Quản Lý Chung Cư được xây dựng trên nền tảng Next.js + Prisma + SQLite + RBAC, hỗ trợ song ngữ Việt/Anh và đã sẵn sàng cho production với Vercel.

Nhóm em rất mong nhận được góp ý từ quý thầy cô và các bạn để hoàn thiện hệ thống.

Xin chân thành cảm ơn!

---

**GHI CHÚ:**
- Tổng thời gian dự kiến: 10-12 phút
- Nên giữ giọng điệu tự tin, rõ ràng
- Có thể điều chỉnh nội dung tùy theo thời gian quy định
- Nên dừng lại ở các slide có ảnh để giải thích chi tiết
