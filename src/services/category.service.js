import { API } from '../utils/API';
import { useGetParamsURL } from '../utils/hooks';
import { useQuery } from '@tanstack/react-query';

export const useQueryCategoryList = () => {
  const params = useGetParamsURL();
  const { page: pageNumber = 1, keyword } = params;
  const queryKey = ['GET_CATEGORY_LIST_CLIENT', keyword, pageNumber];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await API.request({
        url: '/api/category/v2/get-all',
        params: { pageNumber, title: keyword }
      });

      return response?.content || [];
    }
  });
};

export const useQueryCategoryListByParent = (parentId) => {
  const queryKey = ['GET_CATEGORY_LIST_BY_PARENT_CLIENT', parentId];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await API.request({
        url: '/api/category/v2/get-all',
        params: { pageNumber: 0, parentId, pageSize: 100 }
      });

      return response?.content || [];
    },
    enabled: typeof parentId !== 'undefined' && !!`${parentId}`.length
  });
};

export const useQueryTopLevelCategories = () => {
  const queryKey = ['GET_TOP_LEVEL_CATEGORIES_FOR_DROPDOWN'];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await API.request({
        url: '/api/category/for-cms',
        method: 'GET'
      });

      const allCategories = response?.data || [];

      const topLevelCategories = allCategories.filter((cat) => !cat.parent_id);

      return topLevelCategories
        .sort((a, b) => (a.priority || 0) - (b.priority || 0) || a.name.localeCompare(b.name))
        .map((cat) => ({
          id: cat.id,
          name: cat.name,
          displayName: cat.displayName || cat.name,
          path: cat.path,
          productCount: cat.productCount || 0
        }));
    },
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000
  });
};

export const useQueryCategoryPaths = (parentCategoryId) => {
  const queryKey = ['GET_CATEGORY_PATHS', parentCategoryId];

  return useQuery({
    queryKey,
    queryFn: async () => {
      if (!parentCategoryId || parentCategoryId === 'all') return [];

      const response = await API.request({
        url: '/api/category/for-cms',
        method: 'GET'
      });

      const allCategories = response?.data || [];

      const parentCategory = allCategories.find((cat) => cat.id.toString() === parentCategoryId.toString());
      if (!parentCategory) return [];

      const relatedCategories = allCategories.filter(
        (cat) => cat.path && parentCategory.path && cat.path.startsWith(parentCategory.path)
      );

      return relatedCategories.map((cat) => cat.id);
    },
    enabled: !!parentCategoryId && parentCategoryId !== 'all',
    staleTime: 10 * 60 * 1000
  });
};

export const useQueryCategoryHierarchy = (parentCategoryId) => {
  const queryKey = ['GET_CATEGORY_HIERARCHY', parentCategoryId];

  return useQuery({
    queryKey,
    queryFn: async () => {
      if (!parentCategoryId || parentCategoryId === 'all') return [];

      const response = await API.request({
        url: '/api/category/for-cms',
        method: 'GET'
      });

      const allCategories = response?.data || [];

      const parentCategory = allCategories.find((cat) => cat.id.toString() === parentCategoryId.toString());
      if (!parentCategory) return [];

      const getChildrenRecursive = (parentId, level = 1) => {
        const children = allCategories.filter(
          (cat) => cat.parent_id && cat.parent_id.toString() === parentId.toString()
        );

        return children.map((child) => ({
          id: child.id,
          name: child.name,
          level: level,
          parent_id: child.parent_id,
          productCount: child.productCount || 0,
          hasChildren: allCategories.some((cat) => cat.parent_id === child.id),
          children: getChildrenRecursive(child.id, level + 1)
        }));
      };

      const hierarchy = {
        id: parentCategory.id,
        name: parentCategory.name,
        level: 0,
        parent_id: parentCategory.parent_id,
        productCount: parentCategory.productCount || 0,
        children: getChildrenRecursive(parentCategory.id)
      };

      return hierarchy;
    },
    enabled: !!parentCategoryId && parentCategoryId !== 'all',
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000
  });
};
