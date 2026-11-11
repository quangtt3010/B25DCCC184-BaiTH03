import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((s) => s.products);

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const product = items.find((p) => String(p.id) === id);

  if (status === 'idle' || status === 'loading') {
    return <p className="notice">Đang tải sản phẩm...</p>;
  }

  if (status === 'failed') {
    return (
      <div className="notice notice--error">
        <p>Không thể tải sản phẩm.</p>
        <button type="button" className="btn btn--primary" onClick={() => void dispatch(fetchProducts())}>
          Thử lại
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="notice">
        <p>Không tìm thấy sản phẩm.</p>
        <Link to="/" className="btn btn--primary">
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <section>
      <Link to="/" className="back-link">
        ← Quay lại
      </Link>
      <div className="detail">
        <div className="detail__image-wrap">
          <img src={product.image} alt={product.title} className="detail__image" />
        </div>
        <div className="detail__info">
          <span className="card__category">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="detail__price">${product.price.toFixed(2)}</p>
          <p className="detail__desc">{product.description}</p>
          <button type="button" className="btn btn--primary btn--lg" onClick={() => dispatch(addToCart(product))}>
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </section>
  );
}
