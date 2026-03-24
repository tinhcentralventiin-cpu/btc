
# BTC Owner Portal Integrated

Bản này đã refactor lại từ bộ module rời rạc thành **1 app owner portal hoàn chỉnh**:

- 1 layout dark duy nhất
- 1 sidebar/menu duy nhất
- Toàn bộ module nằm trong cùng app shell
- Menu trái điều hướng được
- Đã bỏ phần module selector cũ
- Đã gom các modal và logic dùng chung

## Chạy nhanh

```bash
npm install
npm run dev
```

## Ghi chú

- App mặc định vào thẳng giao diện portal dark để tiện test.
- Logout sẽ quay về flow đăng nhập/đăng ký.
- Dữ liệu hiện tại là mock data để trình bày đầy đủ flow UI/UX.
