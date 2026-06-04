# KỊCH BẢN THUYẾT TRÌNH DỰ ÁN BLUEMOON (30 PHÚT)

## CHƯƠNG I: MỞ ĐẦU (3 PHÚT)

### Slide 1: Trang bìa (3 phút)

**Thời gian:** 3 phút
**Giọng điệu:** Trang trọng, tự tin, chuyên nghiệp

---

Xin chào quý thầy cô và các bạn!

Hôm nay, nhóm em rất vinh dự được trình bày đồ án môn học **IT3180 - Phát triển ứng dụng web**.

Dự án của nhóm em có tên là **"BlueMoon - Web Quản Lý Chung Cư"**. Đây là một hệ thống quản lý thu phí và cư trú thông minh, được thiết kế nhằm giải quyết những thách thức trong quản lý hành chính tại các khu chung cư cao cấp tại Việt Nam.

**Vì sao chọn tên BlueMoon?**
"BlueMoon" trong tiếng Anh có nghĩa là "trăng xanh" - một hiện tượng hiếm gặp, đẹp đẽ và đặc biệt. Điều này tượng trưng cho tầm nhìn của nhóm em: xây dựng một hệ thống quản lý không chỉ hiệu quả mà còn mang tính đột phá, khác biệt trong lĩnh vực công nghệ quản lý chung cư.

**Đối tượng mục tiêu:**
- Ban quản trị chung cư và các khu dân cư cao cấp
- Các công ty quản lý bất động sản
- Khu vực phường, quận trong việc quản lý hộ khẩu
- Các đơn vị kế toán, thu phí trong khu chung cư

**Phạm vi đồ án:**
Hệ thống được phát triển với đầy đủ các module: quản lý hộ khẩu, nhân khẩu, thu phí, báo cáo, phân quyền người dùng, và hệ thống audit log. Đặc biệt, hệ thống hỗ trợ song ngữ Việt - Anh và áp dụng mô hình phân quyền RBAC (Role-Based Access Control) nghiêm ngặt.

**Tổng quan công nghệ:**
Xây dựng trên nền tảng Next.js 16.2 kết hợp với React 19, TypeScript, Prisma ORM và SQLite. Đây là stack công nghệ hiện đại, được tối ưu cho performance và khả năng mở rộng.

---

## CHƯƠNG II: PHÂN TÍCH YÊU CẦU (4 PHÚT)

### Slide 2: Tổng quan dự án (4 phút)

**Thời gian:** 4 phút
**Giọng điệu:** Phân tích chuyên sâu, logic

---

Trước khi đi vào chi tiết kỹ thuật, nhóm em xin trình bày phân tích tổng quan về dự án.

**Bối cảnh thực tế:**
Hiện nay, tại các khu chung cư cao cấp tại Hà Nội và TP.HCM, việc quản lý thu phí sinh hoạt, phí quản lý, và theo dõi cư trú vẫn đang được thực hiện chủ yếu thủ công hoặc qua các phần mềm Excel đơn giản. Điều này dẫn đến nhiều vấn đề:

1. **Khó khăn trong việc tính toán và theo dõi công nợ:** Với hàng trăm căn hộ, mỗi căn có diện tích khác nhau, số nhân khẩu khác nhau, việc tính toán phí quản lý theo mét vuông hoặc theo đầu người trở nên cực kỳ phức tạp.

2. **Thiếu minh bạch trong thu chi:** Cư dân thường không có cái nhìn rõ ràng về các khoản phí phải đóng, cách tính phí, và lịch sử đóng phí của gia đình mình.

3. **Quản lý cư trú lỏng lẻo:** Việc theo dõi nhân khẩu, tạm trú, tạm vắng, biến động cư trú thường xuyên bị bỏ sót, dẫn đến khó khăn cho công tác an ninh và quản lý của địa phương.

4. **Báo cáo thiếu chuyên nghiệp:** Ban quản trị thường gặp khó khăn trong việc tổng hợp báo cáo tài chính, tỷ lệ thu phí, và các chỉ số KPI để đánh giá hiệu quả quản lý.

**Giải pháp của BlueMoon:**

