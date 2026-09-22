export type Product = {
  slug: string;
  name: string;
  category: string;
  collection: string;
  price: number;
  description: string;
  image: string;
  detailImage: string;
  colors: string[];
  sizes: string[];
  stock: number;
  material: string;
  fit: string;
  care: string;
  gender: "Women" | "Men" | "Unisex";
  tags: string[];
};

const categories = [
  { category: "Blazers", collection: "Tailoring", base: "Tailored Blazer", price: 48500, query: "fashion blazer" },
  { category: "Shirts", collection: "Essentials", base: "Cotton Shirt", price: 21500, query: "cotton shirt fashion" },
  { category: "Trousers", collection: "Workwear", base: "Structured Trouser", price: 28500, query: "tailored trousers" },
  { category: "Dresses", collection: "Occasion", base: "Column Dress", price: 42000, query: "minimal dress fashion" },
  { category: "Sets", collection: "Weekend", base: "Knit Co-ord Set", price: 39000, query: "knit clothing set" },
  { category: "Denim", collection: "Everyday", base: "Clean Denim", price: 31000, query: "denim jeans fashion" },
  { category: "Outerwear", collection: "Weather Ready", base: "Light Jacket", price: 52000, query: "fashion jacket" },
  { category: "Activewear", collection: "Movement", base: "Performance Set", price: 26500, query: "activewear fashion" },
  { category: "Footwear", collection: "Finish", base: "Leather Sneaker", price: 44500, query: "fashion sneakers" },
  { category: "Accessories", collection: "Details", base: "Everyday Bag", price: 24000, query: "fashion accessories bag" }
];

const colors = [
  ["Black", "Navy", "Ivory"],
  ["White", "Sky", "Olive"],
  ["Charcoal", "Sand", "Burgundy"],
  ["Chocolate", "Cream", "Forest"],
  ["Stone", "Indigo", "Rose"],
  ["Graphite", "Taupe", "Gold"]
];

const sizes = [
  ["XS", "S", "M", "L", "XL"],
  ["S", "M", "L", "XL", "XXL"],
  ["28", "30", "32", "34", "36"],
  ["37", "38", "39", "40", "41", "42", "43", "44"],
  ["One size"]
];

const materials = [
  "Premium cotton blend",
  "Soft viscose knit",
  "Structured twill",
  "Breathable linen blend",
  "Stretch performance jersey",
  "Washed denim",
  "Vegan leather trim",
  "Wool-touch suiting"
];

const fits = ["Relaxed", "Tailored", "Slim", "Straight", "Oversized", "Regular", "Cropped", "Athletic"];
const genders: Product["gender"][] = ["Women", "Men", "Unisex"];
const adjectives = ["Signature", "Studio", "Heritage", "Modern", "Reserve", "Everyday", "Luxe", "City", "Essential", "Limited"];

const clothingImagesByCategory: Record<string, string[]> = {
  Blazers: [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
    "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35"
  ],
  Shirts: [
    "https://images.unsplash.com/photo-1598033129183-c4f50c736f10",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990"
  ],
  Trousers: [
    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1",
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80"
  ],
  Dresses: [
    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
  ],
  Sets: [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
  ],
  Denim: [
    "https://images.unsplash.com/photo-1542272604-787c3835535d",
    "https://images.unsplash.com/photo-1555689502-c4b22d76c56f",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246"
  ],
  Outerwear: [
    "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
    "https://images.unsplash.com/photo-1520975954732-35dd22299614",
    "https://images.unsplash.com/photo-1548883354-94bcfe321cbb"
  ],
  Activewear: [
    "https://images.unsplash.com/photo-1518611012118-696072aa579a",
    "https://images.unsplash.com/photo-1518310383802-640c2de311b2",
    "https://images.unsplash.com/photo-1518459031867-a89b944bffe4"
  ],
  Footwear: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2"
  ],
  Accessories: [
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    "https://images.unsplash.com/photo-1594223274512-ad4803739b7c",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
  ]
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function imageUrl(category: string, index: number, width = 900, height = 1200) {
  const images = clothingImagesByCategory[category] ?? clothingImagesByCategory.Sets;
  const image = images[index % images.length];
  return `${image}?auto=format&fit=crop&w=${width}&h=${height}&q=84&crop=entropy&cs=tinysrgb`;
}

export const products: Product[] = Array.from({ length: 200 }, (_, index) => {
  const category = categories[index % categories.length];
  const adjective = adjectives[index % adjectives.length];
  const sequence = index + 1;
  const name = `${adjective} ${category.base} ${String(sequence).padStart(3, "0")}`;
  const gender = genders[index % genders.length];
  const material = materials[index % materials.length];
  const fit = fits[index % fits.length];
  const price = category.price + (index % 5) * 2500;
  const sizeSet = category.category === "Footwear" ? sizes[3] : category.category === "Accessories" ? sizes[4] : sizes[index % 3];

  return {
    slug: slugify(name),
    name,
    category: category.category,
    collection: category.collection,
    price,
    description: `${fit} ${category.base.toLowerCase()} made in ${material.toLowerCase()} for polished daily wear and easy styling.`,
    image: imageUrl(category.category, sequence),
    detailImage: imageUrl(category.category, sequence + 1, 1200, 1400),
    colors: colors[index % colors.length],
    sizes: sizeSet,
    stock: 8 + (index % 42),
    material,
    fit,
    care: "Cold wash or dry clean as preferred. Do not bleach. Air dry for best finish.",
    gender,
    tags: [gender, category.collection, category.category, fit]
  };
});

export const categoriesList = Array.from(new Set(products.map((product) => product.category)));
