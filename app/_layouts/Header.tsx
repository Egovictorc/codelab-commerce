"use client";

import { useShallow } from "zustand/shallow";
import { useCartStore } from "../_providers/StoreProvider";
import { ShoppingCart} from "lucide-react";
import { Avatar, AvatarFallback} from "@/components/ui/avatar";
import Link from "next/link";

const Header = () => {
  const { getSummary } = useCartStore(
    useShallow(({ getSummary, cart }) => ({ getSummary, cart }))
  );

  return (
    <div className="flex flex-row h-24 justify-between w-full items-center  px-4 bg-slate-300">
      {/* Logo */}
      <Link className="text-xl" href="/"> Logo Here</Link>
      <div className="flex flex-row gap-2 items-center relative">
        <Link href="/checkout" className="underline">Checkout</Link>
        <Avatar className="">
          <AvatarFallback>
            <ShoppingCart />
          </AvatarFallback>
        </Avatar>
        <Avatar className="absolute -top-2 -right-2 bg-red-500 h-6 w-6">
          <AvatarFallback className="bg-red-400">
            <span className="text-white text-sm ">{getSummary().noOfItemsInCart}</span>
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Header;
