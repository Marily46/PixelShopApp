import { Product } from '../types/index'

export function Products({products}: { products : Product[] }) {

    
    return (
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {products.map(({ id, title, image, price }) => (
          <li key={id}>
            <img src={image} alt={image} />
            <h2>{title}</h2>
            <strong>{price}</strong>
          </li>
        ))
        }
      </ul>
    )
  }