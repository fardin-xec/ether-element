export default function Footer() {
  return (
    <footer id="contact" className="relative bg-black border-t border-white/5 py-16 px-8 lg:px-20">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="font-cormorant text-3xl text-white mb-1" style={{ fontFamily: 'var(--font-cormorant)', letterSpacing: '0.15em' }}>ETHER</p>
            <p className="font-montserrat text-[9px] tracking-[0.5em] text-[#c9a96e] mb-4">ELEMENT</p>
            <p className="font-montserrat text-xs text-white/30 leading-relaxed max-w-xs">
              Crafted for those who understand that the finest things are always felt before they are seen.
            </p>
          </div>

          {/* Info */}
          <div>
            <p className="font-montserrat text-[9px] tracking-[0.4em] uppercase text-white/25 mb-4">Contact</p>
            <p className="font-montserrat text-xs text-white/40 mb-2">ether.element03@gmail.com</p>
            <p className="font-montserrat text-xs text-white/40 mb-2">Ahmedabad, Gujarat, India</p>
            <p className="font-montserrat text-xs text-[#c9a96e] mt-4">@ETHER_ELEMENT</p>
          </div>

          {/* Legal */}
          <div>
            <p className="font-montserrat text-[9px] tracking-[0.4em] uppercase text-white/25 mb-4">Product</p>
            <p className="font-montserrat text-xs text-white/40 mb-2">50 ML · Eau de Parfum</p>
            <p className="font-montserrat text-xs text-white/40 mb-2">MRP ₹ 1,200 (Incl. all taxes)</p>
            <p className="font-montserrat text-xs text-white/40 mb-2">Use Before: 36 Months from Pkd</p>
            <p className="font-montserrat text-xs text-white/40">Made in India 🇮🇳</p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-white/20">
            © 2026 Ether Element. All rights reserved.
          </p>
          <p className="font-montserrat text-[9px] tracking-[0.2em] text-white/15">
            Denat. Alcohol · Parfum · Aqua
          </p>
        </div>
      </div>
    </footer>
  );
}
