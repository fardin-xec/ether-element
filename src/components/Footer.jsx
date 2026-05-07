export default function Footer() {
  return (
    <footer id="contact" className="bg-[#040408] border-t border-white/[0.04] py-20 px-8 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div>
            <p style={{ fontFamily:'Georgia,serif', letterSpacing:'0.2em' }} className="text-3xl text-white mb-1">ETHER</p>
            <p className="font-['Montserrat'] text-[8px] tracking-[0.6em] text-[#c9a96e] mb-5">ELEMENT</p>
            <p className="font-['Montserrat'] text-xs text-white/25 leading-relaxed max-w-xs">
              Crafted for those who understand that the finest things are always felt before they are seen.
            </p>
          </div>
          <div>
            <p className="font-['Montserrat'] text-[9px] tracking-[0.45em] uppercase text-white/20 mb-5">Contact</p>
            <p className="font-['Montserrat'] text-xs text-white/35 mb-2">ether.element03@gmail.com</p>
            <p className="font-['Montserrat'] text-xs text-white/35 mb-2">Ahmedabad, Gujarat, India</p>
            <p className="font-['Montserrat'] text-xs text-[#c9a96e] mt-4">@ETHER_ELEMENT</p>
          </div>
          <div>
            <p className="font-['Montserrat'] text-[9px] tracking-[0.45em] uppercase text-white/20 mb-5">Product</p>
            <p className="font-['Montserrat'] text-xs text-white/35 mb-2">50 ML · Eau de Parfum</p>
            <p className="font-['Montserrat'] text-xs text-white/35 mb-2">MRP ₹ 1,200 (Incl. all taxes)</p>
            <p className="font-['Montserrat'] text-xs text-white/35 mb-2">Use Before: 36 Months from Pkd</p>
            <p className="font-['Montserrat'] text-xs text-white/35">Made in India 🇮🇳</p>
          </div>
        </div>
        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-['Montserrat'] text-[8px] tracking-[0.35em] uppercase text-white/15">© 2026 Ether Element. All rights reserved.</p>
          <p className="font-['Montserrat'] text-[8px] tracking-[0.2em] text-white/10">Denat. Alcohol · Parfum · Aqua</p>
        </div>
      </div>
    </footer>
  );
}
