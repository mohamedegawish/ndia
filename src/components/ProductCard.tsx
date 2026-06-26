import { Link } from "react-router";
import type { Product } from "@db/schema";

interface ProductCardProps {
  product: Product & { factory?: { nameAr: string } | null };
}

export default function ProductCard({ product }: ProductCardProps) {
  const statusConfig = {
    available: { class: "status-available", label: "متوفر" },
    limited: { class: "status-limited", label: "محدود" },
    out_of_stock: { class: "status-out", label: "غير متوفر" },
  }[product.availability ?? "available"];

  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden card-hover block"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.mainImage || "/images/product-1.jpg"}
          alt={product.nameAr}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className={`absolute top-2 right-2 ${statusConfig.class}`}>
          {statusConfig.label}
        </span>
      </div>

      {/* Content */}
      <div className="p-3.5">
        <h3 className="font-semibold text-[#1E3A5F] text-sm mb-1 line-clamp-1">{product.nameAr}</h3>
        {product.factory && (
          <p className="text-gray-400 text-xs">{product.factory.nameAr}</p>
        )}
        {product.price && (
          <p className="text-[#D4A843] font-bold text-sm mt-1.5">
            {product.price} <span className="text-xs font-normal text-gray-400">{product.currency}</span>
          </p>
        )}
      </div>
    </Link>
  );
}
