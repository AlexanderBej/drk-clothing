import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import { setCategories } from "../../store/categories/categories.slice.js";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.jsx";

const Shop = () => {
  const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments();
            dispatch(setCategories(categoriesArray));
        }
        getCategoriesMap();
    }, [dispatch])

    return (
       <Routes>
        <Route index element={<CategoriesPreview />} />
        <Route path=":category" element={<Category />} />

       </Routes>
    )
}

export default Shop;