
type ListOfCategoriesProps = {
  categories: string[];
  onCategorySelected: (category: string) => void;
};

export const ListOfCategories = ({
  categories,
  onCategorySelected,
}: ListOfCategoriesProps) => {
  return (
    <ul>
      {categories.map((categoryName) => {
        console.log(`category with name: ${categoryName}`);
        return (
          <li key={categoryName} onClick={() => onCategorySelected(categoryName)}>
            {categoryName}
          </li>
        );
      })}
    </ul>
  );
};