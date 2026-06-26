import Link from "next/link";

const SOCIAL_LINKS = ["f", "ig", "in"];

export function Footer() {
  return (
    <footer className="bg-black text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-playfair text-2xl">
              Leather<span className="text-gold"> Generation</span>
            </h3>
            <p className="mt-4 font-inter text-sm text-cream/60 leading-relaxed">
              Premium leather goods crafted with timeless techniques and modern elegance.
            </p>
            <div className="mt-6 flex gap-4">
              {SOCIAL_LINKS.map((label) => (
                <a
                  key={label}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-xs font-poppins uppercase transition-colors hover:border-gold hover:text-gold"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-poppins text-sm uppercase tracking-widest text-gold">Shop</h4>
            <ul className="mt-5 space-y-3 text-sm text-cream/70 font-inter">
              <li><Link href="/shop?category=jackets" className="hover:text-gold transition-colors">Jackets</Link></li>
              <li><Link href="/shop?category=wallets" className="hover:text-gold transition-colors">Wallets</Link></li>
              <li><Link href="/shop?category=belts" className="hover:text-gold transition-colors">Belts</Link></li>
              <li><Link href="/shop?category=bags" className="hover:text-gold transition-colors">Bags</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-poppins text-sm uppercase tracking-widest text-gold">Company</h4>
            <ul className="mt-5 space-y-3 text-sm text-cream/70 font-inter">
              <li><Link href="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
              <li><Link href="/dashboard" className="hover:text-gold transition-colors">My Account</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-poppins text-sm uppercase tracking-widest text-gold">Contact</h4>
            <ul className="mt-5 space-y-3 text-sm text-cream/70 font-inter">
              <li>hello@leathergeneration.com</li>
              <li>+1 (555) 012-3456</li>
              <li>123 Heritage Lane, Milan, Italy</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-cream/10 pt-6 text-center text-xs text-cream/40 font-inter">
          © {new Date().getFullYear()} Leather Generation. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
