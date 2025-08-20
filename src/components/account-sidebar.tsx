import { usePathname } from "next/navigation";

export default function AccountSidebar() {
  const pathname = usePathname();

  const sidebarItems = [
    { href: "/account/personal-info", label: "Personal Info" },
    // { href: '/account/host-profie', label: 'Host Profile' },
    { href: "/account/security", label: "Login & Security" },
    { href: "/account/payments", label: "Payments" },
    // { href: '/account/taxes', label: 'Taxes' },
    { href: "/account/privacy", label: "Privacy & Sharing" },
  ];

  return (
    <aside className="w-full sm:w-64 p-6 sm:block">
      <nav className="space-y-4 font-[18px]">
        {sidebarItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`block text-sm hover:text-foreground ${
              pathname === item.href
                ? "text-brightGreen font-medium"
                : "text-muted-foreground"
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
