import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, User, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-beyti.png";

const navLinks = [
  { href: "/", label: "الرئيسية", labelEn: "Home" },
  { href: "/explore", label: "استكشف", labelEn: "Explore" },
  { href: "/how-it-works", label: "كيف يعمل", labelEn: "How it Works" },
  { href: "/become-chef", label: "انضم كطباخ", labelEn: "Become a Chef" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Beyti" className="h-10 w-auto md:h-12" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-secondary ${
                location.pathname === link.href
                  ? "text-secondary"
                  : "text-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">القاهرة</span>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground flex items-center justify-center">
              2
            </span>
          </Button>
          <Link to="/login">
            <Button variant="outline" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              دخول
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              سجل الآن
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground flex items-center justify-center">
              2
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border animate-fade-in">
          <div className="container py-4 space-y-4">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-card">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">القاهرة، مصر</span>
            </div>
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === link.href
                      ? "bg-secondary/10 text-secondary"
                      : "hover:bg-card"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex gap-2 pt-2">
              <Link to="/login" className="flex-1">
                <Button variant="outline" className="w-full">دخول</Button>
              </Link>
              <Link to="/signup" className="flex-1">
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  سجل الآن
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
