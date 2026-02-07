import Link from "next/link";

interface RoutesProps {
  name: string;
  route: string;
}
const Navbar = () => {
  const currentYear = new Date().getFullYear();
  const routes: RoutesProps[] = [
    {
      name: "schedule",
      route: `/schedule/${currentYear}`,
    },
    {
      name: "results",
      route: "/results",
    },
    {
      name: "drivers",
      route: "/drivers",
    },
    {
      name: "news",
      route: "/news",
    },
  ];
  return (
    <nav className="flex items-center justify-between bg-secondary text-neutral p-4">
      <h1 className="text-primary font-bold text-3xl">APEXLINE</h1>
      <div className="flex items-center gap-5">
        {routes.map((route, idx) => (
          <Link
            className="hover:text-primary text-lg duration-300"
            key={idx}
            href={route.route}
          >
            {route.name}
          </Link>
        ))}
      </div>
      <div>menu here</div>
    </nav>
  );
};

export default Navbar;
