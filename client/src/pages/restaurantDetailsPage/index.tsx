import { Badge } from "@/components/ui/badge";
import { Timer } from "lucide-react";
import AvailableMenu from "./availableMenu";

const RestaurantDetailsPage = () => {
  const singleRestaurant = {
    _id: "1",
    imageUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/99/25/02/group-shot.jpg?w=600&h=400&s=1",
    restaurantName: "Restaurant Name",
    cuisines: ["Cuisine 1", "Cuisine 2", "Cuisine 3"],
    deliveryTime: 30,
    menus: [
      {
        _id: "1",
        name: "Menu 1",
        description: "Menu 1 description",
        price: 100,
        image:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/99/25/02/group-shot.jpg?w=600&h=400&s=1",
      },
      {
        _id: "2",
        name: "Menu 2",
        description: "Menu 2 description",
        price: 200,
        image:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/99/25/02/group-shot.jpg?w=600&h=400&s=1",
      },
    ],
  };

  return (
    <div className="my-10">
      <div className="w-full">
        <div className="relative w-full h-52 sm:h-64 lg:h-72 xl:h-80 2xl:h-96">
          <img
            src={singleRestaurant?.imageUrl || "Loading..."}
            alt="res_image"
            className="object-cover w-full h-full rounded-2xl shadow-lg"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h1 className="font-medium text-xl">
              {singleRestaurant?.restaurantName || "Loading..."}
            </h1>
            <div className="flex gap-2 my-2">
              {singleRestaurant?.cuisines.map(
                (cuisine: string, idx: number) => (
                  <Badge key={idx}>{cuisine}</Badge>
                )
              )}
            </div>

            <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <h1 className="flex items-center gap-2 font-medium">
                  Delivery Time:{" "}
                  <span className="text-primary">
                    {singleRestaurant?.deliveryTime || "NA"} mins
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>

        {singleRestaurant?.menus && (
          <AvailableMenu menus={singleRestaurant?.menus} />
        )}
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
