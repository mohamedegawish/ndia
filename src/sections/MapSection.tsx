import { MapContainer, TileLayer, Marker, Popup, Polygon, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { Factory } from "@db/schema";
import { Link } from "react-router";
import { Phone, MapPin } from "lucide-react";

// Fix Leaflet icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const tierColors: Record<string, string> = {
  gold: "#D4A843",
  silver: "#94A3B8",
  bronze: "#B45309",
};

function createCustomIcon(tier: string) {
  const color = tierColors[tier] || "#1E3A5F";
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background:${color};width:28px;height:28px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M2 20a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 1 0a2.4 2.4 0 0 0 2-1a2.4 2.4 0 0 1 2-1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 1 0a2.4 2.4 0 0 0 2-1a2.4 2.4 0 0 1 2-1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2-1"/><path d="M4 18l-1-3h18l-1 3"/><path d="M6 15V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v11"/></svg></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

// Exact coordinates from Google Maps for the New Damietta Industrial Zone
const INDUSTRIAL_ZONE_CENTER: [number, number] = [31.4217, 31.6854];
const INDUSTRIAL_ZONE_POLYGON: [number, number][] = [
  [31.4250, 31.6760],
  [31.4250, 31.6950],
  [31.4170, 31.6950],
  [31.4170, 31.6760],
];

function createZoneCenterIcon() {
  return L.divIcon({
    className: "",
    html: `<div style="background:#1E3A5F;width:40px;height:40px;border-radius:50%;border:4px solid #D4A843;box-shadow:0 4px 12px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A843" stroke-width="2.5">
        <polygon points="3 11 22 2 13 21 11 13 3 11"/>
      </svg>
    </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
}

interface Props {
  factories: Factory[];
  height?: string;
  center?: [number, number];
  zoom?: number;
}

export default function MapSection({ factories, height = "100%", center = INDUSTRIAL_ZONE_CENTER, zoom = 15 }: Props) {
  const validFactories = factories.filter((f) => f.latitude && f.longitude);

  return (
    <MapContainer center={center} zoom={zoom} style={{ height, width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Industrial Zone Boundary */}
      <Polygon
        positions={INDUSTRIAL_ZONE_POLYGON}
        pathOptions={{ color: "#D4A843", fillColor: "#D4A843", fillOpacity: 0.08, weight: 2, dashArray: "6 4" }}
      >
        <Tooltip permanent direction="center" className="zone-tooltip">
          <span style={{ fontWeight: "bold", color: "#1E3A5F", fontSize: "13px" }}>المنطقة الصناعية - دمياط الجديدة</span>
        </Tooltip>
      </Polygon>

      {/* Zone center marker */}
      <Marker position={INDUSTRIAL_ZONE_CENTER} icon={createZoneCenterIcon()}>
        <Popup>
          <div className="text-right p-2">
            <div className="flex items-center gap-1 justify-end mb-1">
              <span className="font-bold text-[#1E3A5F] text-sm">المنطقة الصناعية</span>
              <MapPin className="w-4 h-4 text-[#D4A843]" />
            </div>
            <p className="text-xs text-gray-500">مدينة دمياط الجديدة</p>
            <p className="text-xs text-gray-400 mt-1">{validFactories.length} مصنع مسجّل</p>
          </div>
        </Popup>
      </Marker>

      {/* Factory Pins */}
      {validFactories.map((factory) => (
        <Marker
          key={factory.id}
          position={[parseFloat(factory.latitude!), parseFloat(factory.longitude!)]}
          icon={createCustomIcon(factory.membershipTier ?? "bronze")}
        >
          <Popup>
            <div className="text-right min-w-[200px] p-2">
              <div className="flex items-center gap-1 justify-end mb-1">
                <h3 className="font-bold text-[#1E3A5F]">{factory.nameAr}</h3>
                <span
                  style={{ background: tierColors[factory.membershipTier ?? "bronze"] }}
                  className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                />
              </div>
              {factory.phone && (
                <p className="text-xs text-gray-500 flex items-center gap-1 justify-end mb-2">
                  <Phone className="w-3 h-3" /> {factory.phone}
                </p>
              )}
              <Link
                to={`/factories/${factory.id}`}
                className="text-xs text-[#D4A843] hover:underline font-medium"
              >
                عرض التفاصيل ←
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
