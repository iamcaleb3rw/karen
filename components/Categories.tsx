import { getAllCategoriesWithSubcategories } from "@/actions/getCategories";
import Link from "next/link";
import React from "react";

const Categories = async () => {
  const categories = await getAllCategoriesWithSubcategories();
  return (
    <div className="flex bg-muted items-center justify-center gap-20 flex-col py-10">
      <div className="grid grid-cols-2 gap-10">
        {categories?.map((cat) => (
          <div key={cat.id}>
            <p className="text-2xl">{cat.name}</p>
            <div>
              {cat.subcategories.map((sub) => (
                <Link
                  href={`/${sub.name}`}
                  className="hover:text-indigo-500 hover:underline text-muted-foreground "
                >
                  <p className="my-1">{sub.name}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
