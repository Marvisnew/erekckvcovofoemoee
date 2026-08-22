import { urlFor } from "@/sanity/lib/image";

// Показывает загруженное в CMS фото товара; если фото нет — CSS-превью из цветов.
export default function CarpetThumb({ image, colors, form = "Прямоугольный", className = "" }) {
  const src = urlFor(image)?.width(800).height(600).fit("crop").url();
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        className={`object-cover ${form === "Круглый" ? "rounded-full" : form === "Овальный" ? "rounded-[50%]" : "rounded-lg"} ${className}`}
      />
    );
  }

  const safe = Array.isArray(colors) && colors.length ? colors : ["#e4cfb4", "#a9743f"];
  const c1 = safe[0] || "#e4cfb4";
  const c2 = safe[1] || safe[0] || "#a9743f";
  const radius =
    form === "Круглый" ? "rounded-full" :
    form === "Овальный" ? "rounded-[50%]" :
    "rounded-lg";
  return (
    <div className={`relative overflow-hidden ${radius} ${className}`} style={{ background: c1 }} aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            `repeating-linear-gradient(45deg, ${c2}22 0 10px, transparent 10px 20px),` +
            `repeating-linear-gradient(-45deg, ${c2}22 0 10px, transparent 10px 20px)`,
        }}
      />
      <div
        className="absolute inset-[12%]"
        style={{
          border: `3px solid ${c2}`,
          borderRadius: form === "Круглый" ? "9999px" : form === "Овальный" ? "50%" : "6px",
        }}
      />
      <div
        className="absolute inset-[26%]"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${c2}, transparent 70%)`,
          borderRadius: form === "Дорожка" ? "6px" : "9999px",
        }}
      />
    </div>
  );
}
