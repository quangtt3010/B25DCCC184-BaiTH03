# ShopMini

Cửa hàng mini bằng React + TypeScript (Vite). State toàn cục: Context API (theme, auth) và Redux Toolkit (products, cart).

## Chạy dự án

```bash
npm install
npm run dev      # chạy dev server
npm run build    # kiểm tra TypeScript + build
```

## Tài khoản đăng nhập giả lập

- Tên đăng nhập: bất kỳ (không để trống)
- Mật khẩu: `123456`

## Tính năng

- Trang: `/`, `/products/:id`, `/cart`, `/login`, `/checkout` (protected), 404
- Trang chủ: lưới responsive 1 / 2 / 4 cột, tìm kiếm theo tên
- Header: số lượng trong giỏ, tên người dùng, đăng xuất, đổi theme sáng/tối
- `/checkout` chưa đăng nhập -> chuyển `/login`, đăng nhập xong quay lại trang trước đó
- "Đặt hàng" xoá giỏ hàng và hiện thông báo thành công
- API: https://fakestoreapi.com/products
