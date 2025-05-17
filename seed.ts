import { db } from "./drizzle/db";
import { categories, departments, subcategories } from "./drizzle/schema";
const departmentData = [
  {
    name: "Ministry of Infrastructure (MININFRA)",
    description:
      "Oversees roads, public buildings, housing, and transport infrastructure.",
  },
  {
    name: "Rwanda Utilities Regulatory Authority (RURA)",
    description:
      "Regulates utilities like water, electricity, transport, telecoms, and sanitation.",
  },
  {
    name: "Water and Sanitation Corporation (WASAC)",
    description:
      "Handles water supply and drainage systems across the country.",
  },
  {
    name: "Rwanda Energy Group (REG)",
    description:
      "Manages electricity generation, transmission, and distribution.",
  },
  {
    name: "Rwanda National Police (RNP)",
    description:
      "Maintains law and order, handles crimes and community safety.",
  },
  {
    name: "Ministry of Health (MINISANTE)",
    description:
      "Oversees health facilities, services, and public health programs.",
  },
  {
    name: "Rwanda Environment Management Authority (REMA)",
    description:
      "Handles environmental protection and pollution-related issues.",
  },
  {
    name: "Rwanda Housing Authority (RHA)",
    description: "Responsible for urban development and housing regulations.",
  },
  {
    name: "Ministry of Education (MINEDUC)",
    description:
      "Oversees public schools, quality of education, and academic services.",
  },
  {
    name: "Rwanda Transport Development Agency (RTDA)",
    description: "Develops and maintains transport infrastructure.",
  },
  {
    name: "Office of the Ombudsman",
    description:
      "Handles corruption, abuse of office, and poor service delivery.",
  },
  {
    name: "Ministry of Local Government (MINALOC)",
    description:
      "Coordinates local governance, social welfare, and community development.",
  },
  {
    name: "Rwanda Revenue Authority (RRA)",
    description: "Manages taxes, utility billing, and customs.",
  },
  {
    name: "Ministry of Public Service and Labor (MIFOTRA)",
    description:
      "Manages employment, labor relations, and civil service issues.",
  },
  {
    name: "Ministry of ICT and Innovation (MINICT)",
    description:
      "Oversees digital governance, online services, and digital literacy.",
  },
  {
    name: "Rwanda Development Board (RDB)",
    description:
      "Handles business licensing, permits, and investment services.",
  },
  {
    name: "Rwanda Consumer Protection Authority",
    description: "Handles consumer rights and complaints.",
  },
  {
    name: "National Council of Persons with Disabilities (NCPD)",
    description:
      "Addresses welfare and inclusion for persons with disabilities.",
  },
  {
    name: "Local Sector Offices (Umurenge)",
    description:
      "Frontline units of government where many complaints are first received.",
  },
  {
    name: "General Complaints",
    description: "Covers uncategorized complaints or unresolved issues.",
  },
];

// async function seedDepartments() {
//   try {
//     for (const dept of departmentData) {
//       await db.insert(departments).values({
//         name: dept.name,
//         description: dept.description,
//       });
//     }
//     console.log("✅ Departments seeded successfully.");
//   } catch (err) {
//     console.error("❌ Failed to seed departments:", err);
//   }
// }

// seedDepartments();

