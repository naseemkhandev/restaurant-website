const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black dark:text-white text-center py-8 px-4">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Foodie. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
