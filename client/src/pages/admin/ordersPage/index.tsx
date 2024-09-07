import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const restaurantOrder = [
  {
    _id: "1",
    deliveryDetails: {
      name: "John Doe",
      address: "123, XYZ Street, ABC City",
    },
    totalAmount: 10000,
    status: "pending",
  },
  {
    _id: "2",
    deliveryDetails: {
      name: "Jane Doe",
      address: "123, XYZ Street, ABC City",
    },
    totalAmount: 20000,
    status: "confirmed",
  },
  {
    _id: "3",
    deliveryDetails: {
      name: "John Doe",
      address: "123, XYZ Street, ABC City",
    },
    totalAmount: 30000,
    status: "outForDelivery",
  },
];

const OrdersPage = () => {
  const handleStatusChange = async (id: string, status: string) => {
    console.log(id, status);
  };

  return (
    <div className="py-10">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-10">
        Orders Overview
      </h1>

      <div className="space-y-8">
        {restaurantOrder.map((order) => (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex-1 mb-6 sm:mb-0">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {order.deliveryDetails.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold">Address: </span>
                {order.deliveryDetails.address}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold">Total Amount: </span>
                {order.totalAmount / 100}
              </p>
            </div>
            <div className="w-full sm:w-1/3">
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray300 mb-2">
                Order Status
              </Label>
              <Select
                onValueChange={(newStatus) =>
                  handleStatusChange(order._id, newStatus)
                }
                defaultValue={order.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[
                      "Pending",
                      "Confirmed",
                      "Preparing",
                      "OutForDelivery",
                      "Delivered",
                    ].map((status: string, index: number) => (
                      <SelectItem key={index} value={status.toLowerCase()}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
