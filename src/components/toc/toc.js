// src/components/toc.js - ENHANCED với clickable & smooth scroll
'use client';

import { useEffect, useState } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

const TableOfContents = ({ html }) => {
  const [tocItems, setTocItems] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!html) return;

    // Parse HTML và extract headings
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

    const items = Array.from(headings).map((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent || heading.innerText || '';
      const id = `heading-${index}`;

      return {
        id,
        text: text.trim(),
        level,
        element: heading
      };
    });

    setTocItems(items);

    // Add IDs to headings trong DOM thật
    setTimeout(() => {
      const realHeadings = document.querySelectorAll(
        '.html-content h1, .html-content h2, .html-content h3, .html-content h4, .html-content h5, .html-content h6'
      );
      items.forEach((item, index) => {
        if (realHeadings[index] && !realHeadings[index].id) {
          realHeadings[index].id = item.id;
        }
      });
    }, 500);
  }, [html]);

  useEffect(() => {
    if (tocItems.length === 0) return;

    const observerOptions = {
      rootMargin: '-20% 0px -35% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all headings
    setTimeout(() => {
      tocItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 1000);

    return () => observer.disconnect();
  }, [tocItems]);

  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Smooth scroll animation
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });

      // Update URL hash without triggering scroll
      const url = new URL(window.location);
      url.hash = id;
      window.history.replaceState({}, '', url);
    }
  };

  const getIndent = (level) => {
    return (level - 1) * 16; // 16px per level
  };

  const getLevelColor = (level, isActive) => {
    if (isActive) return '#065FD4';

    const colors = {
      1: '#2D3748', // Dark gray for H1
      2: '#4A5568', // Medium gray for H2
      3: '#718096', // Light gray for H3
      4: '#A0AEC0', // Lighter gray for H4+
      5: '#A0AEC0',
      6: '#A0AEC0'
    };
    return colors[level] || colors[4];
  };

  const getFontWeight = (level, isActive) => {
    if (isActive) return '600';
    return level <= 2 ? '500' : '400';
  };

  if (!tocItems.length) {
    return (
      <Text fontSize={14} color="gray.500" fontStyle="italic">
        Không có mục lục
      </Text>
    );
  }

  return (
    <VStack align="stretch" spacing={2} mt={3}>
      {tocItems.map((item) => {
        const isActive = activeId === item.id;

        return (
          <Box
            key={item.id}
            pl={`${getIndent(item.level)}px`}
            cursor="pointer"
            transition="all 0.2s ease"
            _hover={{
              color: '#065FD4',
              transform: 'translateX(4px)'
            }}
            onClick={() => handleClick(item.id)}
          >
            <Text
              fontSize={item.level <= 2 ? 14 : 13}
              color={getLevelColor(item.level, isActive)}
              fontWeight={getFontWeight(item.level, isActive)}
              lineHeight="1.4"
              transition="all 0.2s ease"
              _hover={{
                textDecoration: 'underline'
              }}
              sx={{
                // Highlight active item
                ...(isActive && {
                  position: 'relative',
                  _before: {
                    content: '""',
                    position: 'absolute',
                    left: '-8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '3px',
                    height: '16px',
                    backgroundColor: '#065FD4',
                    borderRadius: '2px'
                  }
                })
              }}
            >
              {item.text}
            </Text>
          </Box>
        );
      })}
    </VStack>
  );
};

export default TableOfContents;
