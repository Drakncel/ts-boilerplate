import { NavLink, Outlet } from "react-router";

export const Menu = () => {
  return (
    <div>
      <div className="grid md:grid-cols-4 lg:grid-cols-6 place-items-center items-start mt-6">
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
        <NavLink
          to="/app/magic"
          end
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          Magic
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};