**Thứ nhất - Tự động hóa quy trình:**
Hệ thống tự động tính toán phí quản lý dựa trên diện tích căn hộ, số nhân khẩu, và các quy định riêng của từng khu chung cư. Điều này loại bỏ sai sót do tính toán thủ công.

**Thứ hai - Minh bạch hóa thông tin:**
Mỗi hộ gia đình có thể xem lịch sử đóng phí, công nợ hiện tại, và các khoản phí sắp tới. Điều này tăng cường lòng tin giữa cư dân và ban quản trị.

**Thứ ba - Quản lý cư trú chặt chẽ:**
Hệ thống theo dõi chi tiết từng nhân khẩu, ghi nhận biến động tạm trú, tạm vắng, chuyển đến, chuyển đi. Tích hợp với hệ thống báo cáo cho chính quyền địa phương.

**Thứ tư - Báo cáo chuyên nghiệp:**
Tự động tạo báo cáo tài chính, biểu đồ tỷ lệ thu, phân tích hiệu quả theo tầng, theo thời gian. Hỗ trợ xuất PDF và CSV.

**Quy mô hệ thống:**
- **Hơn 30 API endpoints** được thiết kế theo chuẩn RESTful
- **11 database models** với mối quan hệ chặt chẽ
- **3 vai trò người dùng chính:** Admin (toàn quyền), Accountant (kế toán), Team Leader (tổ trưởng cư trú)
- Hỗ trợ đa ngôn ngữ: Tiếng Việt và Tiếng Anh
- Đã tối ưu để triển khai trên nền tảng Vercel (serverless)

**Đối tượng sử dụng chi tiết:**

1. **Admin (Quản trị viên):** Có toàn quyền trên hệ thống. Quản lý người dùng, phân quyền, xem audit log, cấu hình hệ thống.

2. **Accountant (Kế toán viên):** Quản lý danh mục phí, tạo đợt thu, ghi nhận thanh toán, xuất báo cáo tài chính.

3. **Team Leader (Tổ trưởng cư trú):** Quản lý hộ khẩu, nhân khẩu, biến động cư trú. Có quyền đọc thông tin thu phí nhưng không được ghi nhận thanh toán.

---

## CHƯƠNG III: CÔNG NGHỆ VÀ KIẾN TRÚC (6 PHÚT)

### Slide 3: Công nghệ sử dụng (3 phút)

**Thời gian:** 3 phút
**Giọng điệu:** Kỹ thuật, chuyên sâu

---

Về mặt công nghệ, nhóm em đã lựa chọn stack hiện đại, đảm bảo hiệu năng cao và khả năng mở rộng.

**Lý do chọn Next.js:**

1. **Server-Side Rendering (SSR):** Giúp tăng tốc độ tải trang ban đầu và tối ưu SEO. Điều này quan trọng vì hệ thống cần nhanh và mượt mà.

2. **API Routes:** Tích hợp sẵn REST API trong cùng project, không cần tách riêng backend. Giảm độ phức tạp và tăng tốc độ phát triển.

3. **File-based Routing:** Cấu trúc routing dựa trên file system, dễ dàng quản lý và bảo trì.

4. **Hot Reload:** Tự động reload khi code thay đổi, tăng năng suất phát triển.

5. **Vercel Integration:** Triển khai cực kỳ đơn giản lên Vercel với chỉ một lệnh.

**Frontend Stack:**
- **Next.js 16.2:** Framework React hiện đại nhất với App Router
- **React 19:** Thư viện UI với hooks, context API, và concurrent features
- **TypeScript:** Ngôn ngữ kiểm tra kiểu tĩnh, giảm bug runtime, tăng maintainability
- **Tailwind CSS:** Framework CSS utility-first, giúp đồng nhất design và tăng tốc độ phát triển UI

**Backend Stack:**
- **Prisma ORM:** ORM hiện đại với type-safe database queries, auto-generated migration, và intuitive data modeling
- **SQLite:** Cơ sở dữ liệu nhẹ, không cần cài đặt server riêng, phù hợp cho small-to-medium scale
- **JWT Authentication:** Stateless authentication với JSON Web Tokens, giảm tải server

