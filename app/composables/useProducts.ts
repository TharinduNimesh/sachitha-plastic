export const useProducts = () => {
  const products = [
    // Raw Materials
    {
      id: 1,
      name: "Eco Storage Container",
      category: "Household",
      description:
        "Durable and eco-friendly storage container perfect for kitchen organization.",
      image: [
        "https://i5.walmartimages.com/asr/e0c64ba9-7217-4a70-9398-98734d1dc240.e3cf75fbdfd334b2b519b2af95eb0909.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
        "https://i5.walmartimages.com/asr/e0c64ba9-7217-4a70-9398-98734d1dc240.e3cf75fbdfd334b2b519b2af95eb0909.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
        "https://i5.walmartimages.com/asr/e0c64ba9-7217-4a70-9398-98734d1dc240.e3cf75fbdfd334b2b519b2af95eb0909.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
      ],
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
      image: [
        "https://image.made-in-china.com/2f0j00NojVhqpdiekm/Durable-Outdoor-Garbage-Container-360L-Rubbish-Big-Size-Industrial-Plastic-Waste-Bin.webp",
        "https://image.made-in-china.com/2f0j00NojVhqpdiekm/Durable-Outdoor-Garbage-Container-360L-Rubbish-Big-Size-Industrial-Plastic-Waste-Bin.webp",
        "https://image.made-in-china.com/2f0j00NojVhqpdiekm/Durable-Outdoor-Garbage-Container-360L-Rubbish-Big-Size-Industrial-Plastic-Waste-Bin.webp",
      ],
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
      image: [
        "https://5.imimg.com/data5/SELLER/Default/2023/9/340776909/ZS/NT/PQ/922856/rectangular-garden-planter-p-24-500x500.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2023/9/340776909/ZS/NT/PQ/922856/rectangular-garden-planter-p-24-500x500.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2023/9/340776909/ZS/NT/PQ/922856/rectangular-garden-planter-p-24-500x500.jpg",
      ],
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
      image: [
        "https://5.imimg.com/data5/SELLER/Default/2023/9/347707470/VD/KJ/VV/27965550/plastic-waste-recycling-machine.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2023/9/347707470/VD/KJ/VV/27965550/plastic-waste-recycling-machine.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2023/9/347707470/VD/KJ/VV/27965550/plastic-waste-recycling-machine.jpg",
      ],
      link: "/products/recycling-machine",
      features: [
        "Efficient recycling",
        "Multiple material compatibility",
        "Energy-efficient",
        "Safety features",
      ],
    },

    // Machinery
    {
      id: 5,
      name: "Storage Box Set",
      category: "Household",
      description: "Stackable storage box set with secure locking mechanism.",
      image: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjxLMTE9gHymaANt4Btb9Ubn_u15SIyo_BSA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjxLMTE9gHymaANt4Btb9Ubn_u15SIyo_BSA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjxLMTE9gHymaANt4Btb9Ubn_u15SIyo_BSA&s",
      ],
      link: "/products/storage-box-set",
      features: [
        "High-capacity shredding",
        "Multiple material compatibility",
        "Energy-efficient",
        "Safety features",
      ],
    },
    {
      id: 6,
      name: "Industrial Pallet",
      category: "Industrial",
      description: "Heavy-duty plastic pallet for warehouse and logistics.",
      image: [
        "https://cdn.webshopapp.com/shops/31781/files/452353570/industrial-plastic-pallet-1200x1000x150-mm-3-runne.jpg",
        "https://cdn.webshopapp.com/shops/31781/files/452353570/industrial-plastic-pallet-1200x1000x150-mm-3-runne.jpg",
        "https://cdn.webshopapp.com/shops/31781/files/452353570/industrial-plastic-pallet-1200x1000x150-mm-3-runne.jpg",
      ],
      link: "/products/industrial-pallet",
      features: [
        "AI-powered sorting",
        "High accuracy",
        "Multiple plastic type detection",
        "Automated process",
      ],
    },
    {
      id: 7,
      name: "Water Tank",
      category: "Industrial",
      description: "Large capacity water storage tank with UV protection.",
      image: [
        "https://onlinestore.anton.lk/front_img/1697609421DSC_8433_1000L_MAX_TANK.JPG",
        "https://onlinestore.anton.lk/front_img/1697609421DSC_8433_1000L_MAX_TANK.JPG",
        "https://onlinestore.anton.lk/front_img/1697609421DSC_8433_1000L_MAX_TANK.JPG",
      ],
      link: "/products/water-tank",
      features: [
        "Precision control",
        "Multiple die configurations",
        "Temperature regulation",
        "Low waste production",
      ],
    },
    {
      id: 8,
      name: "Tool Box",
      category: "Household",
      description: "Multi-compartment tool box with reinforced structure.",
      image: [
        "https://i5.walmartimages.com/seo/Hyper-Tough-16-inch-Toolbox-Plastic-Tool-and-Hardware-Storage-Black_86f427eb-b21b-420b-80a7-6b943ccf8411_2.2bd2520b672ca0330e72bcaa856bad9b.jpeg",
        "https://i5.walmartimages.com/seo/Hyper-Tough-16-inch-Toolbox-Plastic-Tool-and-Hardware-Storage-Black_86f427eb-b21b-420b-80a7-6b943ccf8411_2.2bd2520b672ca0330e72bcaa856bad9b.jpeg",
        "https://i5.walmartimages.com/seo/Hyper-Tough-16-inch-Toolbox-Plastic-Tool-and-Hardware-Storage-Black_86f427eb-b21b-420b-80a7-6b943ccf8411_2.2bd2520b672ca0330e72bcaa856bad9b.jpeg",
      ],
      link: "/products/tool-box",
      features: [
        "Full-line solution",
        "High efficiency",
        "Minimal material loss",
        "Automated operation",
      ],
    },

    // Packaging
    {
      id: 9,
      name: "Eco-Friendly Packaging Rolls",
      category: "Packaging",
      description:
        "Sustainable packaging solutions made from 100% recycled plastic materials.",
      image: [
        "https://ueeshop.ly200-cdn.com/u_file/UPAX/UPAX135/2212/products/11/10e493b4da.jpg",
        "https://ueeshop.ly200-cdn.com/u_file/UPAX/UPAX135/2212/products/11/10e493b4da.jpg",
        "https://ueeshop.ly200-cdn.com/u_file/UPAX/UPAX135/2212/products/11/10e493b4da.jpg",
      ],
      link: "/products/packaging-rolls",
      features: [
        "100% recycled content",
        "Customizable width",
        "Strong and durable",
        "Environmentally certified",
      ],
    },
    {
      id: 10,
      name: "Compostable Plastic Bags",
      category: "Packaging",
      description:
        "Fully compostable plastic bags for environmentally conscious packaging needs.",
      image: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiPae9R79DRDvYziZmJOlit6DE6SYQteQN1Q&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiPae9R79DRDvYziZmJOlit6DE6SYQteQN1Q&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiPae9R79DRDvYziZmJOlit6DE6SYQteQN1Q&s",
      ],
      link: "/products/compostable-bags",
      features: [
        "Fully biodegradable",
        "Food-grade quality",
        "Multiple size options",
        "Quick decomposition",
      ],
    },
    {
      id: 11,
      name: "Industrial Stretch Wrap",
      category: "Packaging",
      description:
        "High-strength recycled plastic stretch wrap for secure industrial packaging.",
      image: [
        "https://d41mw5derfe3u.cloudfront.net/userfiles/images/categories/pac/kag/ing/packaging_and_shipping.stretch_wrap.jpg",
        "https://d41mw5derfe3u.cloudfront.net/userfiles/images/categories/pac/kag/ing/packaging_and_shipping.stretch_wrap.jpg",
        "https://d41mw5derfe3u.cloudfront.net/userfiles/images/categories/pac/kag/ing/packaging_and_shipping.stretch_wrap.jpg",
      ],
      link: "/products/stretch-wrap",
      features: [
        "High tensile strength",
        "Made from recycled materials",
        "Machine and hand wrap",
        "Puncture-resistant",
      ],
    },
    {
      id: 12,
      name: "Custom Plastic Containers",
      category: "Packaging",
      description:
        "Bespoke plastic containers made from recycled materials, tailored to specific requirements.",
      image: [
        "https://g7p8z7i2.rocketcdn.me/wp-content/uploads/2020/02/Custom-Wall-Containers.jpg",
        "https://g7p8z7i2.rocketcdn.me/wp-content/uploads/2020/02/Custom-Wall-Containers.jpg",
        "https://g7p8z7i2.rocketcdn.me/wp-content/uploads/2020/02/Custom-Wall-Containers.jpg",
      ],
      link: "/products/custom-containers",
      features: [
        "Custom design",
        "Recycled material options",
        "Various sizes available",
        "Industry-specific solutions",
      ],
    },
  ];

  const getProductByLink = (slug: string) => {
    const cleanSlug = slug.replace("/products/", "");
    return products.find((p) => p.link.endsWith(cleanSlug));
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  };

  const getSimilarProducts = (category: string, currentProductId: string) => {
    return products.filter(
      (product) =>
        product.category.toLowerCase() === category.toLowerCase() &&
        product.id.toString() !== currentProductId
    );
  };

  return {
    products,
    getProductByLink,
    getProductsByCategory,
    getSimilarProducts,
  };
};
