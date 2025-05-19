import { db } from "./drizzle/db";
import { categories, departments, subcategories } from "./drizzle/schema";
// const departmentData = [
//   {
//     name: "Ministry of Infrastructure (MININFRA)",
//     description:
//       "Oversees roads, public buildings, housing, and transport infrastructure.",
//   },
//   {
//     name: "Rwanda Utilities Regulatory Authority (RURA)",
//     description:
//       "Regulates utilities like water, electricity, transport, telecoms, and sanitation.",
//   },
//   {
//     name: "Water and Sanitation Corporation (WASAC)",
//     description:
//       "Handles water supply and drainage systems across the country.",
//   },
//   {
//     name: "Rwanda Energy Group (REG)",
//     description:
//       "Manages electricity generation, transmission, and distribution.",
//   },
//   {
//     name: "Rwanda National Police (RNP)",
//     description:
//       "Maintains law and order, handles crimes and community safety.",
//   },
//   {
//     name: "Ministry of Health (MINISANTE)",
//     description:
//       "Oversees health facilities, services, and public health programs.",
//   },
//   {
//     name: "Rwanda Environment Management Authority (REMA)",
//     description:
//       "Handles environmental protection and pollution-related issues.",
//   },
//   {
//     name: "Rwanda Housing Authority (RHA)",
//     description: "Responsible for urban development and housing regulations.",
//   },
//   {
//     name: "Ministry of Education (MINEDUC)",
//     description:
//       "Oversees public schools, quality of education, and academic services.",
//   },
//   {
//     name: "Rwanda Transport Development Agency (RTDA)",
//     description: "Develops and maintains transport infrastructure.",
//   },
//   {
//     name: "Office of the Ombudsman",
//     description:
//       "Handles corruption, abuse of office, and poor service delivery.",
//   },
//   {
//     name: "Ministry of Local Government (MINALOC)",
//     description:
//       "Coordinates local governance, social welfare, and community development.",
//   },
//   {
//     name: "Rwanda Revenue Authority (RRA)",
//     description: "Manages taxes, utility billing, and customs.",
//   },
//   {
//     name: "Ministry of Public Service and Labor (MIFOTRA)",
//     description:
//       "Manages employment, labor relations, and civil service issues.",
//   },
//   {
//     name: "Ministry of ICT and Innovation (MINICT)",
//     description:
//       "Oversees digital governance, online services, and digital literacy.",
//   },
//   {
//     name: "Rwanda Development Board (RDB)",
//     description:
//       "Handles business licensing, permits, and investment services.",
//   },
//   {
//     name: "Rwanda Consumer Protection Authority",
//     description: "Handles consumer rights and complaints.",
//   },
//   {
//     name: "National Council of Persons with Disabilities (NCPD)",
//     description:
//       "Addresses welfare and inclusion for persons with disabilities.",
//   },
//   {
//     name: "Local Sector Offices (Umurenge)",
//     description:
//       "Frontline units of government where many complaints are first received.",
//   },
//   {
//     name: "General Complaints",
//     description: "Covers uncategorized complaints or unresolved issues.",
//   },
// ];

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
    categoryId: "746d2ba6-5875-44b1-aebe-70b6ddbd87b5",
  },
  {
    name: "Bridge Maintenance",
    categoryId: "746d2ba6-5875-44b1-aebe-70b6ddbd87b5",
  },
  {
    name: "Street Lighting",
    categoryId: "746d2ba6-5875-44b1-aebe-70b6ddbd87b5",
  },
  {
    name: "Public Building Projects",
    categoryId: "746d2ba6-5875-44b1-aebe-70b6ddbd87b5",
  },

  // Sanitation & Waste Management
  {
    name: "Solid Waste Collection",
    categoryId: "83831f8c-528f-4850-9954-bec4eb88442e",
  },
  {
    name: "Sewage Management",
    categoryId: "83831f8c-528f-4850-9954-bec4eb88442e",
  },
  {
    name: "Waste Disposal Sites",
    categoryId: "83831f8c-528f-4850-9954-bec4eb88442e",
  },
  {
    name: "Public Cleanliness",
    categoryId: "83831f8c-528f-4850-9954-bec4eb88442e",
  },

  // Water Supply & Drainage
  {
    name: "Water Cuts",
    categoryId: "914f19f2-e3b1-44db-a032-78a65a3ce0a6",
  },
  {
    name: "Broken Pipes",
    categoryId: "914f19f2-e3b1-44db-a032-78a65a3ce0a6",
  },
  {
    name: "Drainage Blockages",
    categoryId: "914f19f2-e3b1-44db-a032-78a65a3ce0a6",
  },
  {
    name: "Water Quality Issues",
    categoryId: "914f19f2-e3b1-44db-a032-78a65a3ce0a6",
  },

  // Electricity & Power Supply
  {
    name: "Power Outages",
    categoryId: "5307ebc6-82d5-4380-9f40-c98fc6032ad8",
  },
  {
    name: "Meter Complaints",
    categoryId: "5307ebc6-82d5-4380-9f40-c98fc6032ad8",
  },
  {
    name: "Billing Errors",
    categoryId: "5307ebc6-82d5-4380-9f40-c98fc6032ad8",
  },
  {
    name: "Transformer Issues",
    categoryId: "5307ebc6-82d5-4380-9f40-c98fc6032ad8",
  },

  // Law & Order
  {
    name: "Theft & Burglary",
    categoryId: "d3506383-3c09-42ca-9e64-6ad0be9aac6a",
  },
  {
    name: "Domestic Violence",
    categoryId: "d3506383-3c09-42ca-9e64-6ad0be9aac6a",
  },
  {
    name: "Traffic Violations",
    categoryId: "d3506383-3c09-42ca-9e64-6ad0be9aac6a",
  },
  {
    name: "Community Safety",
    categoryId: "d3506383-3c09-42ca-9e64-6ad0be9aac6a",
  },

  // Health Services
  {
    name: "Hospital Facilities",
    categoryId: "9ec39c0a-76d3-4855-8490-865518616448",
  },
  {
    name: "Health Worker Conduct",
    categoryId: "9ec39c0a-76d3-4855-8490-865518616448",
  },
  {
    name: "Medicine Shortages",
    categoryId: "9ec39c0a-76d3-4855-8490-865518616448",
  },
  {
    name: "Ambulance Services",
    categoryId: "9ec39c0a-76d3-4855-8490-865518616448",
  },

  // Environmental Issues
  {
    name: "Illegal Dumping",
    categoryId: "542bbe45-f8f5-4aa5-b65f-657975fcac19",
  },
  {
    name: "Air Pollution",
    categoryId: "542bbe45-f8f5-4aa5-b65f-657975fcac19",
  },
  {
    name: "Noise Pollution",
    categoryId: "542bbe45-f8f5-4aa5-b65f-657975fcac19",
  },
  {
    name: "Deforestation",
    categoryId: "542bbe45-f8f5-4aa5-b65f-657975fcac19",
  },

  // Housing & Urban Development
  {
    name: "Housing Permits",
    categoryId: "74b99d24-91a0-41c6-b4aa-3b1c1ca2a39d",
  },
  {
    name: "Land Use Issues",
    categoryId: "74b99d24-91a0-41c6-b4aa-3b1c1ca2a39d",
  },
  {
    name: "Slum Upgrading",
    categoryId: "74b99d24-91a0-41c6-b4aa-3b1c1ca2a39d",
  },
  {
    name: "Building Code Violations",
    categoryId: "74b99d24-91a0-41c6-b4aa-3b1c1ca2a39d",
  },

  // Education Services
  {
    name: "School Infrastructure",
    categoryId: "1481b71a-7960-49a1-804a-2950b38e1749",
  },
  {
    name: "Teacher Conduct",
    categoryId: "1481b71a-7960-49a1-804a-2950b38e1749",
  },
  {
    name: "Learning Materials",
    categoryId: "1481b71a-7960-49a1-804a-2950b38e1749",
  },
  {
    name: "School Fees Issues",
    categoryId: "1481b71a-7960-49a1-804a-2950b38e1749",
  },

  // Transportation
  {
    name: "Road Maintenance",
    categoryId: "bfa99080-aeea-441b-9d7a-916a99407d74",
  },
  {
    name: "Public Transport Issues",
    categoryId: "bfa99080-aeea-441b-9d7a-916a99407d74",
  },
  {
    name: "Bus Stop Facilities",
    categoryId: "bfa99080-aeea-441b-9d7a-916a99407d74",
  },
  {
    name: "Traffic Congestion",
    categoryId: "bfa99080-aeea-441b-9d7a-916a99407d74",
  },

  // Corruption & Governance
  {
    name: "Bribery Cases",
    categoryId: "3a3d50ba-c92c-4c7b-badf-d0e4e00431d3",
  },
  {
    name: "Favoritism in Services",
    categoryId: "3a3d50ba-c92c-4c7b-badf-d0e4e00431d3",
  },
  {
    name: "Delayed Services",
    categoryId: "3a3d50ba-c92c-4c7b-badf-d0e4e00431d3",
  },
  {
    name: "Unresponsive Officials",
    categoryId: "3a3d50ba-c92c-4c7b-badf-d0e4e00431d3",
  },

  // Civic Amenities
  {
    name: "Market Cleanliness",
    categoryId: "f73a0598-98c7-4267-b80d-c64af427a81b",
  },
  {
    name: "Public Parks",
    categoryId: "f73a0598-98c7-4267-b80d-c64af427a81b",
  },
  {
    name: "Street Naming Issues",
    categoryId: "f73a0598-98c7-4267-b80d-c64af427a81b",
  },
  {
    name: "Local Office Response",
    categoryId: "f73a0598-98c7-4267-b80d-c64af427a81b",
  },

  // Taxes & Utility Billing
  {
    name: "Tax Overcharges",
    categoryId: "adf42712-945c-45fb-9af8-b98222ba9766",
  },
  {
    name: "Tax Refund Delays",
    categoryId: "adf42712-945c-45fb-9af8-b98222ba9766",
  },
  {
    name: "Billing Disputes",
    categoryId: "adf42712-945c-45fb-9af8-b98222ba9766",
  },
  {
    name: "Customs Complaints",
    categoryId: "adf42712-945c-45fb-9af8-b98222ba9766",
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
