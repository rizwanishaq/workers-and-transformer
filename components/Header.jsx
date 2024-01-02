import Link from "next/link";

const Header = () => {
  return (
    <header className="max-w-[1000px] mx-auto w-full flex items-center justify-between gap-4 p-4">
      <Link href="/">
        <h1 className="font-medium">
          Web<span className="text-blue-400 text-bold">ML</span>
        </h1>
      </Link>
    </header>
  );
};

export default Header;
