"use client";
import { Button } from "../ui/button";
import { useAppStore } from "@/app/_providers/StoreProvider";
import { useShallow } from "zustand/shallow";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";
import { ProductDef } from "@/lib/definitions";

type Props = {
  product: ProductDef;
  showCTA: boolean;
};

const ProductCTA: React.FC<Props> = ({ product, showCTA }) => {
  const { id } = product;

  const { cart, addProduct, removeProduct } = useAppStore(
    useShallow(({ cart, addProduct, removeProduct }) => ({
      cart,
      addProduct,
      removeProduct,
    }))
  );
  const productInCart = cart.find(({ product }) => product.id === id);

  return (
    <div
      className={cn(
        "flex flex-row px-2 w-full",
        productInCart ? "justify-between" : "justify-center"
      )}
    >
      {!productInCart && (
        <Button
          variant={"outline"}
          className={cn(
            "capitalize transition-all ease-in-out duration-1000",
            showCTA ? "opacity-100" : "opacity-100"
          )}
          onClick={() => addProduct(product)}
        >
          Add to cart
        </Button>
      )}
      {productInCart && (
        <div className="flex flex-row gap-4 justify-center w-full">
          <Button
            variant={"outline"}
            size="icon"
            className={cn(
              "capitalize transition-all ease-in-out duration-1000 text-red-500",
              showCTA ? "opacity-100" : "opacity-100"
            )}
            onClick={() => removeProduct(id)}
          >
            <Minus />
          </Button>

          <span className="text-xl md:text-2xl font-semibold">
            {" "}
            {productInCart.count}{" "}
          </span>
          <Button
            variant={"outline"}
            size="icon"
            className={cn(
              "capitalize transition-all ease-in-out duration-1000",
              showCTA ? "opacity-100" : "opacity-100"
            )}
            onClick={() => addProduct(product)}
          >
            <Plus />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCTA;
