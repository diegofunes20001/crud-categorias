import React from 'react';
import Button from './Button';

const CategoryList = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="row g-4">
      {categories.map(category => (
        <div key={category.id} className="col-sm-6 col-lg-4">
          <div className="card category-card h-100">
            <img src={category.image} className="card-img-top" alt={category.name} />
            <div className="card-body">
              <h5 className="card-title">{category.name}</h5>
              <div className="d-flex gap-2">
                <Button variant="warning" onClick={() => onEdit(category)}><i className="fa-duotone fa-regular fa-pen-to-square"/> Editar</Button>
                <Button variant="danger" onClick={() => onDelete(category.id)}><i className="fa-duotone fa-solid fa-trash"/> Eliminar</Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;