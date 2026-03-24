# BTC Owner Portal - preserve nguyên bản UI/function

Bộ này được dựng lại theo hướng:
- giữ nguyên giao diện gốc trong các module từ file DOCX
- không redesign
- không gom thành app shell mới
- chỉ nối điều hướng bằng hash route để menu bấm được và có thể share dễ qua GitHub Pages

## Mở local nhanh
- mở file `index.html`
- hoặc chạy local server rồi mở `index.html`

Ví dụ:
```bash
python -m http.server 8080
```

## Route đang có
- `#/login`
- `#/packages`
- `#/dashboard`
- `#/account`
- `#/properties`
- `#/request_action`
- `#/track_request`
- `#/reports`
- `#/orders`
- `#/notifications`
- `#/manage_posts`
- `#/manage_appointments`

## Ghi chú
- Đây là bản preserve UI/function từ các module gốc, có thêm điều hướng giữa các module để xem full bộ giao diện.
- Một số nút trong code gốc vốn chỉ là mock UI thì vẫn giữ nguyên tính chất mock.
