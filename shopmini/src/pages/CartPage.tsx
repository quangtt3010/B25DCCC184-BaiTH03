import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  removeFromCart,
  selectCartItems,
  selectTotalPrice,
  selectTotalQuantity,
  updateQuantity,
} from '../features/cart/cartSlice';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const totalPrice = useAppSelector(selectTotalPrice);

  if (items.length === 0) {
    return (
      <div className="notice">
        <p>Giỏ hàng của bạn đang trống.</p>
        <Link to="/" className="btn btn--primary">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <section>
      <h1>Giỏ hàng</h1>

      <ul className="cart-list">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="cart-item">
            <img src={product.image} alt={product.title} className="cart-item__image" />
            <div className="cart-item__info">
              <Link to={`/products/${product.id}`} className="cart-item__title">
                {product.title}
              </Link>
              <span>${product.price.toFixed(2)}</span>
            </div>
            <div className="qty">
              <button
                type="button"
                className="btn btn--icon"
                aria-label="Giảm số lượng"
                onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }))}
              >
                −
              </button>
              <span className="qty__value">{quantity}</span>
              <button
                type="button"
                className="btn btn--icon"
                aria-label="Tăng số lượng"
                onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }))}
              >
                +
              </button>
            </div>
            <strong className="cart-item__subtotal">${(product.price * quantity).toFixed(2)}</strong>
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => dispatch(removeFromCart(product.id))}
            >
              Xoá
            </button>
          </li>
        ))}
      </ul>

      <div className="summary">
        <p>
          Tổng số lượng: <strong>{totalQuantity}</strong>
        </p>
        <p className="summary__total">
          Tổng tiền: <strong>${totalPrice.toFixed(2)}</strong>
        </p>
        <Link to="/checkout" className="btn btn--primary btn--lg">
          Thanh toán
        </Link>
      </div>
    </section>
  );
}
