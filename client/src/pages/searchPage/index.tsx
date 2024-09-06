import HeroImage from "@/assets/hero_pizza.png";
import SearchPageSkeleton from "@/components/skeletons/searchPageSkeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Globe, MapPin, X } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Filters from "./filters";
import NoResultFound from "./noResultFound";

const searchedRestaurant = {
  data: [
    {
      _id: "1",
      imageUrl: HeroImage,
      restaurantName: "Restaurant Name",
      city: "City",
      country: "Country",
      cuisines: ["Cuisine 1", "Cuisine 2", "Cuisine 3"],
    },
    {
      _id: "2",
      imageUrl: HeroImage,
      restaurantName: "Restaurant Name",
      city: "City",
      country: "Country",
      cuisines: ["Cuisine 1", "Cuisine 2", "Cuisine 3"],
    },
  ],
};

const SearchPage = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const appliedFilter = ["Filter 1", "Filter 2", "Filter 3"];
  const loading = false;

  return (
    <div className="my-10 h-full flex flex-grow">
      <div className="flex flex-col lg:flex-row justify-between gap-10 flex-grow">
        <Filters />

        <div className="flex-1 w-full flex flex-col lg:h-full lg:flex-grow">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={searchQuery}
              placeholder="Search by restaurant & cuisines"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button>Search</Button>
          </div>

          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              <h1 className="font-medium text-lg">
                ({searchedRestaurant?.data.length}) Search result found
              </h1>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                {appliedFilter.map((selectedFilter: string, idx: number) => (
                  <div
                    key={idx}
                    className="relative inline-flex items-center max-w-full"
                  >
                    <Badge
                      className="text-primary rounded-md hover:cursor-pointer pr-6 whitespace-nowrap border-primary"
                      variant="outline"
                    >
                      {selectedFilter}
                    </Badge>
                    <X
                      size={16}
                      className="absolute text-primary right-1 hover:cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Restaurant Cards  */}
            <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 mt-10">
              {loading ? (
                <SearchPageSkeleton />
              ) : !loading && searchedRestaurant?.data.length === 0 ? (
                <NoResultFound searchText={params.text!} />
              ) : (
                searchedRestaurant?.data.map((restaurant) => (
                  <Card
                    key={restaurant._id}
                    className="bg-white dark:bg-neutral-950 rounded-xl overflow-hidden group cursor-pointer"
                  >
                    <div className="relative">
                      <AspectRatio ratio={16 / 10} className="border-b">
                        <img
                          src={restaurant.imageUrl}
                          alt=""
                          className="w-full h-full object-contain group-hover:scale-110 transition-all"
                        />
                      </AspectRatio>
                      <div className="absolute top-2 left-2 bg-white dark:bg-neutral-800 bg-opacity-75 border rounded-lg px-3 py-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Featured
                        </span>
                      </div>
                    </div>

                    <CardContent className="p-5 pb-3">
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {restaurant.restaurantName}
                      </h1>
                      <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin size={16} />
                        <p className="text-sm">
                          City:{" "}
                          <span className="font-medium">{restaurant.city}</span>
                        </p>
                      </div>
                      <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                        <Globe size={16} />
                        <p className="text-sm">
                          Country:{" "}
                          <span className="font-medium">
                            {restaurant.country}
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-2 mt-4 flex-wrap">
                        {restaurant.cuisines.map(
                          (cuisine: string, idx: number) => (
                            <Badge
                              key={idx}
                              className="font-medium px-2 py-1 rounded-full"
                            >
                              {cuisine}
                            </Badge>
                          )
                        )}
                      </div>
                    </CardContent>

                    <div className="px-5 pt-2 pb-5 text-white w-full">
                      <Link to={`/restaurant/${restaurant._id}`}>
                        <Button className="font-semibold px-4 transition-colors duration-200 w-full">
                          View Menus
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
