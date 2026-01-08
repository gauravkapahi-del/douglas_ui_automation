import dotenv from "dotenv";

dotenv.config({ path: "./execution_base.env" });

export const douglasFilterTestData = {
  baseUrl: process.env.BASE_URL || "",
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
