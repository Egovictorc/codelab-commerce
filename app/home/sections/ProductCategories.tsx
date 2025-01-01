import { getProductCategories } from "@/lib/actions/products";
import { cn } from "@/lib/utils";

const ProductCategories: React.FC<{className: string}> = async ({ className }) => {
  const categories = await getProductCategories();
  return <ul className={cn(className, "h-full bg-blue-400 flex flex-col gap-2 p-2")}>
    {
        categories.map((category) => (
            <li key={category} className="capitalize text-lg"> {category} </li>
        ))
    }
  </ul>;
};

export default ProductCategories;
