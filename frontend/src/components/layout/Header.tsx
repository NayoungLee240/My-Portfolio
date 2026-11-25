import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "EXP", href: "#experience" },
  { label: "PROJECT", href: "#project" },
  { label: "ARCH", href: "#architecture" },
  { label: "DESIGN", href: "#design" },
  { label: "OPS", href: "#monitoring" },
  { label: "LEAD", href: "#leadership" },
  { label: "SKILLS", href: "#skills" },
  { label: "CONTACT", href: "#contact" },
];

// 상단 고정 네비게이션 - 테마 토글 포함
export default function Header() {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <Link href="/">
          NY<span>_</span>LEE
        </Link>
      </div>
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.label}>
            {item.href.startsWith("#") ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
          </li>
        ))}
      </ul>
      <div className="nav-right">
        <ThemeToggle />
        <div className="nav-status">
          <div className="status-dot" />
          LIVE
        </div>
      </div>
    </nav>
  );
}
