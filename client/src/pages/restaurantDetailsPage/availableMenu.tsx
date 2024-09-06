import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Menu {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface AvailableMenuProps {
  menus: Menu[];
}

const AvailableMenu: React.FC<AvailableMenuProps> = ({ menus }) => {
  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-semibold mb-6">
        Available Menus
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 space-y-4 md:space-y-0 gap-5">
        {menus.map((menu) => (
          <Card
            key={menu._id}
            className="bg-white dark:bg-neutral-950 rounded-2xl overflow-hidden group cursor-pointer"
          >
            <div className="relative">
              <AspectRatio ratio={16 / 10} className="border-b">
                <img
                  src={menu.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-all"
                />
              </AspectRatio>
            </div>

            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {menu.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2">{menu.description}</p>
              <h3 className="text-lg font-semibold mt-4">
                Price: <span className="text-[#D19254]">₹{menu.price}</span>
              </h3>
            </CardContent>

            <CardFooter className="px-4">
              <Button className="w-full">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvailableMenu;
