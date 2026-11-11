import { Link } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  return (
    <article className="card">
      <Link to={`/products/${product.id}`} className="card__image-wrap">
        <img src={product.image} alt={product.title} className="card__image" loading="lazy" />
      </Link>
      <div className="card__body">
        <span className="card__category">{product.category}</span>
        <h3 className="card__title">
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </h3>
        <div className="card__footer">
          <strong className="card__price">${product.price.toFixed(2)}</strong>
          <button type="button" className="btn btn--primary" onClick={() => dispatch(addToCart(product))}>
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </article>
  );
}
