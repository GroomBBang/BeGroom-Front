export const productSearchPresets = {
  homeNew: {
    sort: 'createdAt',
    direction: 'DESC',
    page: 1,
    size: 6,
    excludeSoldOut: false,
  },

  homePopular: {
    sort: 'wishlistCount',
    direction: 'DESC',
    page: 1,
    size: 12,
    excludeSoldOut: false,
  },

  homeCategoryCommon: {
    sort: 'wishlistCount',
    direction: 'DESC',
    page: 1,
    size: 30,
    excludeSoldOut: false,
  },
};
