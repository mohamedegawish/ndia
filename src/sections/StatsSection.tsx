import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { Factory, Users, DollarSign, Globe } from "lucide-react";

const stats = [
  { icon: Factory, value: 150, suffix: "+", label: "مصنع" },
  { icon: Users, value: 50000, suffix: "+", label: "عامل" },
  { icon: DollarSign, value: 2, suffix: " مليار", label: "جنيه استثمارات" },
  { icon: Globe, value: 25, suffix: "", label: "دولة تصدير" },
];

export default function StatsSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#0F2035] section-padding">
      <div className="container-main">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-10 h-10 text-white/30 mx-auto mb-4" />
              <div className="text-4xl sm:text-5xl font-bold text-[#D4A843] mb-2">
                {inView ? (
                  <CountUp end={stat.value} duration={2.5} separator="," suffix={stat.suffix} />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
