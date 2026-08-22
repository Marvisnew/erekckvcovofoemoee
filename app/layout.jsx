import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export const metadata = {
  title: "КовёрБай — интернет-магазин ковров в Беларуси",
  description:
    "Купить ковёр в Минске и по всей Беларуси. Шерсть, вискоза, полипропилен. Доставка, оплата картой и ЕРИП. Каталог, фильтры, блог.",
  keywords: ["ковры", "купить ковёр", "ковры Минск", "ковры Беларусь", "напольные покрытия"],
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
