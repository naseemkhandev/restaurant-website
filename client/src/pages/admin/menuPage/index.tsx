import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { MenuFormSchema, menuSchema } from "@/validations/admin/menuSchema";
import EditMenuModal from "./editMenuModal";

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
}

const restaurant = {
  menus: [
    {
      name: "Burger",
      description: "Delicious Burger",
      price: 80,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/99/25/02/group-shot.jpg?w=600&h=400&s=1",
    },
    {
      name: "Pizza",
      description: "Delicious Pizza",
      price: 100,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/99/25/02/group-shot.jpg?w=600&h=400&s=1",
    },
  ] as MenuItem[],
};

const MenuPage = () => {
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const loading = false;
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | undefined>();
  const [error, setError] = useState<Partial<MenuFormSchema>>({});

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<MenuFormSchema>);
      return;
    }
    console.log(result.data);
  };

  return (
    <div className="my-10">
      <div className="flex justify-between">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
          Available Menus
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button>
              <Plus className="mr-2" />
              Add Menus
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add A New Menu</DialogTitle>
              <DialogDescription>
                Create a menu that will make your restaurant stand out.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="Enter menu name"
                />
                {error && (
                  <span className="text-xs font-medium text-red-600">
                    {error.name}
                  </span>
                )}
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Enter menu description"
                />
                {error && (
                  <span className="text-xs font-medium text-red-600">
                    {error.description}
                  </span>
                )}
              </div>
              <div>
                <Label>Price in (Rupees)</Label>
                <Input
                  type="number"
                  name="price"
                  value={input.price}
                  onChange={changeEventHandler}
                  placeholder="Enter menu price"
                />
                {error && (
                  <span className="text-xs font-medium text-red-600">
                    {error.price}
                  </span>
                )}
              </div>
              <div>
                <Label>Upload Menu Image</Label>
                <Input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setInput({
                      ...input,
                      image: e.target.files?.[0] || undefined,
                    })
                  }
                />
                {error && (
                  <span className="text-xs font-medium text-red-600">
                    {error.image?.name}
                  </span>
                )}
              </div>
              <DialogFooter className="mt-5">
                {loading ? (
                  <Button disabled>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button>Submit</Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {restaurant?.menus.map((menu: MenuItem, idx: number) => (
        <div key={idx} className="mt-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
            <img
              src={menu.image}
              alt=""
              className="md:w-28 md:h-28 h-44 w-full object-cover rounded-lg"
            />
            <div className="flex-1 mt-2 md:mt-0">
              <h1 className="text-lg font-semibold text-gray-800">
                {menu.name}
              </h1>
              <p className="text-sm tex-gray-600 mt-1">{menu.description}</p>
              <h2 className="text-md font-semibold mt-2">
                Price: <span className="text-[#D19254]">{menu.price}</span>
              </h2>
            </div>
            <Button
              onClick={() => {
                setSelectedMenu(menu);
                setEditOpen(true);
              }}
              size={"sm"}
              className=" mt-2"
            >
              Edit
            </Button>
          </div>
        </div>
      ))}

      {selectedMenu && (
        <EditMenuModal
          selectedMenu={selectedMenu}
          editOpen={editOpen}
          setEditOpen={setEditOpen}
        />
      )}
    </div>
  );
};

export default MenuPage;
