import type { ProductCategory } from "../types/product";


export const productCategories: ProductCategory[] = [
  {
    id: "all",
    name: "All",
    filters: [],
  },
  {
    id: "psf",
    name: "PSF",
    filters: [
      {
        key: "denier",
        label: "Denier",
        options: ["1.2D", "1.4D", "3D", "6D"],
      },
      {
        key: "cuttingLength",
        label: "Cutting Length",
        options: [
          "26MM",
          "28MM",
          "32MM",
          "38MM",
          "51MM",
          "64MM",
          "89MM",
          "102MM",
        ],
      },
      {
        key: "color",
        label: "Color",
        options: [
          "Yellow",
          "Green",
          "Blue",
          "White",
          "Lime",
          "Black",
          "Red",
          "Deep Blue",
        ],
      },
    ],
  },

  {
    id: "granuel",
    name: "Granuel",
    filters: [
      {
        key: "color",
        label: "Color",
        options: ["Milk White", "White", "Green", "Deep Green", "Mix", "Black"],
      },
    ],
  },

  {
    id: "non-woven-fabric",
    name: "Non Woven Fabric",
    filters: [],
  },

  {
    id: "non-woven-interlining",
    name: "Non Woven Interlining",
    filters: [],
  },
];
