# ShopMini

Cửa hàng mini bằng React + TypeScript (Vite). State toàn cục: Context API (theme, auth) và Redux Toolkit (products, cart).

## Chạy dự án

```bash
npm install
npm run dev
npm run build
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

## Phân chia dữ liệu: useState / Context API / Redux Toolkit

Nguyên tắc chung: dữ liệu chỉ một component dùng thì để `useState`; dữ liệu nhiều nơi cùng đọc nhưng ít thay đổi và không có logic phức tạp thì dùng Context; dữ liệu nhiều nơi dùng, thay đổi thường xuyên, có logic nghiệp vụ hoặc gọi bất đồng bộ thì dùng Redux Toolkit.

### useState (state cục bộ trong component)

| Dữ liệu                                          | Nơi dùng       | Lý do                                                                                         |
| ------------------------------------------------ | -------------- | --------------------------------------------------------------------------------------------- |
| `keyword` (ô tìm kiếm)                           | `HomePage`     | Chỉ trang chủ cần; rời trang thì không cần giữ lại. Đưa lên global chỉ làm tăng độ phức tạp.  |
| `username`, `password`, `error` (form đăng nhập) | `LoginPage`    | Là dữ liệu tạm của form, chỉ sống trong lúc nhập. Mật khẩu càng không nên lưu ở nơi toàn cục. |
| `ordered` (đã đặt hàng chưa)                     | `CheckoutPage` | Chỉ dùng để hiện thông báo thành công trên trang này.                                         |

### Context API (dữ liệu toàn cục, ít thay đổi)

| Dữ liệu                                   | Nơi dùng                                           | Lý do                                                                                                                                 |
| ----------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `theme`, `toggleTheme` (`ThemeContext`)   | `Header`, và áp dụng cho toàn app qua `data-theme` | Nhiều nơi cần đọc nhưng chỉ là một giá trị `'light' / 'dark'`, đổi hiếm khi, không có logic phức tạp. Context là đủ, không cần Redux. |
| `user`, `login`, `logout` (`AuthContext`) | `Header`, `LoginPage`,                             |
