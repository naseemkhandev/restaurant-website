import {
  Loader2,
  LocateIcon,
  Mail,
  MapPin,
  MapPinnedIcon,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormEvent, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const user = {
  fullname: "Naseem Khan",
  email: "naseemkhan@gmail.com",
  address: "123 Main St",
  city: "New York",
  country: "United States",
  profilePicture: "https://randomuser.me/api/portraits",
};

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    profilePicture: user?.profilePicture || "",
  });
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<string>(
    profileData.profilePicture || ""
  );

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePicture(result);
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const updateProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(profileData);
  };

  return (
    <form onSubmit={updateProfileHandler} className="my-5 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
            <AvatarImage src={selectedProfilePicture} />
            <AvatarFallback>
              {profileData.fullname.charAt(0).toUpperCase()}
              {profileData.fullname.charAt(1).toUpperCase()}
            </AvatarFallback>

            <input
              ref={imageRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={fileChangeHandler}
            />
            <div
              onClick={() => imageRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
            >
              <Plus className="text-white w-8 h-8" />
            </div>
          </Avatar>

          <Input
            type="text"
            name="fullname"
            value={profileData.fullname}
            onChange={changeHandler}
            className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-2 gap-3 my-10">
        <div className="flex items-center gap-4 rounded-lg p-4 bg-muted dark:bg-neutral-900">
          <Mail className="text-gray-500 dark:text-gray-200 size-6 2xl:size-8" />
          <div className="w-full">
            <Label>Email</Label>
            <input
              disabled
              name="email"
              value={profileData.email}
              onChange={changeHandler}
              className="w-full text-gray-400 dark:text-gray-500 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-lg p-4 bg-muted dark:bg-neutral-900">
          <LocateIcon className="text-gray-500 dark:text-gray-200 size-6 2xl:size-8" />
          <div className="w-full">
            <Label>Address</Label>
            <input
              name="address"
              value={profileData.address}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none dark:text-gray-300"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-lg p-4 bg-muted dark:bg-neutral-900">
          <MapPin className="text-gray-500 dark:text-gray-200 size-6 2xl:size-8" />
          <div className="w-full">
            <Label>City</Label>
            <input
              name="city"
              value={profileData.city}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none dark:text-gray-300"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-lg p-4 bg-muted dark:bg-neutral-900">
          <MapPinnedIcon className="text-gray-500 dark:text-gray-200 size-6 2xl:size-8" />
          <div className="w-full">
            <Label>Country</Label>
            <input
              name="country"
              value={profileData.country}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none dark:text-gray-300"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <Button disabled>
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit" className="px-8">
          Update
        </Button>
      )}
    </form>
  );
};

export default ProfilePage;
