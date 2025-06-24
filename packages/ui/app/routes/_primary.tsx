import { Link, Outlet } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "~/components/ui/navigation-menu";

export default function Layout () {

  const handleLogout = () => {
    // TODO: Clean token and redirect to /login
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link to="/home" className="text-sm font-medium px-3 py-2 hover:underline">Inicio</Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Settings</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white border rounded shadow p-2">
                  <Link to="/institutions" className="block px-2 py-1 text-sm hover:bg-gray-100">Instituciones</Link>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </header>
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}