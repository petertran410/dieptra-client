'use client';

import { useEffect } from 'react';

/**
 * Extracts the original unoptimized image URL from a Next.js image optimizer URL or regular image URL.
 */
function getRawImageUrl(src) {
  if (!src) return null;
  try {
    const parsed = new URL(src, window.location.origin);
    if (parsed.pathname === '/_next/image') {
      const rawUrlParam = parsed.searchParams.get('url');
      if (rawUrlParam) {
        return decodeURIComponent(rawUrlParam);
      }
    }
  } catch (err) {
    // Ignore URL parse error
  }
  return src;
}

export function WebpDownloadProvider({ children }) {
  useEffect(() => {
    const handleContextMenu = (e) => {
      // Find closest img tag if clicked on or within an image container
      const target = e.target;
      const img = target.tagName === 'IMG' ? target : target.querySelector?.('img');

      if (!img) return;

      const currentSrc = img.currentSrc || img.src;
      const rawUrl = getRawImageUrl(currentSrc);

      if (!rawUrl) return;

      // Backup original attributes if not already backed up
      const origSrc = img.getAttribute('data-orig-src') || img.src;
      const origSrcset = img.getAttribute('data-orig-srcset') || img.getAttribute('srcset');

      if (!img.hasAttribute('data-orig-src')) {
        img.setAttribute('data-orig-src', origSrc);
      }
      if (origSrcset && !img.hasAttribute('data-orig-srcset')) {
        img.setAttribute('data-orig-srcset', origSrcset);
      }

      // Temporarily swap to raw WebP URL and remove srcset so native context menu targets the raw file
      img.removeAttribute('srcset');
      img.src = rawUrl;

      // Restore original Next.js optimized AVIF source after context menu has rendered
      setTimeout(() => {
        const savedSrc = img.getAttribute('data-orig-src');
        const savedSrcset = img.getAttribute('data-orig-srcset');

        if (savedSrc) {
          img.src = savedSrc;
          img.removeAttribute('data-orig-src');
        }
        if (savedSrcset) {
          img.setAttribute('srcset', savedSrcset);
          img.removeAttribute('data-orig-srcset');
        }
      }, 2000);
    };

    // Use capture phase so we run before browser context menu is built
    window.addEventListener('contextmenu', handleContextMenu, true);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu, true);
    };
  }, []);

  return children;
}