**Tính năng nổi bật:**
- **RBAC (Role-Based Access Control):** Phân quyền module-level và action-level
- **PDF Export:** Xuất báo cáo chuyên nghiệp dùng thư viện WeasyPrint
- **CSV Export:** Xuất dữ liệu để phân tích trong Excel
- **Audit Logging:** Ghi nhận mọi hoạt động quan trọng trong hệ thống
- **i18n (Internationalization):** Hỗ trợ song ngữ Việt - Anh

**Yêu cầu hệ thống:**
- Node.js phiên bản 22 trở lên
- npm phiên bản 10 trở lên
- Git để quản lý version

Hệ thống đã được build production-ready, tối ưu bundle size, và tương thích hoàn toàn với Vercel hosting.

---

### Slide 4: Kiến trúc hệ thống (3 phút)

**Thời gian:** 3 phút
**Giọng điệu:** Hệ thống, có cấu trúc

---

Kiến trúc hệ thống được thiết kế theo mô hình **4 lớp**, đảm bảo separation of concerns và dễ dàng bảo trì.

**Lớp 1 - Presentation Layer (Giao diện người dùng):**
- **Next.js App Router:** Quản lý routing và rendering
- **React Components:** UI components tái sử dụng, được thiết kế theo nguyên tắc atomic design
- **Tailwind CSS:** Styling với utility classes, đảm bảo consistency
- **Client-side rendering:** Cho các interactive components như form, chart, filter

**Lớp 2 - API Layer (Xử lý request):**
- **REST API endpoints:** Xử lý CRUD operations cho tất cả resources
- **Route Handlers:** Next.js API routes với TypeScript
- **Authentication Middleware:** Kiểm tra JWT token, session validation
- **RBAC Authorization:** Kiểm tra quyền truy cập module và action
- **Error Handling:** Centralized error handling với standardized error format

**Lớp 3 - Business Logic Layer (Xử lý nghiệp vụ):**
- **Prisma Client:** Type-safe database queries
- **Validation Layer:** Input validation với Zod schema
- **Audit Logging:** Tự động ghi nhận các hoạt động create, update, delete
- **PDF/CSV Generation:** Tạo báo cáo tự động
- **Business Rules:** Tính toán phí, tạo nghĩa vụ, cập nhật công nợ

**Lớp 4 - Data Layer (Lưu trữ dữ liệu):**
- **SQLite Database:** Cơ sở dữ liệu quan hệ, lưu trữ tất cả entities
- **Prisma ORM:** Migration, seeding, và query builder
- **File Storage:** Lưu trữ file đính kèm (chứng từ thanh toán)

**Luồng dữ liệu điển hình:**
1. Người dùng tương tác với UI → Request đến API endpoint
2. API layer kiểm tra authentication và authorization
3. Business logic layer xử lý nghiệp vụ, validate input
4. Data layer thực hiện CRUD operations
5. Audit log được ghi nhận tự động
6. Response trả về client với data hoặc error

**Đặc điểm kiến trúc:**
- **Serverless-ready:** Không cần maintain server, tự động scale
- **Stateless:** Không lưu trạng thái trên server, dễ dàng horizontal scaling
- **Multi-tenant ready:** Hỗ trợ nhiều chung cư trên cùng hệ thống
- **Type-safe:** TypeScript từ frontend đến backend, giảm runtime errors

---

## CHƯƠNG IV: THIẾT KẾ HỆ THỐNG (6 PHÚT)

### Slide 5: Database Schema (3 phút)

**Thời gian:** 3 phút
**Giọng điệu:** Chi tiết, kỹ thuật

---

Hệ thống sử dụng 8 bảng chính, được thiết kế theo nguyên tắc normalization để giảm redundancy và đảm bảo data integrity.

**Bảng 1 - User (Người dùng):**
- Quản lý thông tin đăng nhập: username, email, passwordHash
- Thông tin cá nhân: phone, fullName, avatarUrl, address
- Vai trò và quyền: role (ADMIN, ACCOUNTANT, TEAM_LEADER)
- Bảo mật: failedLoginCount, lockedUntil, status (ACTIVE, BLOCKED)
- Mối quan hệ: One-to-many với Session, AuditLog

