interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <div
      id="mobile-menu"
      className={`fixed inset-0 bg-[#1e3a8a] z-[999] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] flex flex-col justify-center items-center ${
        isOpen ? "mobile-menu-open" : "translate-x-full"
      }`}
    >
      <button
        id="close-menu-btn"
        className="absolute top-6 right-8 text-white text-3xl hover:text-[#b77a00] transition"
        onClick={onClose}
      >
        <i className="fas fa-times"></i>
      </button>
      <div className="flex flex-col gap-6 text-center text-white text-2xl font-bold">
        <a href="#" className="hover:text-[#b77a00] transition">
          About
        </a>
        <a href="#" className="hover:text-[#b77a00] transition">
          Admissions
        </a>
        <a href="#" className="hover:text-[#b77a00] transition">
          Academics
        </a>
        <a href="#" className="hover:text-[#b77a00] transition">
          Campus Life
        </a>
        <a href="#" className="hover:text-[#b77a00] transition">
          Research
        </a>
        <a href="#" className="hover:text-[#b77a00] transition">
          Placements
        </a>
        <a href="#" className="hover:text-[#b77a00] transition">
          Contact Us
        </a>
      </div>
    </div>
  );
}
