"use client";
import { useCartStore } from "@/app/_providers/StoreProvider";
import { v4 as uuidv4 } from "uuid";
import { Product } from "@/components/products";
import { ProductDef } from "@/lib/definitions";
import {  useEffect } from "react";
import { axiosInstance, } from "@/lib/utils";
import  { AxiosResponse } from "axios";
import { useShallow } from "zustand/shallow";

// type Props = {
//   products: ProductDef[];
// };
const Products: React.FC = ({}) => {
  const { updateProducts, products } = useCartStore(useShallow(({updateProducts, products}) => ({products,  updateProducts})));


  // console.log("cart ", cart);
  console.log("products ", "products");

  // useEffect(() => {
  //   updateProducts(serverProducts)
  // },[serverProducts, updateProducts])
  useEffect(() => {
    async function fetchData() {
      const response: AxiosResponse<ProductDef[]>  = await axiosInstance.get("products");

      // const response = await axios.get("https://fakestoreapi.com/products/");
      console.log("data ", response.data);
      updateProducts(response.data);
    }
    fetchData();
  }, [updateProducts]);

  return (
    <div className="bg-yellow-400 lg:grid-col-span-10 grid sm:grid-cols-12 gap-x-2  gap-y-8  pb-20  font-[family-name:var(--font-geist-sans)] px-4 justify-center md:justify-between w-full">
      {products.map(
          ({ id, title, price, image, rating }) => (
            <Product
              key={uuidv4()}
              id={id}
              // category={category}
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

export default Products;
