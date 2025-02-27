import AddCategory from "@/components/Category/AddCategory";
import EditCategory from "@/components/Category/EditCategory";
import CategoryList from "@/components/Category/CategoriesList";
import { errorToast } from "@/helpers/toastHelper";
import CategoryModel from "@/models/Category/CategoryModel";
import { httpGet } from "@/services/ClientHttpService";
import { useState, useEffect } from "react";

const Categories = () => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);

  const getCategories = async () => {
    const response = await httpGet("/api/category");

    if (response.succeeded == false) {
      errorToast(response);
    } else {
      setCategories(response.data);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const showEditFormHandler = (category: CategoryModel) => {
    setSelectedCategory(category);
    setIsAddMode(false);
    setIsEditMode(true);
  };

  const showAddFormHandler = () => {
    setIsEditMode(false);
    setIsAddMode(true);
  };

  const showListHandler = () => {
    getCategories();
    setIsEditMode(false);
    setIsAddMode(false);
  };

  return (
    <div className="items-center">
      <h1>Categories Management</h1>
      {!isEditMode && !isAddMode && (
        <CategoryList
          categories={categories}
          onEdit={showEditFormHandler}
          onAdd={showAddFormHandler}
        />
      )}
      {isEditMode && (
        <EditCategory
          categories={categories}
          category={selectedCategory}
          onSave={showListHandler}
          onCancel={showListHandler}
        />
      )}
      {isAddMode && (
        <AddCategory
          categories={categories}
          onSave={showListHandler}
          onCancel={showListHandler}
        />
      )}
    </div>
  );
};

export default Categories;
