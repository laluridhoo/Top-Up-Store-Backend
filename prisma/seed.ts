import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Create or get Mobile Legends game
  const mobileLegends = await prisma.game.upsert({
    where: { slug: "mobile-legends" },
    update: {},
    create: {
      name: "Mobile Legends",
      slug: "mobile-legends",
      publisher: "Moonton",
    },
  });

  console.log("✅ Game created/found:", mobileLegends.name);

  // Check if product already exists
  const existingProduct = await prisma.product.findFirst({
    where: {
      name: "86 Diamonds",
      gameId: mobileLegends.id,
    },
  });

  // Create product: 86 Diamonds if it doesn't exist
  if (!existingProduct) {
    const product86Diamonds = await prisma.product.create({
      data: {
        name: "86 Diamonds",
        price: 20000, // Example price in IDR (adjust as needed)
        gameId: mobileLegends.id,
      },
    });
    console.log("✅ Product created:", product86Diamonds.name);
  } else {
    console.log("✅ Product already exists:", existingProduct.name);
  }

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