**Bảng 2 - Household (Hộ khẩu):**
- Thông tin căn hộ: apartmentNo (unique), floorNo, areaM2
- Thông tin chủ hộ: ownerName, ownerPhone
- Liên hệ khẩn cấp: emergencyContactName, emergencyContactPhone
- Thông tin bổ sung: parkingSlots, moveInDate, ownershipStatus (OWNER, TENANT), contractEndDate
- Mối quan hệ: One-to-many với Resident, Obligation, CommunicationLog

**Bảng 3 - Resident (Nhân khẩu):**
- Thông tin cá nhân: fullName, dob (date of birth), gender
- Định danh: idNo (unique), residentType (PERMANENT, TEMPORARY)
- Mối quan hệ: Many-to-one với Household, One-to-many với ResidencyEvent

**Bảng 4 - FeeType (Loại phí):**
- Thông tin cơ bản: code (unique), name
- Phân loại: category (MANDATORY, VOLUNTARY)
- Cách tính: calcMethod (PER_M2, FIXED), rate
- Chính sách: graceDays, lateFeeRule, effectiveFrom, effectiveTo
- Mối quan hệ: One-to-many với FeePeriod, Payment

**Bảng 5 - FeePeriod (Đợt thu):**
- Thời gian: month, year
- Trạng thái: status (OPEN, CLOSED)
- Mối quan hệ: Many-to-one với FeeType, One-to-many với Obligation

**Bảng 6 - Obligation (Nghĩa vụ):**
- Số tiền: amountDue, amountPaid
- Mối quan hệ: Many-to-one với FeePeriod và Household
- Unique constraint: [periodId, householdId]

**Bảng 7 - Payment (Giao dịch thu):**
- Thông tin giao dịch: paidAmount, method (CASH, BANK), paidAt
- Người thực hiện: collectorName, payerName, payerPhone
- Chứng từ: bankTxRef, attachmentUrl, receiptNo (unique)
- Mối quan hệ: Many-to-one với Obligation và FeeType

**Bảng 8 - AuditLog (Nhật ký):**
- Hành động: action (CREATE, UPDATE, DELETE, LOGIN, LOGOUT, ...)
- Đối tượng: entity, entityId
- Chi tiết: detail, createdAt
- Người thực hiện: actorUserId (many-to-one với User)

**Các enum types:**
- UserStatus: ACTIVE, BLOCKED
- Role: ADMIN, ACCOUNTANT, TEAM_LEADER
- FeeCategory: MANDATORY, VOLUNTARY
- CalcMethod: PER_M2, FIXED
- PaymentMethod: CASH, BANK
- OwnershipStatus: OWNER, TENANT

---

### Slide 6: Chức năng chính (3 phút)

**Thời gian:** 3 phút
**Giọng điệu:** Giới thiệu tính năng, thực tiễn

---

Hệ thống cung cấp 11 chức năng chính, được phát triển dựa trên nghiên cứu thực tiễn tại các khu chung cư.

**1. Quản lý hộ khẩu và nhân khẩu:**
- Tạo, cập nhật, xóa hộ khẩu với thông tin đầy đủ
- Quản lý nhân khẩu theo từng hộ
- Tìm kiếm và lọc theo nhiều tiêu chí

**2. Quản lý khoản thu:**
- Phân loại: bắt buộc (bảo vệ, vệ sinh, vận hành, quản lý) và tự nguyện (từ thiện, biển đảo)
- Cách tính: theo mét vuông hoặc cố định
- Chính sách: ngày ân hạn, quy tắc phạt trễ

**3. Quản lý đợt thu:**
- Tạo đợt thu theo tháng/năm
- Mở/đóng đợt thu
- Theo dõi tiến độ thu của từng đợt

**4. Theo dõi nghĩa vụ và thu phí:**
- Tự động tạo nghĩa vụ từ đợt thu
- Ghi nhận thanh toán (tiền mặt, chuyển khoản)
- Cập nhật công nợ tự động

**5. Dashboard với biểu đồ và KPI:**
- Tổng phải thu, đã thu, còn nợ
- Tỷ lệ thu theo tháng
- Số hộ đã đóng đủ
- Biểu đồ histogram tương tác

