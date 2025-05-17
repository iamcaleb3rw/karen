import { db } from "./drizzle/db";
import { categories } from "./drizzle/schema";

const categoryData = [
  {
    name: "Public Infrastructure",
    departmentId: "fdcb989d-d6f6-4907-bf5e-72e6ca32756e", // Ministry of Infrastructure
  },
  {
    name: "Sanitation & Waste Management",
    departmentId: "910828c5-c5d4-4390-9d4a-9bafb1eb2813", // Rwanda Utilities Regulatory Authority
  },
  {
    name: "Water Supply & Drainage",
    departmentId: "71921e7c-b6fc-4878-9fe0-9ea7fc609969", // Water and Sanitation Commission
  },
  {
    name: "Electricity & Power Supply",
    departmentId: "3a4e33cb-66b6-43b7-81a8-73cb53f8a727", // Rwanda Energy Group
  },
  {
    name: "Law & Order",
    departmentId: "f708926d-464f-44ae-8594-96c279b03c8f", // Rwanda National Police
  },
  {
    name: "Health Services",
    departmentId: "034d34b1-6250-42ab-948d-5b73808d4387", // Ministry of Health
  },
  {
    name: "Environmental Issues",
    departmentId: "30b9db34-859e-485e-ac06-c409db6dafcb", // Rwanda Environment Management
  },
  {
    name: "Housing & Urban Development",
    departmentId: "065ecca1-e52d-406c-a5bc-489772aff242", // Rwanda Housing Authority
  },
  {
    name: "Education Services",
    departmentId: "56014866-6a6b-4087-b8ba-73dcf6dc3b89", // Ministry of Education
  },
  {
    name: "Transportation",
    departmentId: "da105c68-c85c-43a4-a10b-752a13f110e4", // Rwanda Transport Development
  },
  {
    name: "Corruption & Governance",
    departmentId: "b7360879-acf4-40b1-8c1b-dad0c72d5dcc", // Office of the Ombudsman
  },
  {
    name: "Civic Amenities",
    departmentId: "7506ba95-716c-47b1-aa5e-44996d5f2184", // Ministry of Local Government
  },
  {
    name: "Taxes & Utility Billing",
    departmentId: "00b57806-f92d-4054-861a-bba48a0c8ca7", // Rwanda Revenue Authority
  },
  {
    name: "Employment & Labor",
    departmentId: "87cf307b-60a2-445d-a5b8-8a33269b4a03", // Ministry of Public Service
  },
  {
    name: "Digital Services & E-Governance",
    departmentId: "959bd22a-9019-4df5-8c81-17f82e187857", // Ministry of ICT and Innovation
  },
  {
    name: "Licensing & Permits",
    departmentId: "d108a2e2-730d-4d3d-b5d8-6cead5aa4abe", // Rwanda Development Board
  },
  {
    name: "Consumer Rights",
    departmentId: "ec98af57-6960-4891-9615-273c2607c1fb", // Rwanda Consumer Protection
  },
  {
    name: "Welfare & Social Services",
    departmentId: "8078fdf9-dc75-47ce-802a-5e2f56bf062b", // National Council of People
  },
];

async function seedCategories() {
  try {
    await db.delete(categories);
    console.log("✅ Existing categories cleared.");
    for (const cat of categoryData) {
      await db.insert(categories).values({
        name: cat.name,
        departmentId: cat.departmentId,
      });
    }
    console.log("✅ Categories seeded successfully.");
  } catch (err) {
    console.error("❌ Failed to seed Categories:", err);
  }
}

seedCategories();
