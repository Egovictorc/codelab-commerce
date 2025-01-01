import axios from "axios";
import numeral from "numeral";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ProductDef } from "./definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const axiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_DB_HOST,
  baseURL: "https://fakestoreapi.com/",
  // baseURL: process.env.DB_HOST,
  // timeout: 1000,
  timeout: 50000,
});


export function formatCurrency(value: number, currency: string) {
  return  numeral(1234567.89).format( `${currency}${value},0.00`);
  // return  numeral(1234567.89).format('$0,0.00');
}


export async function getProducts(): Promise<ProductDef[]> {
  // const response = await axiosInstance.get("products/categories")
  const response = await axiosInstance.get("products")
  console.log("data ", response.data);
  return response.data;
  // return new Promise((resolve) => resolve(localProducts))
}

// export const getProducts = cache(_getProducts);