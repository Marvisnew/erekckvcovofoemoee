import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contacts" className="mt-16 border-t border-brand-200 bg-brand-100">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold text-brand-800">
            <span className="inline-block h-6 w-6 rounded bg-gradient-to-br from-brand-400 to-brand-700" />
            КовёрБай
          </div>
          <p className="mt-3 text-sm text-brand-700">Интернет-магазин ковров с доставкой по всей Беларуси.</p>
        </div>
        <div>
          <h4 className="font-semibold text-brand-800">Каталог</h4>
          <ul className="mt-3 space-y-2 text-sm text-brand-700">
            <li><Link href="/catalog?room=Гостиная" className="hover:text-brand-900">Для гостиной</Link></li>
            <li><Link href="/catalog?room=Детская" className="hover:text-brand-900">Для детской</Link></li>
            <li><Link href="/catalog?form=Дорожка" className="hover:text-brand-900">Дорожки</Link></li>
            <li><Link href="/catalog?material=Шерсть" className="hover:text-brand-900">Шерстяные</Link></li>
          </ul>
        </div>
        <div id="delivery">
          <h4 className="font-semibold text-brand-800">Покупателям</h4>
          <ul className="mt-3 space-y-2 text-sm text-brand-700">
            <li>Доставка по Беларуси</li>
            <li>Оплата картой и ЕРИП</li>
            <li>Возврат 14 дней</li>
            <li><Link href="/blog" className="hover:text-brand-900">Блог</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-brand-800">Контакты</h4>
          <ul className="mt-3 space-y-2 text-sm text-brand-700">
            <li><a href="tel:+375291234567" className="hover:text-brand-900">+375 29 123-45-67</a></li>
            <li><a href="mailto:info@kovyorby.by" className="hover:text-brand-900">info@kovyorby.by</a></li>
            <li>г. Минск, ул. Примерная, 1</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-200 py-4 text-center text-xs text-brand-600">
        © {new Date().getFullYear()} КовёрБай. Демо-проект. Все права защищены.
      </div>
    </footer>
  );
}
