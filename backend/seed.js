require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const products = [
  {
    name: "Elegant Necklace 1",
    baseMultiplier: 1.05,
    images: {
      gold: "https://nivara.diamonds/cdn/shop/files/CAD-013_4.png?v=1734358243&width=3000",
      silver: "https://nivara.diamonds/cdn/shop/files/CAD-013_2.png?v=1734358243&width=3000",
      rose: "https://nivara.diamonds/cdn/shop/files/CAD-013_3.png?v=1734358243&width=3000"
    }
  },
  {
    name: "Elegant Necklace 2",
    baseMultiplier: 1.1,
    images: {
      gold: "https://nivara.diamonds/cdn/shop/files/CAD-093_5.png?v=1734503059&width=3000",
      silver: "https://nivara.diamonds/cdn/shop/files/CAD-093_4.png?v=1734358515&width=3000",
      rose: "https://nivara.diamonds/cdn/shop/files/CAD-093_3.png?v=1734358515&width=3000"
    }
  },
  {
    name: "Elegant Necklace 3",
    baseMultiplier: 1.15,
    images: {
      gold: "https://nivara.diamonds/cdn/shop/files/CAD-027_18.png?v=1734349603&width=3000",
      silver: "https://nivara.diamonds/cdn/shop/files/CAD-027_20.png?v=1734349603&width=3000",
      rose: "https://nivara.diamonds/cdn/shop/files/CAD-027_19.png?v=1734349603&width=3000"
    }
  },
  {
    name: "Elegant Necklace 4",
    baseMultiplier: 1.2,
    images: {
      gold: "https://nivara.diamonds/cdn/shop/files/KJ00805R.MQ-2_-YG.jpg?v=1724589651&width=3000",
      silver: "https://nivara.diamonds/cdn/shop/files/KJ00805R.MQ-2_-WG.jpg?v=1724589650&width=3000",
      rose: "https://nivara.diamonds/cdn/shop/files/KJ00805R.MQ-2_-RG.jpg?v=1724589650&width=3000"
    }
  },
  {
    name: "Elegant Necklace 5",
    baseMultiplier: 1.25,
    images: {
      gold: "https://nivara.diamonds/cdn/shop/files/KJ00829R.OV-2.jpg?v=1734349499&width=3000",
      silver: "https://nivara.diamonds/cdn/shop/files/KJ00829R.OV-2_-Rev-OD_3D_WHITE_1.jpg?v=1734349252&width=3000",
      rose: "https://nivara.diamonds/cdn/shop/files/KJ00829R.OV-2_-Rev-OD_3D_WHITE_2.jpg?v=1734349252&width=3000"
    }
  },
  {
    name: "Elegant Necklace 6",
    baseMultiplier: 1.3,
    images: {
      gold: "https://nivara.diamonds/cdn/shop/files/RR-019_3.png?v=1736159852&width=3000",
      silver: "https://nivara.diamonds/cdn/shop/files/RR-019_1.png?v=1736159852&width=3000",
      rose: "https://nivara.diamonds/cdn/shop/files/RR-019_2.png?v=1736159852&width=3000"
    }
  },
  {
    name: "Elegant Necklace 7",
    baseMultiplier: 1.35,
    images: {
      gold: "https://nivara.diamonds/cdn/shop/files/KJ00998R.PS-3_-Top-yg.jpg?v=1734348839&width=3000",
      silver: "https://nivara.diamonds/cdn/shop/files/KJ00998R.PS-3_-Top-wg.jpg?v=1737120399&width=3000",
      rose: "https://nivara.diamonds/cdn/shop/files/KJ00998R.PS-3_-Top-rg_cfdc3b56-67e4-4be1-80af-43bf48e6215a.jpg?v=1724590316&width=300"
    }
  },
  {
    name: "Elegant Necklace 8",
    baseMultiplier: 1.4,
    images: {
      gold: "https://nivara.diamonds/cdn/shop/files/KJ00931R6.PS-1.25_200_cts_-SD_TOP_YELLOW.jpg?v=1724590274&width=3000",
      silver: "https://nivara.diamonds/cdn/shop/files/KJ00931R6.PS-1.25_200_cts_-SD_TOP_WHITE.jpg?v=1734606238&width=3000",
      rose: "https://nivara.diamonds/cdn/shop/files/KJ00931R6.PS-1.25_200_cts_-SD_TOP_ROSE.jpg?v=1734606238&width=3000"
    }
  },
  {
    name: "Elegant Necklace 9",
    baseMultiplier: 1.45,
    images: {
      gold: "https://nivara.diamonds/cdn/shop/files/RR-007_13.png?v=1735910961&width=3000",
      silver: "https://nivara.diamonds/cdn/shop/files/RR-007_11.png?v=1735910961&width=3000",
      rose: "https://nivara.diamonds/cdn/shop/files/RR-007_7.png?v=1735910961&width=3000"
    }
  },
  {
    name: "Elegant Necklace 10",
    baseMultiplier: 1.5,
    images: {
      gold: "https://nivara.diamonds/cdn/shop/files/CAD-026_28.png?v=1734350040&width=3000",
      silver: "https://nivara.diamonds/cdn/shop/files/CAD-026_26.png?v=1734350040&width=3000",
      rose: "https://nivara.diamonds/cdn/shop/files/CAD-026_27.png?v=1734350040&width=3000"
    }
  },
  // Products 11–20: Repeat similar pattern or slightly change URLs for demo
  {
    name: "Elegant Necklace 11",
    baseMultiplier: 1.55,
    images: {
      gold: "https://nivara.diamonds/cdn/shop/files/RR-001_12.png?v=1735905922&width=3000",
      silver: "https://nivara.diamonds/cdn/shop/files/RR-001_10.png?v=1735905922&width=3000",
      rose: "https://nivara.diamonds/cdn/shop/files/RR-001_11.png?v=1735905922&width=3000"
    }
  },
  {
    name: "Elegant Necklace 12",
    baseMultiplier: 1.6,
    images: {
      gold: "https://nivara.diamonds/cdn/shop/files/LR_Aria_2_YG_Front_2d29da76-8876-47dc-94fd-fee979744ae9.png?v=1734355238&width=3000",
      silver: "https://nivara.diamonds/cdn/shop/files/LR_Aria_2_WG_Front_67409903-a186-44f1-9773-5edb223de6d3.png?v=1716495885&width=3000",
      rose: "https://nivara.diamonds/cdn/shop/files/LR_Aria_2_RG_Front_a3b11dab-4a4e-4863-9ca2-6870afac7de8.png?v=1734355238&width=3000"
    }
  },
  {
    name: "Elegant Necklace 13",
    baseMultiplier: 1.65,
    images: {
      gold: "https://nivara.diamonds/cdn/shop/files/RR-002_9.png?v=1735908616&width=3000",
      silver: "https://nivara.diamonds/cdn/shop/files/RR-002_7.png?v=1735908616&width=3000",
      rose: "https://nivara.diamonds/cdn/shop/files/RR-002_8.png?v=1735908616&width=3000"
    }
  },
  {
    name: "Elegant Necklace 14",
    baseMultiplier: 1.7,
    images: {
      gold: "https://nivara.diamonds/cdn/shop/files/Rhea_1Round_YG_Main.png?v=1716731155&width=3000",
      silver: "https://nivara.diamonds/cdn/shop/files/Rhea_1Round_WG_Main.png?v=1734355656&width=3000",
      rose: "https://nivara.diamonds/cdn/shop/files/Rhea_1Round_RG_Main.png?v=1734355656&width=3000"
    }
  },
  {
    name: "Elegant Necklace 15",
    baseMultiplier: 1.75,
    images: {
      gold: "https://nivara.diamonds/cdn/shop/files/CAD-283_2.png?v=1734355762&width=3000",
      silver: "https://nivara.diamonds/cdn/shop/files/CAD-283_1.png?v=1734355762&width=3000",
      rose: "https://nivara.diamonds/cdn/shop/files/CAD-283_3.png?v=1734355762&width=3000"
    }
  },
  {
    name: "Elegant Necklace 16",
    baseMultiplier: 1.8,
    images: {
      gold: "https://nivara.diamonds/cdn/shop/files/CAD-274CAD-274_4_f0e5718c-43c7-4552-b6ef-9a78bb298123.png?v=1732188163&width=3000",
      silver: "https://nivara.diamonds/cdn/shop/files/CAD-274CAD-274_1_f1f2c3dd-49cf-49de-b720-67ec7c113c8b.png?v=1734356470&width=3000",
      rose: "https://nivara.diamonds/cdn/shop/files/CAD-274CAD-274_6_3fa1827b-de0d-44b5-ace7-d1f60ea332a9.png?v=1734356470&width=3000"
    }
  },
  {
    name: "Elegant Necklace 17",
    baseMultiplier: 1.85,
    images: {
      gold: "https://nivara.diamonds/cdn/shop/files/RR-014_12.png?v=1735989936&width=3000",
      silver: "https://nivara.diamonds/cdn/shop/files/RR-014_8.png?v=1735989936&width=3000",
      rose: "https://nivara.diamonds/cdn/shop/files/RR-014_6.png?v=1735989936&width=3000"
    }
  },
  {
    name: "Elegant Necklace 18",
    baseMultiplier: 1.9,
    images: {
      gold: "https://nivara.diamonds/cdn/shop/files/RR-016_10.png?v=1735993970&width=3000",
      silver: "https://nivara.diamonds/cdn/shop/files/RR-016_11.png?v=1735993972&width=3000",
      rose: "https://nivara.diamonds/cdn/shop/files/RR-016_9.png?v=1735993970&width=3000"
    }
  },
  {
    name: "Elegant Necklace 19",
    baseMultiplier: 1.95,
    images: {
      gold: "https://nivara.diamonds/cdn/shop/files/KJ00951R.OV-2_-YELLOW_TOP.png?v=1724590250&width=3000",
      silver: "https://nivara.diamonds/cdn/shop/files/KJ00951R.OV-2_-WHITE_D.png?v=1724590250&width=3000",
      rose: "https://nivara.diamonds/cdn/shop/files/KJ00951R.OV-2_-ROSE_3D.png?v=1724590250&width=3000"
    }
  },
  {
    name: "Elegant Necklace 20",
    baseMultiplier: 2.0,
    images: {
      gold: "https://nivara.diamonds/cdn/shop/files/005_6.png?v=1734357544&width=3000",
      silver: "https://nivara.diamonds/cdn/shop/files/005_10.png?v=1734357544&width=3000",
      rose: "https://nivara.diamonds/cdn/shop/files/RealCLoth2.0_DemoScene.21224.png?v=1734357544&width=3000"
    }
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MongoDB URI is missing from environment variables');
    }

    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert new products
    const result = await Product.insertMany(products);
    console.log(`🌱 Successfully seeded ${result.length} products`);

    // Display the inserted products
    console.log('\n📦 Inserted Products:');
    result.forEach(product => {
      console.log(`   - ${product.name} (Multiplier: ${product.baseMultiplier})`);
    });

    console.log('\n🎉 Database seeding completed!');
    
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('🔗 Database connection closed');
  }
}

// Run the seed function
seedDatabase();