**6. Báo cáo đa dạng:**
- Báo cáo tổng hợp thu phí
- Báo cáo công nợ theo hộ
- Báo cáo hiệu quả thu theo tầng
- Export PDF và CSV

**7. Quản lý biến động cư trú:**
- Ghi nhận tạm trú, tạm vắng
- Theo dõi chuyển đến, chuyển đi
- Timeline biến động

**8. Hệ thống nhắc phí tự động:**
- Gửi thông báo nhắc phí qua SMS, email, Zalo
- Theo dõi trạng thái gửi (thành công/thất bại)
- Lịch sử nhắc phí

**9. Phân quyền RBAC:**
- Phân quyền module-level: SYSTEM, FEE, RESIDENT, REPORT
- Phân quyền action-level: CREATE, READ, UPDATE, DELETE
- Gán quyền theo vai trò

**10. Audit log:**
- Ghi nhận mọi hoạt động quan trọng
- Theo dõi người thực hiện, thời gian, chi tiết
- Lịch sử đăng nhập/đăng xuất

**11. Đa ngôn ngữ:**
- Hỗ trợ tiếng Việt và tiếng Anh
- Chuyển đổi ngôn ngữ real-time
- Dịch thuật đầy đủ

---

## CHƯƠNG V: DEMO CHỨC NĂNG (8 PHÚT)

### Slide 7: Quản lý cư trú (2.5 phút)

**Thời gian:** 2 phút 30 giây
**Giọng điệu:** Demo, tương tác

---

*Lưu ý: Trình bày kết hợp với việc chỉ vào ảnh screenshot hoặc demo thực tế trên màn hình*

**Màn hình quản lý cư trú bao gồm 3 module chính:**

**Module 1 - Quản lý hộ khẩu:**
- Danh sách hộ khẩu với thông tin tổng quan: căn hộ, tầng, chủ hộ, số điện thoại
- Khả năng tìm kiếm theo mã căn hộ, tên chủ hộ, số điện thoại
- Bộ lọc theo tầng, trạng thái sở hữu
- Xem chi tiết hộ: thông tin đầy đủ, danh sách nhân khẩu, công nợ
- Chức năng thêm, sửa, xóa hộ khẩu
- Gửi nhắc phí trực tiếp từ danh sách hộ

**Module 2 - Quản lý nhân khẩu:**
- Danh sách nhân khẩu theo từng hộ
- Thông tin: họ tên, ngày sinh, giới tính, CCCD/CMND, loại cư trú
- Phân loại: thường trú (có hộ khẩu tại đây) hoặc tạm trú (ở tạm)
- Chức năng thêm, sửa, xóa nhân khẩu
- Thống kê nhân khẩu theo hộ

**Module 3 - Biến động cư trú:**
- Ghi nhận các loại biến động: tạm trú, tạm vắng, chuyển đến, chuyển đi
- Thông tin: người, loại biến động, ngày bắt đầu, ngày kết thúc, ghi chú
- Timeline theo dõi các biến động gần nhất
- Báo cáo biến động theo tháng/quý/năm

**Ví dụ thực tế:**
- Căn hộ A101 có 4 nhân khẩu: 2 thường trú, 2 tạm trú
- Biến động tháng 6: 1 người chuyển đi, 1 người chuyển đến
- Hệ thống tự động cập nhật số nhân khẩu và tính toán lại phí (nếu phí tính theo đầu người)

---

### Slide 8: Quản lý thu phí (2.5 phút)

**Thời gian:** 2 phút 30 giây
**Giọng điệu:** Demo, giải thích quy trình

---

*Lưu ý: Trình bày kết hợp với việc chỉ vào ảnh screenshot hoặc demo thực tế*

**Quy trình thu phí được thiết kế rõ ràng và minh bạch:**

**Bước 1 - Danh mục khoản thu:**
- Phí bắt buộc: 
  - Phí bảo vệ: tính theo mét vuông, 5.000đ/m²/tháng
  - Phí vệ sinh: tính theo mét vuông, 3.000đ/m²/tháng
  - Phí vận hành: cố định 200.000đ/tháng
  - Phí quản lý: tính theo mét vuông, 8.000đ/m²/tháng

- Phí tự nguyện:
  - Quỹ từ thiện: tùy tâm, không bắt buộc
  - Quỹ biển đảo: tùy tâm, không bắt buộc

