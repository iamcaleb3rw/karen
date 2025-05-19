import { db } from "./drizzle/db";
import { categories } from "./drizzle/schema";

const categoryData = [
  {
    name: "Public Infrastructure",
    departmentId: "68040b2e-54c9-4d03-9682-d29ce8fc18a4", // Ministry of Infrastructure (MININFRA)
  },
  {
    name: "Sanitation & Waste Management",
    departmentId: "c35b1113-20d2-45d9-857c-4df0fb86dadc", // Rwanda Utilities Regulatory Authority (RURA)
  },
  {
    name: "Water Supply & Drainage",
    departmentId: "45ea5243-fbce-445e-9064-326bc9bc8b61", // Water and Sanitation Corporation (WASAC)
  },
  {
    name: "Electricity & Power Supply",
    departmentId: "d65f3979-b8d0-427f-a777-af0c18308340", // Rwanda Energy Group (REG)
  },
  {
    name: "Law & Order",
    departmentId: "410c2333-1a18-4de6-b193-b031f10b1748", // Rwanda National Police (RNP)
  },
  {
    name: "Health Services",
    departmentId: "1c11fd09-a630-4030-88c2-fae13785640a", // Ministry of Health (MINISANTE)
  },
  {
    name: "Environmental Issues",
    departmentId: "a557594e-cdad-4fa4-ae24-ccaefaff81c8", // Rwanda Environment Management Authority (REMA)
  },
  {
    name: "Housing & Urban Development",
    departmentId: "d81eef23-bda6-4f81-a8ef-c6a294a75c87", // Rwanda Housing Authority (RHA)
  },
  {
    name: "Education Services",
    departmentId: "0ed6abca-d8ee-41d7-8b6a-1e275f3c47f7", // Ministry of Education (MINEDUC)
  },
  {
    name: "Transportation",
    departmentId: "03217289-de4d-47da-8fd1-202800e55f7c", // Rwanda Transport Development Agency (RTDA)
  },
  {
    name: "Corruption & Governance",
    departmentId: "3c6eb994-605b-4175-854e-86a23edb4fe7", // Office of the Ombudsman
  },
  {
    name: "Civic Amenities",
    departmentId: "266006f4-8d68-4106-8900-3f2db5ac4e53", // Ministry of Local Government (MINALOC)
  },
  {
    name: "Taxes & Utility Billing",
    departmentId: "2a7bdc07-dcf7-4efe-b9b0-e3e99c4910c5", // Rwanda Revenue Authority (RRA)
  },
  {
    name: "Employment & Labor",
    departmentId: "9ba74aac-3767-4afc-b37b-d7e677dc766f", // Ministry of Public Service and Labor (MIFOTRA)
  },
  {
    name: "Digital Services & E-Governance",
    departmentId: "f6a52bb4-fc7a-4d34-89ca-3a8494686ff7", // Ministry of ICT and Innovation (MINICT)
  },
  {
    name: "Licensing & Permits",
    departmentId: "545a1dd8-efee-4671-bca9-4e3216baee55", // Rwanda Development Board (RDB)
  },
  {
    name: "Consumer Rights",
    departmentId: "d61bb99a-7b50-4620-a1ea-0c1b973ea00c", // Rwanda Consumer Protection Authority
  },
  {
    name: "Welfare & Social Services",
    departmentId: "34dbc043-af39-4c4d-aab8-d9e400ee9c6f", // National Council of Persons with Disabilities (NCPD)
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
