export const useProducts = () => {
  const products = [
    {
      id: 1,
      name: "Eco Storage Container",
      category: "Household",
      description:
        "Durable and eco-friendly storage container perfect for kitchen organization.",
      image: "/images/products/eco-food-container.webp",
      link: "/products/eco-storage-container",
      features: [
        "BPA-free material",
        "Microwave safe",
        "Airtight seal",
        "Stackable design",
      ],
    },
    {
      id: 2,
      name: "Industrial Waste Bin",
      category: "Industrial",
      description:
        "Heavy-duty waste management solution for industrial applications.",
      image: "/images/products/waste-bin.webp",
      link: "/products/industrial-waste-bin",
      features: [
        "Durable construction",
        "Large capacity",
        "Easy to clean",
        "Resistant to chemicals",
      ],
    },
    {
      id: 3,
      name: "Garden Planter",
      category: "Garden",
      description: "Modern design planter with built-in drainage system.",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2023/9/340776909/ZS/NT/PQ/922856/rectangular-garden-planter-p-24-500x500.jpg",
      link: "/products/garden-planter",
      features: [
        "Weather-resistant",
        "Lightweight",
        "UV protected",
        "Built-in drainage",
      ],
    },
    {
      id: 4,
      name: "Recycling Machine",
      category: "Machinery",
      description:
        "High-efficiency plastic recycling machine for industrial use.",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2023/9/347707470/VD/KJ/VV/27965550/plastic-waste-recycling-machine.jpg",
      link: "/products/recycling-machine",
      features: [
        "High efficiency",
        "Low energy consumption",
        "Easy to operate",
        "Durable",
      ],
    },
    {
      id: 5,
      name: "Storage Box Set",
      category: "Household",
      description: "Stackable storage box set with secure locking mechanism.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjxLMTE9gHymaANt4Btb9Ubn_u15SIyo_BSA&s",
      link: "/products/storage-box-set",
      features: [
        "Secure locking",
        "Stackable",
        "Durable plastic",
        "Transparent design",
      ],
    },
    {
      id: 6,
      name: "Industrial Pallet",
      category: "Industrial",
      description: "Heavy-duty plastic pallet for warehouse and logistics.",
      image:
        "https://cdn.webshopapp.com/shops/31781/files/452353570/industrial-plastic-pallet-1200x1000x150-mm-3-runne.jpg",
      link: "/products/industrial-pallet",
      features: [
        "Heavy-duty",
        "Non-slip surface",
        "Weather-resistant",
        "Recyclable",
      ],
    },
    {
      id: 7,
      name: "Water Tank",
      category: "Industrial",
      description: "Large capacity water storage tank with UV protection.",
      image:
        "https://onlinestore.anton.lk/front_img/1697609421DSC_8433_1000L_MAX_TANK.JPG",
      link: "/products/water-tank",
      features: [
        "UV protection",
        "Large capacity",
        "Durable",
        "Easy to install",
      ],
    },
    {
      id: 8,
      name: "Tool Box",
      category: "Household",
      description: "Multi-compartment tool box with reinforced structure.",
      image:
        "https://i5.walmartimages.com/seo/Hyper-Tough-16-inch-Toolbox-Plastic-Tool-and-Hardware-Storage-Black_86f427eb-b21b-420b-80a7-6b943ccf8411_2.2bd2520b672ca0330e72bcaa856bad9b.jpeg",
      link: "/products/tool-box",
      features: [
        "Reinforced structure",
        "Multiple compartments",
        "Portable",
        "Durable",
      ],
    },
  ];

  const getProductByLink = (slug: string) => {
    const cleanSlug = slug.replace("/products/", "");
    return products.find((p) => p.link.endsWith(cleanSlug));
  };

  return {
    products,
    getProductByLink,
  };
};
