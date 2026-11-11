import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearCart, selectCartItems, selectTotalPrice } from '../features/cart/cartSlice';
import { useAuth } from '../contexts/AuthContext';

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    dispatch(clearCart());
    setOrdered(true);
  };

  if (ordered) {
    return (
      <div className="notice notice--success">
        <h2>🎉 Đặt hàng thành công!</h2>
        <p>Cảm ơn {user?.username}, đơn hàng của bạn đã được ghi nhận.</p>
        <Link to="/" className="btn btn--primary">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="notice">
        <p>Giỏ hàng trống, không có gì để thanh toán.</p>
        <Link to="/" className="btn btn--primary">
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <section>
      <h1>Thanh toán</h1>
      <p>
        Người đặt: <strong>{user?.username}</strong>
      </p>

      <ul className="cart-list">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="cart-item cart-item--compact">
            <img src={product.image} alt={product.title} className="cart-item__image" />
            <div className="cart-item__info">
              <span className="cart-item__title">{product.title}</span>
              <span>
                ${product.price.toFixed(2)} × {quantity}
              </span>
            </div>
            <strong className="cart-item__subtotal">${(product.price * quantity).toFixed(2)}</strong>
          </li>
        ))}
      </ul>

      <div className="summary">
        <p className="summary__total">
          Tổng tiền: <strong>${totalPrice.toFixed(2)}</strong>
        </p>
        <button type="button" className="btn btn--primary btn--lg" onClick={handleOrder}>
          Đặt hàng
        </button>
      </div>
    </section>
  );
}
