import { createSelector } from 'reselect'; // used for memoization

const selectCategoryreducer = (state) => state.categories;

export const selectCategories = createSelector(
    [selectCategoryreducer],
    (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
);