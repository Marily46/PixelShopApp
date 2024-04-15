import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../../services";
import { Product } from "../../types";

export const ProductsByCategory = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (category) {
      getProductsByCategory(category).then((products) => setProducts(products));
    }
  }, [category]);

  return (
    <div>
      <h2>Products by category: {category}</h2>
      <ul>
        {products.map(({ id, title, price, image }) => (
          <li key={id}>
            <span>{title}</span>
            <span>{price}</span>
            <img src={image} alt={title} />
          </li>
        ))}
      </ul>
    </div>
  );
};
