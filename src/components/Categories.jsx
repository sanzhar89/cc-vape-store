import React from 'react';

function Categories({ value, onChangeCategory }) {
  const categories = [
    'Все',
    'Новинки',
    'Ягодные',
    'Фруктовые',
    'Ароматика',
    'Скоро',
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)}
            className={value === i ? 'active' : ''}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
