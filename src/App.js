import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CategoryList from './Components/CategoryList';
import CategoryForm from './Components/CategoryForm';
import Button from './Components/Button';

const API_URL = 'https://api.escuelajs.co/api/v1/categories';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_URL);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCreate = async (categoryData) => {
    try {
      await axios.post(API_URL, categoryData);
      fetchCategories();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleUpdate = async (categoryData) => {
    try {
      await axios.put(`${API_URL}/${selectedCategory.id}`, categoryData);
      fetchCategories();
      setSelectedCategory(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`${API_URL}/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowForm(true);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Gestión de Categorías</h1>
      
      {!showForm && (
        <div className="mb-4">
          <Button onClick={() => setShowForm(true)}><i class="fa-duotone fa-regular fa-plus"/>  Nueva Categoría</Button>
        </div>
      )}

      {showForm ? (
        <CategoryForm
          category={selectedCategory}
          onSubmit={selectedCategory ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowForm(false);
            setSelectedCategory(null);
          }}
        />
      ) : (
        <CategoryList
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}