"use client";
import { useAppStore } from "@/app/_providers/StoreProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useShallow } from "zustand/shallow";

type Props = {
  category?: string;
};
const ProductCategory: React.FC<Props> = ({ category = "all" }) => {
  const { setFilter, filter } = useAppStore(
    useShallow(({ setFilter, filter }) => ({ setFilter, filter }))
  );


  return (
    <li key={category} className="">
      <Button
        variant={"ghost"}
        onClick={async () => {
          if (category === "all") {
            setFilter("");
          } else {
            setFilter(category);
          }
        }}
        className={cn("capitalize text-lg w-full", (category?.toLocaleLowerCase() === filter.toLowerCase() )&& "bg-white")}
      >
        {category}
      </Button>
    </li>
  );
};

export default ProductCategory;
