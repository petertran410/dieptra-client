export class ProductSlugResolver {
  static cache = new Map();

  static async resolveCategoryPath(slugPath) {
    const cacheKey = slugPath.join('/');
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/category/resolve-path`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slugPath })
      });

      const result = await response.json();
      this.cache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Failed to resolve category path:', error);
      return null;
    }
  }

  static async buildCategoryPath(categoryIds) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/category/build-path`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryIds })
      });

      return await response.json();
    } catch (error) {
      console.error('Failed to build category path:', error);
      return [];
    }
  }
}
