// CREATE src/app/san-pham/[...slug]/category-products-wrapper.js

'use client';

import { useState, useEffect, useMemo } from 'react';
import { notFound } from 'next/navigation';
import { API } from '../../../utils/API';

const CategoryProductsWrapper = ({ params }) => {
  const { slug } = params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Client-side state for pagination/sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSort, setCurrentSort] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 15;

  useEffect(() => {
    const fetchData = async () => {
      if (!slug?.length) {
        setError('Invalid category path');
        return;
      }

      setLoading(true);
      try {
        const response = await API.request({
          url: `/api/product/client/by-category-slug/${slug.join(',')}`,
          method: 'GET'
        });

        if (response.success && response.data) {
          setData(response.data);
        } else {
          setError('Category not found');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // Client-side filtering and sorting
  const processedProducts = useMemo(() => {
    if (!data?.products) return [];

    let filtered = data.products;

    // Search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.title?.toLowerCase().includes(searchLower) ||
          product.general_description?.toLowerCase().includes(searchLower)
      );
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (currentSort) {
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        default:
          return 0;
      }
    });

    return sorted;
  }, [data?.products, searchTerm, currentSort]);

  // Client-side pagination
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return processedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [processedProducts, currentPage]);

  const totalPages = Math.ceil(processedProducts.length / PRODUCTS_PER_PAGE);

  if (loading) return <div>Đang tải sản phẩm...</div>;
  if (error || !data) {
    notFound();
    return null;
  }

  // Props for existing ProductList component (if available)
  const productListProps = {
    products: paginatedProducts,
    totalProducts: processedProducts.length,
    totalPages,
    currentPage,
    searchTerm,
    currentSort,
    category: data.category,
    onSearch: setSearchTerm,
    onSort: setCurrentSort,
    onPageChange: setCurrentPage
  };

  // Use existing ProductList component or create simple display
  return (
    <div>
      <h1>{data.category?.name}</h1>
      <p>Total: {processedProducts.length} products</p>

      {/* Search */}
      <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Tìm kiếm sản phẩm..." />

      {/* Sort */}
      <select value={currentSort} onChange={(e) => setCurrentSort(e.target.value)}>
        <option value="newest">Mới nhất</option>
        <option value="oldest">Cũ nhất</option>
        <option value="price-low">Giá thấp → cao</option>
        <option value="price-high">Giá cao → thấp</option>
      </select>

      {/* Products Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {paginatedProducts.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.price ? `${product.price}đ` : 'Liên hệ'}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div>
          <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
            Trước
          </button>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryProductsWrapper;