- Chính sách áp dụng:
  - Ngày ân hạn: 5 ngày sau ngày phát hành
  - Phạt trễ: 5% sau 15 ngày, 10% sau 30 ngày
  - Hiệu lực từ ngày đăng ký

**Bước 2 - Tạo đợt thu:**
- Chọn loại phí và tháng/năm
- Hệ thống tự động tính toán nghĩa vụ cho từng hộ
- Ví dụ: Căn hộ 100m² sẽ nộp:
  - Bảo vệ: 500.000đ
  - Vệ sinh: 300.000đ
  - Vận hành: 200.000đ
  - Quản lý: 800.000đ
  - Tổng: 1.800.000đ/tháng

**Bước 3 - Thu phí:**
- Chọn nghĩa vụ cần thu
- Nhập số tiền thực tế (có thể thu một phần)
- Chọn phương thức: tiền mặt hoặc chuyển khoản
- Nhập thông tin người nộp, người thu
- Ghi nhận mã giao dịch ngân hàng (nếu chuyển khoản)
- Tải lên chứng từ (nếu cần)
- Hệ thống tự động cập nhật công nợ

**Bước 4 - In phiếu thu:**
- Tự động tạo phiếu thu với mã số duy nhất
- Thông tin đầy đủ: ngày giờ, số tiền, người nộp, người thu, mã giao dịch
- Xuất PDF chuyên nghiệp
- Lưu trữ để tra cứu sau này

---

### Slide 9: Báo cáo & Phân tích (3 phút)

**Thời gian:** 3 phút
**Giọng điệu:** Phân tích, chuyên nghiệp

---

*Lưu ý: Trình bày kết hợp với việc chỉ vào ảnh screenshot hoặc demo thực tế*

**Hệ thống báo cáo được thiết kế để giúp ban quản trị có cái nhìn toàn diện về tình hình tài chính và hiệu quả quản lý.**

**1. Báo cáo tổng hợp thu phí theo tháng:**
- Tổng số tiền phải thu
- Tổng số tiền đã thu
- Tổng công nợ còn lại
- Tỷ lệ thu đạt được (%)
- So sánh với tháng trước

**2. Báo cáo công nợ theo hộ gia đình:**
- Danh sách hộ có công nợ
- Chi tiết từng khoản nợ: loại phí, tháng, số tiền
- Tuổi nợ: 1-30 ngày, 31-60 ngày, 61-90 ngày, >90 ngày
- Khả năng lọc theo mức độ nợ

**3. Biểu đồ tỷ lệ thu theo tháng:**
- Biểu đồ cột so sánh phải thu và đã thu
- Xu hướng qua các tháng
- Nhận diện tháng có tỷ lệ thu thấp để kịp thời điều chỉnh

**4. Biểu đồ nợ theo tuổi nợ (Aging):**
- Phân loại nợ theo thời gian
- Màu sắc cảnh báo: xanh (1-30 ngày), vàng (31-60 ngày), đỏ (>90 ngày)
- Giúp ưu tiên thu hồi nợ cũ

**5. Phân tích hiệu quả thu theo tầng:**
- So sánh tỷ lệ thu giữa các tầng
- Xác định tầng có tỷ lệ thu thấp để tìm nguyên nhân
- Đánh giá hiệu quả công tác quản lý

**6. Top người thu hiệu quả nhất:**
- Xếp hạng nhân viên thu phí theo số tiền thu được
- Đánh giá hiệu suất làm việc
- Đề xuất khen thưởng

**7. Export báo cáo:**
- Xuất PDF: báo cáo chuyên nghiệp, có đóng dấu, chữ ký
- Xuất CSV: để phân tích sâu trong Excel
- Tự động gửi email báo cáo định kỳ

**Ví dụ phân tích thực tế:**
- Tháng 6/2026: Tỷ lệ thu đạt 92%, tăng 5% so với tháng 5
- Công nợ tập trung chủ yếu ở tầng 3 (tỷ lệ thu 85%)
- 5 hộ có nợ >90 ngày, cần can thiệp trực tiếp
- Nhân viên Nguyễn Văn A thu hiệu quả nhất: 150 triệu/tháng

