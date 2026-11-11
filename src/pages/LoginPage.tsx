import { useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface LocationState {
  from?: string;
}

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState | null)?.from ?? '/';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ok = login(username, password);
    if (ok) {
      navigate(from, { replace: true });
    } else {
      setError('Sai tên đăng nhập hoặc mật khẩu (mật khẩu đúng: 123456).');
    }
  };

  return (
    <section className="form-card">
      <h1>Đăng nhập</h1>
      {from !== '/' && <p className="notice">Vui lòng đăng nhập để tiếp tục.</p>}
      <form onSubmit={handleSubmit} className="form">
        <label>
          Tên đăng nhập
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </label>
        <label>
          Mật khẩu
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="btn btn--primary btn--lg">
          Đăng nhập
        </button>
      </form>
    </section>
  );
}
