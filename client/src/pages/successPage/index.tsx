import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="dark:bg-neutral-900 h-dvh flex items-center justify-center container px-5 mx-auto">
      <div className="p-6 flex flex-col gap-5 md:mx-auto bg-gray-50 rounded-xl px-5 md:px-20 pb-16 pt-10">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 md:w-24 md:h-24 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>

        <div className="text-center flex flex-col gap-5">
          <h3 className="md:text-4xl text-3xl text-gray-900 dark:text-white font-semibold text-center">
            Payment Done!
          </h3>

          <p className="text-gray-600 dark:text-white max-w-lg mx-auto">
            Thank you for completing your secure online payment. Your payment is
            successful.
          </p>

          <p> Have a great day!</p>

          <div className="text-center mt-3">
            <Link to="/">
              <Button className="bg-green-600 hover:bg-green-700">
                GO BACK TO HOME
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
