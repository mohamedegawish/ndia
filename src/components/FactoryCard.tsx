import { Link } from "react-router";
import { MapPin, Phone, Star } from "lucide-react";
import type { Factory } from "@db/schema";

interface FactoryCardProps {
  factory: Factory & { category?: { nameAr: string } | null };
}

export default function FactoryCard({ factory }: FactoryCardProps) {
  const tierBadge = {
    gold: { class: "gold-badge", label: "ذهبي" },
    silver: { class: "silver-badge", label: "فضي" },
    bronze: { class: "bronze-badge", label: "برونزي" },
  }[factory.membershipTier ?? "bronze"];

  return (
    <Link
      to={`/factories/${factory.id}`}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden card-hover block"
    >
      {/* Cover Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={factory.coverImage || "/images/hero.jpg"}
          alt={factory.nameAr}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className={`absolute top-3 left-3 ${tierBadge.class}`}>
          {tierBadge.label}
        </span>
        {/* Logo */}
        <div className="absolute -bottom-6 right-4 w-14 h-14 rounded-full border-3 border-white bg-white shadow-lg overflow-hidden">
          <img
            src={factory.logo || "/images/hero.jpg"}
            alt={factory.nameAr}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-8">
        <h3 className="font-bold text-[#1E3A5F] text-base mb-1 line-clamp-1">{factory.nameAr}</h3>
        <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed">{factory.descriptionAr}</p>

        <div className="flex items-center gap-3 text-xs text-gray-400">
          {factory.address && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="line-clamp-1">{factory.address}</span>
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
          <span className="flex items-center gap-1 text-xs text-amber-500">
            <Star className="w-3 h-3 fill-amber-500" />
            {factory.rating}
          </span>
          {factory.phone && (
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Phone className="w-3 h-3" />
              {factory.phone}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
