import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NoResultFound = ({ searchText }: { searchText: string }) => {
  return (
    <div className="flex flex-col items-center h-full flex-grow mt-10 gap-5">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-white">
        No results found
      </h1>
      <p className="text-gray-500 dark:text-gray-200 w-full text-center">
        We couldn't find any results for "{searchText}". Try searching
        with a different term.
      </p>
      <Link to="/">
        <Button variant="secondary">
          Go Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NoResultFound;
