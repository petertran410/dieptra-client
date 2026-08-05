'use client';

import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

/**
 * HtmlContent
 * Render HTML string (dangerouslySetInnerHTML) và tự bọc mỗi <table> bằng
 * một wrapper cuộn ngang (.html-table-scroll) trên mobile.
 *
 * Lý do cần JS wrapper: table render từ HTML string không có phần tử cha để
 * gắn overflow-x. CSS thuần không ép được table display:block co lại nhỏ hơn
 * min-content của tbody (đã kiểm chứng), nên phải chèn <div> wrapper thật.
 *
 * Wrapper còn cập nhật class has-left-overflow / has-right-overflow để CSS
 * hiển thị gradient báo hiệu còn nội dung bị ẩn.
 */
const HtmlContent = ({ html, className = '', ...boxProps }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cleanups = [];

    container.querySelectorAll('table').forEach((table) => {
      let scroll = table.parentElement;

      if (!scroll || !scroll.classList.contains('html-table-scroll')) {
        scroll = document.createElement('div');
        scroll.className = 'html-table-scroll';
        scroll.setAttribute('role', 'region');
        table.parentNode.insertBefore(scroll, table);
        scroll.appendChild(table);
      }

      // Đếm số cột lớn nhất (tính cả colspan). Chỉ bảng >= 3 cột mới cho cuộn ngang;
      // bảng <= 2 cột luôn wrap gọn trong màn hình.
      const columnCount = Array.from(table.rows).reduce((max, row) => {
        const cols = Array.from(row.cells).reduce((sum, cell) => sum + (cell.colSpan || 1), 0);
        return Math.max(max, cols);
      }, 0);
      const isMultiCol = columnCount >= 3;
      scroll.classList.toggle('is-multi-col', isMultiCol);
      table.style.setProperty('--html-table-column-count', columnCount);

      const update = () => {
        const canScroll = isMultiCol && scroll.scrollWidth > scroll.clientWidth + 1;
        const atStart = scroll.scrollLeft <= 1;
        const atEnd = scroll.scrollLeft + scroll.clientWidth >= scroll.scrollWidth - 1;

        scroll.classList.toggle('has-left-overflow', canScroll && !atStart);
        scroll.classList.toggle('has-right-overflow', canScroll && !atEnd);
        scroll.setAttribute('tabindex', canScroll ? '0' : '-1');
        scroll.setAttribute('aria-label', canScroll ? 'Bảng dữ liệu, vuốt ngang để xem thêm' : 'Bảng dữ liệu');
      };

      scroll.addEventListener('scroll', update, { passive: true });
      const entry = { scroll, update, observer: null };

      if (typeof ResizeObserver !== 'undefined') {
        entry.observer = new ResizeObserver(update);
        entry.observer.observe(scroll);
        entry.observer.observe(table);
      }

      update();
      cleanups.push(entry);
    });

    return () => {
      cleanups.forEach(({ scroll, update, observer }) => {
        scroll.removeEventListener('scroll', update);
        observer?.disconnect();
      });
    };
  }, [html]);

  return (
    <Box
      ref={containerRef}
      className={`html-content ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: html }}
      {...boxProps}
    />
  );
};

export default HtmlContent;
