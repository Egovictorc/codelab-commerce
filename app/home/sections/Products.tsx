"use client";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { useAppStore } from "@/app/_providers/StoreProvider";
import { Product } from "@/components/products";
import Loading from "@/components/loading/Loading";
import { getProducts } from "@/lib/utils";
import LoadMoreButton from "./LoadMoreButton";

// type Props = {
//   products: ProductDef[];
// };

const Products: React.FC = ({}) => {
  const { updateProducts, products, filter } = useAppStore(
    useShallow(({ updateProducts, products, filter }) => ({
      products,
      filter,
      updateProducts,
    }))
  );
  const { enqueueSnackbar } = useSnackbar();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(5),
  });

  const filteredProducts = products.filter(({ category }) => {
    if (filter === "") return true;

    return category?.toLocaleLowerCase() === filter.toLowerCase();
  });
  useEffect(() => {
    if (data) {
      updateProducts(data);
    }
  }, [data, updateProducts]);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    enqueueSnackbar({ variant: "error", message: error.message });
    return <span className="text-red-500">Error: {error.message} </span>;
  }

  // console.log("cart ", cart);
  // console.log("products ", "products");

  // useEffect(() => {
  //   updateProducts(serverProducts)
  // },[serverProducts, updateProducts])
  // useEffect(() => {
  //   async function fetchData() {
  //     const response: AxiosResponse<ProductDef[]> = await axiosInstance.get(
  //       "products"
  //     );

  //     // const response = await axios.get("https://fakestoreapi.com/products/");
  //     // console.log("data ", response.data);
  //     updateProducts(response.data);
  //   }
  //   fetchData();
  // }, [ updateProducts]);

  if (filteredProducts.length < 1) {
    return (
      <p className="grid-col-span-11 w-full text-2xl text-center font-medium mx-aut">
        No product for this category
      </p>
    );
  }
  return (
    <div className=" w-full flex flex-col items-center gap-4">
      <div className="lg:grid-col-span-10 grid sm:grid-cols-12 gap-x-2  gap-y-8  pb-20  font-[family-name:var(--font-geist-sans)] px-4 justify-center md:justify-between w-full">
        {filteredProducts.map(({ id, title, price, image, rating }) => (
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
        ))}
      </div>
      <LoadMoreButton />
    </div>
  );
};

export default Products;
