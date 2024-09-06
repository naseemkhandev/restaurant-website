import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Minus, Plus, XIcon } from "lucide-react";
import { useState } from "react";
import ReviewOrderModal from "./reviewOrderModal";

const cart = [
  {
    _id: "1",
    name: "Burger",
    price: 10,
    image: "https://via.placeholder.com/150",
    quantity: 1,
  },
  {
    _id: "2",
    name: "Pizza",
    price: 20,
    image: "https://via.placeholder.com/150",
    quantity: 2,
  },
];

const CartPage = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col my-10">
      <div className="flex justify-end">
        <Button variant="link">Clear All</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Items</TableHead>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-center">Total</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cart.map((item) => (
            <TableRow>
              <TableCell className="text-center">
                <Avatar>
                  <AvatarImage src={item.image} alt="" />
                  <AvatarFallback className="capitalize">
                    <span>{item.name[0]}</span>
                    <span>{item.name[1]}</span>
                  </AvatarFallback>
                </Avatar>
              </TableCell>

              <TableCell className="text-center">{item.name}</TableCell>

              <TableCell className="text-center font-medium">
                ${item.price}
              </TableCell>

              <TableCell className="flex items-center justify-center">
                <div className="w-fit flex gap-3 items-center rounded-full">
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full"
                  >
                    <Minus className="size-5" />
                  </Button>
                  <p className="font-bold border-none">{item.quantity}</p>
                  <Button
                    size={"icon"}
                    className="rounded-full "
                    variant={"outline"}
                  >
                    <Plus className="size-5" />
                  </Button>
                </div>
              </TableCell>

              <TableCell className="text-center font-medium">
                ${item.price * item.quantity}
              </TableCell>

              <TableCell className="text-right">
                <Button
                  size={"icon"}
                  variant="ghost"
                  className="rounded-full hover:bg-red-500/10 text-red-500 hover:text-red-500"
                >
                  <XIcon className="size-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="text-2xl font-bold">
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">$100.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end my-5">
        <Button onClick={() => setOpen(true)}>Proceed To Checkout</Button>
      </div>

      <ReviewOrderModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default CartPage;
