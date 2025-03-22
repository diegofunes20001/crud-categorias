import React, { useState, useEffect } from 'react';
import Button from './Button';

const CategoryForm = ({ category, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    image: ''
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        image: category.image || ''
      });
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">URL de Imagen</label>
        <input
          type="url"
          className="form-control"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
        />
      </div>
      <div className="d-flex gap-2">
        <Button type="submit">
          {category ? 'Actualizar' : 'Crear'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;