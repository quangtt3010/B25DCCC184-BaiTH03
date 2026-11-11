import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectTotalQuantity } from '../features/cart/cartSlice';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          🛍️ ShopMini
        </Link>

        <nav className="header__nav">
          <Link to="/cart" className="header__cart" aria-label="Giỏ hàng">
            🛒 Giỏ hàng
            <span className="badge">{totalQuantity}</span>
          </Link>

          {user ? (
            <>
              <span className="header__user">👤 {user.username}</span>
              <button type="button" className="btn btn--outline" onClick={handleLogout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn--outline">
              Đăng nhập
            </Link>
          )}

          <button
            type="button"
            className="btn btn--icon"
            onClick={toggleTheme}
            aria-label="Đổi giao diện sáng/tối"
            title={theme === 'light' ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  );
}
