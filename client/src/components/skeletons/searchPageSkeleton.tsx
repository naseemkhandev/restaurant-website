import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SearchPageSkeleton = () => {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="rounded-xl border overflow-hidden dark:bg-white/5"
        >
          <div className="relative">
            <AspectRatio ratio={16 / 10}>
              <Skeleton className="w-full h-full" />
            </AspectRatio>
          </div>

          <CardContent className="px-5 py-5 pb-0">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <div className="mt-2 gap-1 flex items-center">
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="mt-2 flex gap-1 items-center">
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </CardContent>

          <div className="p-5">
            <Skeleton className="h-14 w-full rounded-md" />
          </div>
        </div>
      ))}
    </>
  );
};

export default SearchPageSkeleton;
