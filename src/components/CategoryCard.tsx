import { Link } from "react-router";
import { Sofa, TreePine, Shirt, ChefHat, Hammer, Package, Cpu, Box, Building2, Lamp, Factory } from "lucide-react";
import type { Category } from "@db/schema";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sofa, TreePine, Shirt, ChefHat, Hammer, Package, Cpu, Box, Building2, Lamp, Factory,
};

interface CategoryCardProps {
  category: Category & { factoryCount?: number; productCount?: number };
  variant?: "glass" | "light";
}

export default function CategoryCard({ category, variant = "glass" }: CategoryCardProps) {
  const IconComponent = iconMap[category.icon ?? "Factory"] || Factory;

  if (variant === "light") {
    return (
      <Link
        to={`/factories?category=${category.id}`}
        className="group bg-white rounded-xl border border-gray-100 p-6 text-center card-hover"
      >
        <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#2A4A73] flex items-center justify-center transition-transform group-hover:scale-110">
          <IconComponent className="w-7 h-7 text-[#D4A843]" />
        </div>
        <h3 className="font-semibold text-[#1E3A5F] text-sm mb-1">{category.nameAr}</h3>
        <p className="text-gray-400 text-xs">{category.factoryCount ?? 0} مصنع</p>
        {category.descriptionAr && (
          <p className="text-gray-400 text-xs mt-2 line-clamp-2">{category.descriptionAr}</p>
        )}
      </Link>
    );
  }

  return (
    <Link
      to={`/factories?category=${category.id}`}
      className="group glass-panel p-6 text-center transition-all duration-300 hover:bg-white/20 block"
    >
      <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#D4A843] to-[#C49A3A] flex items-center justify-center transition-transform group-hover:scale-110">
        <IconComponent className="w-7 h-7 text-white" />
      </div>
      <h3 className="font-semibold text-white text-sm mb-1">{category.nameAr}</h3>
      <p className="text-[#D4A843] text-xs font-medium">{category.factoryCount ?? 0} مصنع</p>
    </Link>
  );
}