const subcategoryData = [
  // Public Infrastructure
  {
    name: "Road Construction",
    categoryId: "881e0d3a-448d-483a-91e5-969627c5582d",
  },
  {
    name: "Bridge Maintenance",
    categoryId: "881e0d3a-448d-483a-91e5-969627c5582d",
  },
  {
    name: "Street Lighting",
    categoryId: "881e0d3a-448d-483a-91e5-969627c5582d",
  },
  {
    name: "Public Building Projects",
    categoryId: "881e0d3a-448d-483a-91e5-969627c5582d",
  },

  // Sanitation & Waste Management
  {
    name: "Solid Waste Collection",
    categoryId: "993cc5ed-b6db-4c55-9de7-6aa6b1c01cf7",
  },
  {
    name: "Sewage Management",
    categoryId: "993cc5ed-b6db-4c55-9de7-6aa6b1c01cf7",
  },
  {
    name: "Waste Disposal Sites",
    categoryId: "993cc5ed-b6db-4c55-9de7-6aa6b1c01cf7",
  },
  {
    name: "Public Cleanliness",
    categoryId: "993cc5ed-b6db-4c55-9de7-6aa6b1c01cf7",
  },

  // Water Supply & Drainage
  { name: "Water Cuts", categoryId: "4d7759df-0fa7-4baa-992b-6f651dc978b8" },
  { name: "Broken Pipes", categoryId: "4d7759df-0fa7-4baa-992b-6f651dc978b8" },
  {
    name: "Drainage Blockages",
    categoryId: "4d7759df-0fa7-4baa-992b-6f651dc978b8",
  },
  {
    name: "Water Quality Issues",
    categoryId: "4d7759df-0fa7-4baa-992b-6f651dc978b8",
  },

  // Electricity & Power Supply
  { name: "Power Outages", categoryId: "a2b16187-8db1-4b4f-bb50-de261c2404c2" },
  {
    name: "Meter Complaints",
    categoryId: "a2b16187-8db1-4b4f-bb50-de261c2404c2",
  },
  {
    name: "Billing Errors",
    categoryId: "a2b16187-8db1-4b4f-bb50-de261c2404c2",
  },
  {
    name: "Transformer Issues",
    categoryId: "a2b16187-8db1-4b4f-bb50-de261c2404c2",
  },

  // Law & Order
  {
    name: "Theft & Burglary",
    categoryId: "e4c4b61f-a32e-473b-9d29-8ad3beed0fab",
  },
  {
    name: "Domestic Violence",
    categoryId: "e4c4b61f-a32e-473b-9d29-8ad3beed0fab",
  },
  {
    name: "Traffic Violations",
    categoryId: "e4c4b61f-a32e-473b-9d29-8ad3beed0fab",
  },
  {
    name: "Community Safety",
    categoryId: "e4c4b61f-a32e-473b-9d29-8ad3beed0fab",
  },

  // Health Services
  {
    name: "Hospital Facilities",
    categoryId: "cbfbd8e7-95c8-435f-a60e-590c095f8da7",
  },
  {
    name: "Health Worker Conduct",
    categoryId: "cbfbd8e7-95c8-435f-a60e-590c095f8da7",
  },
  {
    name: "Medicine Shortages",
    categoryId: "cbfbd8e7-95c8-435f-a60e-590c095f8da7",
  },
  {
    name: "Ambulance Services",
    categoryId: "cbfbd8e7-95c8-435f-a60e-590c095f8da7",
  },

  // Environmental Issues
  {
    name: "Illegal Dumping",
    categoryId: "279562d1-b76d-4a36-bd4e-dbc43cd8b4d9",
  },
  { name: "Air Pollution", categoryId: "279562d1-b76d-4a36-bd4e-dbc43cd8b4d9" },
  {
    name: "Noise Pollution",
    categoryId: "279562d1-b76d-4a36-bd4e-dbc43cd8b4d9",
  },
  { name: "Deforestation", categoryId: "279562d1-b76d-4a36-bd4e-dbc43cd8b4d9" },

  // Housing & Urban Development
  {
    name: "Housing Permits",
    categoryId: "c4e87ffd-c048-470d-b76d-16caa13fcb7b",
  },
  {
    name: "Land Use Issues",
    categoryId: "c4e87ffd-c048-470d-b76d-16caa13fcb7b",
  },
  {
    name: "Slum Upgrading",
    categoryId: "c4e87ffd-c048-470d-b76d-16caa13fcb7b",
  },
  {
    name: "Building Code Violations",
    categoryId: "c4e87ffd-c048-470d-b76d-16caa13fcb7b",
  },

  // Education Services
  {
    name: "School Infrastructure",
    categoryId: "50b84611-989c-40a7-a387-989f4e30f4a8",
  },
  {
    name: "Teacher Conduct",
    categoryId: "50b84611-989c-40a7-a387-989f4e30f4a8",
  },
  {
    name: "Learning Materials",
    categoryId: "50b84611-989c-40a7-a387-989f4e30f4a8",
  },
  {
    name: "School Fees Issues",
    categoryId: "50b84611-989c-40a7-a387-989f4e30f4a8",
  },

  // Transportation
  {
    name: "Road Maintenance",
    categoryId: "6aabf479-4b57-4d18-a199-359fd08e627b",
  },
  {
    name: "Public Transport Issues",
    categoryId: "6aabf479-4b57-4d18-a199-359fd08e627b",
  },
  {
    name: "Bus Stop Facilities",
    categoryId: "6aabf479-4b57-4d18-a199-359fd08e627b",
  },
  {
    name: "Traffic Congestion",
    categoryId: "6aabf479-4b57-4d18-a199-359fd08e627b",
  },

  // Corruption & Governance
  { name: "Bribery Cases", categoryId: "2d583200-c233-4c19-99ff-6438587a9f2a" },
  {
    name: "Favoritism in Services",
    categoryId: "2d583200-c233-4c19-99ff-6438587a9f2a",
  },
  {
    name: "Delayed Services",
    categoryId: "2d583200-c233-4c19-99ff-6438587a9f2a",
  },
  {
    name: "Unresponsive Officials",
    categoryId: "2d583200-c233-4c19-99ff-6438587a9f2a",
  },

  // Civic Amenities
  {
    name: "Market Cleanliness",
    categoryId: "af922c82-726e-4427-b83e-054bf56bf192",
  },
  { name: "Public Parks", categoryId: "af922c82-726e-4427-b83e-054bf56bf192" },
  {
    name: "Street Naming Issues",
    categoryId: "af922c82-726e-4427-b83e-054bf56bf192",
  },
  {
    name: "Local Office Response",
    categoryId: "af922c82-726e-4427-b83e-054bf56bf192",
  },

  // Taxes & Utility Billing
  {
    name: "Tax Overcharges",
    categoryId: "584b1d2b-c519-4d15-b901-3334e8dd791c",
  },
  {
    name: "Tax Refund Delays",
    categoryId: "584b1d2b-c519-4d15-b901-3334e8dd791c",
  },
  {
    name: "Billing Disputes",
    categoryId: "584b1d2b-c519-4d15-b901-3334e8dd791c",
  },
  {
    name: "Customs Complaints",
    categoryId: "584b1d2b-c519-4d15-b901-3334e8dd791c",
  },
];

async function seedSubCategories() {
  try {
    await db.delete(subcategories);
    console.log("✅ DB CLEARED");
    for (const sub of subcategoryData) {
      await db.insert(subcategories).values({
        name: sub.name,
        categoryId: sub.categoryId,
      });
    }
    console.log("✅ Departments seeded successfully.");
  } catch (err) {
    console.error("❌ Failed to seed departments:", err);
  }
}

seedSubCategories();
