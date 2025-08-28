'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { API } from '../../../utils/API';

const ProductDetailWrapper = ({ params }) => {
  const { productSlug } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productSlug) return;

      setLoading(true);
      try {
        const response = await API.request({
          url: `/api/product/client/find-by-slug/${productSlug}`,
          method: 'GET'
        });

        if (response) {
          setProduct(response);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productSlug]);

  if (loading) return <div>Đang tải thông tin sản phẩm...</div>;
  if (error || !product) {
    notFound();
    return null;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>Giá: {product.price ? `${product.price}đ` : 'Liên hệ'}</p>
      <p>{product.general_description}</p>
      {product.imagesUrl?.length > 0 && (
        <img src={product.imagesUrl[0]} alt={product.title} style={{ maxWidth: '400px' }} />
      )}
      <div dangerouslySetInnerHTML={{ __html: product.description }} />
    </div>
  );
};

export default ProductDetailWrapper;
