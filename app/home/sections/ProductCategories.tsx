import { getProductCategories } from "@/lib/actions/products";
import { cn,} from "@/lib/utils";
import ProductCategory from "./ProductCategory";

const ProductCategories: React.FC<{ className: string }> = async ({
  className,
}) => {

  const categories = await getProductCategories();
  return (
    <ul className={cn(className, "h-full bg-red-400 flex flex-col gap-2 p-2")}>
      <ProductCategory  />
      {categories.map((category) => (
      <ProductCategory category={category} key={category}  />
      ))}
    </ul>
  );
};

export default ProductCategories;
