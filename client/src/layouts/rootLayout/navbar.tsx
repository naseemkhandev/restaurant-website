import ToogleTheme from "@/components/common/toggleTheme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUserStore } from "@/store/useUserStore";
import {
  HandPlatter,
  Loader2,
  Menu,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { Link } from "react-router-dom";

const user = {
  admin: true,
  profilePicture: "https://randomuser.me/api/port",
  fullname: "Naseem Khan",
};
const logout = () => {};
const cart = [];
const loading = false;

const Navbar = () => {
  const { user } = useUserStore();

  console.log(user);

  return (
    <div className="container px-5 md:px-10 mx-auto w-full">
      <div className="flex items-center justify-between h-14">
        <Link to="/">
          <h1 className="font-semibold text-2xl flex items-center text-primary">
            Food<span className="rotate-180 text-2xl block -mx-2">❗️</span>e
            <span className="text-primary">.</span>
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/orders">Order</Link>

            {user?.admin && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Dashboard</MenubarTrigger>
                  <MenubarContent>
                    <Link to="/admin/restaurant">
                      <MenubarItem>Restaurant</MenubarItem>
                    </Link>
                    <Link to="/admin/menu">
                      <MenubarItem>Menu</MenubarItem>
                    </Link>
                    <Link to="/admin/orders">
                      <MenubarItem>Orders</MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>

          <div className="flex items-center gap-4">
            <ToogleTheme />

            <Link to="/cart" className="relative cursor-pointer">
              <ShoppingCart />
              <Button
                size={"icon"}
                className="absolute -inset-y-2.5 left-4 text-xs rounded-full w-4 h-4 bg-red-500 hover:bg-red-500"
              >
                {cart.length}
              </Button>
            </Link>
            <div>
              <Avatar>
                <AvatarImage src={user?.profilePicture} alt="profilephoto" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              {loading ? (
                <Button>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button onClick={logout}>Logout</Button>
              )}
            </div>
          </div>
        </div>
        <div className="md:hidden lg:hidden">
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          className="rounded-full bg-gray-200 text-black hover:bg-gray-200"
          variant="outline"
        >
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>
            <Link to="/">
              <h1 className="font-semibold text-2xl flex items-center text-primary">
                Food<span className="rotate-180 text-2xl block -mx-2">❗️</span>
                e<span className="text-primary">.</span>
              </h1>
            </Link>
          </SheetTitle>

          <ToogleTheme />
        </SheetHeader>
        <Separator className="my-2" />
        <SheetDescription className="flex-1">
          <Link
            to="/profile"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <User />
            <span>Profile</span>
          </Link>
          <Link
            to="/orders"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <HandPlatter />
            <span>Order</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <ShoppingCart />
            <span>Cart (0)</span>
          </Link>
          {user?.admin && (
            <>
              <Link
                to="/admin/menu"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <SquareMenu />
                <span>Menu</span>
              </Link>
              <Link
                to="/admin/restaurant"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <UtensilsCrossed />
                <span>Restaurant</span>
              </Link>
              <Link
                to="/admin/orders"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <PackageCheck />
                <span>Restaurant Orders</span>
              </Link>
            </>
          )}
        </SheetDescription>

        <SheetFooter>
          <div className="flex flex-col gap-4 w-full">
            <Link to="/profile" className="flex flex-row items-center gap-2">
              <Avatar>
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="font-bold">{user?.fullname || "User Name"}</h1>
            </Link>

            <SheetClose asChild>
              {loading ? (
                <Button>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button onClick={logout}>Logout</Button>
              )}
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
