export const productSearchPresets = {
  homeNew: {
    sort: 'createdAt,desc',
    page: 1,
    size: 6,
    excludeSoldOut: false,
  },

  homePopular: {
    sort: 'wishlistCount,desc',
    page: 1,
    size: 12,
    excludeSoldOut: false,
  },

  homeCategoryCommon: {
    sort: 'wishlistCount,desc',
    page: 1,
    size: 30,
    excludeSoldOut: false,
  },
};
