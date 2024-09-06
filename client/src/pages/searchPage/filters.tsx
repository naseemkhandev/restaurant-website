import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export type FilterOptionsState = {
  id: string;
  label: string;
};

const filterOptions: FilterOptionsState[] = [
  { id: "burger", label: "Burger" },
  { id: "thali", label: "Thali" },
  { id: "biryani", label: "Biryani" },
  { id: "momos", label: "Momos" },
];

const Filters = () => {
  return (
    <div className="lg:w-72 lg:max-w-72 lg:h-full lg:border-r flex flex-col lg:flex-grow">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter by cuisines</h1>
        <Button variant={"link"}>Reset</Button>
      </div>

      {filterOptions.map((option) => (
        <div key={option.id} className="flex items-center space-x-2 mt-7">
          <Checkbox id={option.id} />
          <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default Filters;
