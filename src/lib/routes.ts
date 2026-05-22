import { Route } from "./types";
import routesData from "@/data/routes.json";

export const routes: Route[] = routesData as Route[];

export function formatVND(price: number): string {
  return price.toLocaleString("vi-VN") + " đ";
}
