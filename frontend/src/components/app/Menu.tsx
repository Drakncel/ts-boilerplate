import { NavLink, Outlet } from "react-router";

export const Menu = () => {
  return (
    <div>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 place-items-center items-start mt-6">
        <NavLink
          to="/app/"
          end
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/app/shortener"
          end
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          Shortener
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};
