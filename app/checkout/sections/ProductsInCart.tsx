"use client";
import { useAppStore } from "@/app/_providers/StoreProvider";
import { Product } from "@/components/products";
import { v4 as uuidv4 } from "uuid";
import { useShallow } from "zustand/shallow";

const ProductsInCart = () => {
  const { cart } = useAppStore(useShallow(({ cart }) => ({ cart })));

  return (
    <div className=" lg:grid-col-span-10 grid sm:grid-cols-12 gap-x-2  gap-y-8  pb-20  font-[family-name:var(--font-geist-sans)] px-4 justify-center md:justify-between w-full">
      {cart.map(
        ({ product: { id, title, price, category, image, rating } }) => (
          <Product
            key={uuidv4()}
            id={id}
            category={category}
            price={price}
            // description={description}
            title={title}
            image={image}
            rating={rating}
          />
        )
      )}
    </div>
  );
};

export default ProductsInCart;
