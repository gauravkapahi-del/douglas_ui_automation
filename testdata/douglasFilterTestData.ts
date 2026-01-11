import dotenv from "dotenv";
import { env } from "process";

dotenv.config({ path: "./.env" });

export const douglasFilterTestData = {
  baseUrl: env.BASE_URL as string,
  perfumeFilter: {
    marke: "adidas",
  },
  nueFilter: {
    marke: "Anny",
  },
  saleFilter: {
    marke: "7days",
  },
};