---

## CHƯƠNG VI: BẢO MẬT VÀ TRIỂN KHAI (4 PHÚT)

### Slide 10: Bảo mật & Phân quyền (2 phút)

**Thời gian:** 2 phút
**Giọng điệu:** Nghiêm túc, chuyên nghiệp

---

**Bảo mật là yếu tố được nhóm em đặt lên hàng đầu trong quá trình phát triển.**

**1. Xác thực (Authentication):**
- **Password hashing:** Sử dụng thuật toán PBKDF2 (Password-Based Key Derivation Function 2) với salt ngẫu nhiên. Đảm bảo ngay cả khi database bị lộ, password vẫn an toàn.
- **Session management:** Token được lưu server-side trong database, không lưu sensitive information trên client.
- **Cookie security:** HttpOnly (không truy cập được từ JavaScript), SameSite=Lax (chống CSRF), Secure flag (chỉ gửi qua HTTPS trong production).
- **Brute force protection:** Khóa tài khoản tạm thời sau 5 lần đăng nhập sai. Thông báo cho admin và ghi log.
- **Session timeout:** Tự động đăng xuất sau 24 giờ không hoạt động.

**2. Phân quyền RBAC (Role-Based Access Control):**
- **3 vai trò chính:**
  - ADMIN: Toàn quyền hệ thống (quản lý người dùng, cấu hình, xem toàn bộ báo cáo)
  - ACCOUNTANT: Quản lý thu phí, tạo báo cáo tài chính, không được xóa dữ liệu cư trú
  - TEAM_LEADER: Quản lý cư trú, xem thông tin thu phí nhưng không được ghi nhận thanh toán

- **Phân quyền module-level:**
  - SYSTEM: Quản lý hệ thống (admin only)
  - FEE: Quản lý thu phí (accountant + admin)
  - RESIDENT: Quản lý cư trú (team leader + admin)
  - REPORT: Xem báo cáo (tất cả roles)

- **Phân quyền action-level:**
  - CREATE: Tạo mới
  - READ: Xem
  - UPDATE: Cập nhật
  - DELETE: Xóa (chỉ admin và một số trường hợp đặc biệt)

**3. Audit Logging:**
- Ghi nhận đầy đủ: ai, làm gì, khi nào, trên đối tượng nào
- Các hành động được log: đăng nhập/đăng xuất, tạo/cập nhật/xóa, thu phí, khóa/mở khóa tài khoản
- Không thể xóa hoặc sửa audit log (append-only)
- Giúp truy vết khi có sự cố

**4. Input Validation:**
- API error contract chuẩn hóa: {code, message, details}
- Validation email, phone, số tiền, ngày tháng
- Giới hạn pagination (tối đa 500 records/request) để chống DoS
- Strong password policy: ít nhất 8 ký tự, có chữ hoa, chữ thường, số
- Enum validation để chống injection

---

### Slide 11: Kiểm thử & Triển khai (2 phút)

**Thời gian:** 2 phút
**Giọng điệu:** Thực tế, có kế hoạch

---

**1. E2E Testing (End-to-End Testing):**
- **Smoke test:** Kiểm tra các API critical: authentication, core read APIs, report export, audit log
- **Command:** `npm run test:e2e:smoke`
- **Kịch bản test:**
  - Đăng nhập → Lấy token → Truy cập API → Kiểm tra response
  - Tạo hộ khẩu → Thêm nhân khẩu → Tạo đợt thu → Thu phí → Xuất báo cáo
  - Kiểm tra permission: admin có thể xóa, accountant không thể xóa

**2. Security Testing:**
- **Password hashing test:** Kiểm tra password không bị lộ trong database
- **Session management test:** Token hết hạn, không thể giả mạo
- **RBAC enforcement test:** Người dùng không thể truy cập resource không được phép
- **Input validation test:** Chống SQL injection, XSS, NoSQL injection
- **Audit logging test:** Mọi hành động quan trọng đều được ghi log

