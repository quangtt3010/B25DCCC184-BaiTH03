import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.products);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) => p.title.toLowerCase().includes(q));
  }, [items, keyword]);

  return (
    <section>
      <h1>Sản phẩm</h1>

      <input
        type="search"
        className="input search"
        placeholder="Tìm kiếm sản phẩm theo tên..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {status === 'loading' && <p className="notice">Đang tải sản phẩm...</p>}

      {status === 'failed' && (
        <div className="notice notice--error">
          <p>Không thể tải sản phẩm: {error}</p>
          <button type="button" className="btn btn--primary" onClick={() => void dispatch(fetchProducts())}>
            Thử lại
          </button>
        </div>
      )}

      {status === 'succeeded' && filtered.length === 0 && (
        <p className="notice">Không tìm thấy sản phẩm phù hợp.</p>
      )}

      <div className="grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
