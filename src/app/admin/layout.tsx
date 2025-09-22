"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X, ComputerIcon } from "lucide-react";
import Link from "next/link";
import { AuthMe, LogoutAdminService } from "@/services/Auth";
import { toast } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const [userName, setUserName] = useState("");

  const fetchUserName = async () => {
    try {
      const res = await AuthMe();
      setUserName(res.username);
    } catch (error) {
      toast.error("Erro ao buscar dados do usuário");
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  const navigation = [
    { name: "Computadores", href: "/admin/computers", icon: ComputerIcon },
  ];

  return (
    <div className="min-h-screen font-montserrat bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <Link href="/">
            <p className="font-montserrat">Gerenciamento LW</p>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-6 py-3 text-sm font-montserrat transition-colors ${
                  isActive
                    ? "bg-olive-50 text-olive-700 border-r-2 border-olive-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <Button
            onClick={LogoutAdminService}
            variant="outline"
            className="w-full bg-transparent cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-end font-montserrat space-x-4">
            <p>
              Seja bem-vindo,{" "}
              <p>
                <strong>{userName}</strong>
              </p>
            </p>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
