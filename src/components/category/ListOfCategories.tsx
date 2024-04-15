type ListOfCategoriesProps = {
  categories: string[];
  onCategorySelected: (category: string) => void;
};

export const ListOfCategories = ({
  categories,
  onCategorySelected,
}: ListOfCategoriesProps) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">Categories</h2>
      <ul className="divide-y divide-gray-200">
        {categories.map((categoryName) => {
          return (
            <li
              key={categoryName}
              className="py-2 text-gray-700 hover:text-gray-900 cursor-pointer hover:bg-gray-100 rounded-md transition duration-150"
              onClick={() => onCategorySelected(categoryName)}
            >
              {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
