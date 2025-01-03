"use client";
import { useAppStore } from "@/app/_providers/StoreProvider";
import Loading from "@/components/loading/Loading";
import { Button } from "@/components/ui/button";
import { ProductDef } from "@/lib/definitions";
import { getProducts } from "@/lib/utils";
import React, { useState } from "react";
import { useShallow } from "zustand/shallow";

const LoadMoreButton = () => {
  const { updateProducts } = useAppStore(
    useShallow(({ updateProducts }) => ({ updateProducts }))
  );

  const [isFetching, setIsFetching] = useState(false);

  const handleLoadMore = async () => {
    const limit = sessionStorage.getItem("limit");
    console.log("limit ", limit);
    setIsFetching(true);

    let moreProducts: ProductDef[] = [];
    console.log("limit type ", typeof limit);
    if (limit) {
      moreProducts = await getProducts(parseInt(limit) + 5);
    } else {
      moreProducts = await getProducts(10);
    }
    setIsFetching(false);
    updateProducts(moreProducts);
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <Button variant={"outline"} className="" onClick={handleLoadMore}>
      Load More
    </Button>
  );
};

export default LoadMoreButton;
