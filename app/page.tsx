import MainLayout from "@/app/_layouts/MainLayout";

// import { getProducts } from "@/lib/actions/products";

import { ProductCategories } from "./home/sections";
import { Button } from "@/components/ui/button";
import Products from "./home/sections/Products";
export default async function Home() {
  // const products = await getProducts();

  // console.log("products ", products);

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row gap-y-4 justify-center items-stretch">
        {/* Categories */}
        <ProductCategories className="w-full md:w-56 lg:w-64 h-full md:min-h-screen" />

        <div className=" w-full flex flex-col items-center gap-4">
          {/* PRODUCTS */}
          {/* <Products products={products} /> */}
          <Products  />

          {/* Load More */}
          <Button variant={"outline"} className="" >
            Load More
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