**3. Triển khai (Deployment):**
- **Production build:** `npm run build` tạo optimized bundle
- **Vercel hosting:** Tích hợp CI/CD, tự động deploy khi push code
- **Database:** SQLite cho local development, PostgreSQL cho production
- **Environment variables:**
  - DATABASE_URL: Chuỗi kết nối database
  - ALLOW_BOOTSTRAP_SIGNUP: Cho phép tạo tài khoản admin đầu tiên
  - NODE_ENV: Production mode

**4. Monitoring & Maintenance:**
- **Error tracking:** Tích hợp Sentry hoặc LogRocket để theo dõi lỗi
- **Performance monitoring:** Theo dõi thời gian response, tốc độ tải trang
- **Backup:** Tự động backup database định kỳ
- **Security updates:** Cập nhật dependencies thường xuyên

---

## CHƯƠNG VII: KẾT LUẬN (2 PHÚT)

### Slide 12: Cảm ơn (2 phút)

**Thời gian:** 2 phút
**Giọng điệu:** Trân trọng, tự tin

---

**Tổng kết lại, nhóm em xin nhấn mạnh những điểm nổi bật của dự án BlueMoon:**

**1. Tính thực tiễn cao:**
Hệ thống được thiết kế dựa trên nghiên cứu thực tế tại các khu chung cư, giải quyết đúng những vấn đề đau đầu của ban quản trị.

**2. Công nghệ hiện đại:**
Sử dụng Next.js 16, React 19, TypeScript, Prisma - những công nghệ mới nhất, đảm bảo hiệu năng và khả năng mở rộng.

**3. Bảo mật nghiêm ngặt:**
RBAC, JWT authentication, audit logging, input validation - đảm bảo an toàn dữ liệu và phân quyền chặt chẽ.

**4. Dễ dàng triển khai:**
Serverless-ready, triển khai trên Vercel chỉ với một lệnh, không cần maintain server.

**5. Hỗ trợ đầy đủ:**
Song ngữ Việt - Anh, báo cáo đa dạng, export PDF/CSV, hỗ trợ nhiều phương thức thanh toán.

**Hướng phát triển tương lai:**
- Tích hợp thanh toán online qua VNPay, Momo
- Mobile app cho cư dân
- Tích hợp IoT (đồng hồ điện, nước tự động)
- AI dự đoán công nợ và đề xuất chính sách thu phí
- Tích hợp với hệ thống chính quyền điện tử

---

**Nhóm em xin chân thành cảm ơn quý thầy cô và các bạn đã lắng nghe bài trình bày.**

**Nhóm em rất mong nhận được góp ý, nhận xét từ quý thầy cô để hoàn thiện hệ thống hơn nữa.**

**Xin chân thành cảm ơn!**

---

## PHỤ LỤC: GHI CHÚ TRÌNH BÀY

**1. Thời gian tổng:** 30 phút
**2. Số slide:** 12
**3. Phân bổ thời gian:**
- Mở đầu: 3 phút
- Phân tích yêu cầu: 4 phút
- Công nghệ và kiến trúc: 6 phút
- Thiết kế hệ thống: 6 phút
- Demo chức năng: 8 phút
- Bảo mật và triển khai: 4 phút
- Kết luận: 2 phút
- Dự phòng: 2 phút

**4. Kỹ thuật trình bày:**
- Giữ giọng điệu tự tin, rõ ràng, chuyên nghiệp
- Nhìn vào khán giả, không đọc slide
- Sử dụng con trỏ/chuột để chỉ vào các điểm quan trọng
- Dừng lại để trả lời câu hỏi khi cần
- Có thể bỏ qua một số slide nếu hết thời gian

**5. Chuẩn bị:**
- Test demo trước 30 phút
- Chuẩn bị backup plan (video nếu demo lỗi)
- In sẵn báo cáo cho giảng viên
- Chuẩn bị trả lời câu hỏi về code, database, security

**6. Câu hỏi thường gặp:**
- Q: Tại sao chọn SQLite? A: Đơn giản, không cần server, dễ demo. Production có thể chuyển PostgreSQL.
- Q: Xử lý concurrent payment như thế nào? A: Sử dụng database transaction với optimistic locking.
- Q: Bảo mật JWT như thế nào? A: Short-lived token (15 phút), refresh token, lưu token blacklist.
- Q: Tối ưu performance? A: Database indexing, pagination, caching, lazy loading.
