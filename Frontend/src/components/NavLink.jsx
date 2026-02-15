import React, { forwardRef } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

/* Simple class merge function (cn ka replacement) */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavLink = forwardRef(function NavLink(
  { className, activeClassName, pendingClassName, to, ...props },
  ref
) {
  return (
    <RouterNavLink
      ref={ref}
      to={to}
      className={({ isActive, isPending }) =>
        cn(className, isActive && activeClassName, isPending && pendingClassName)
      }
      {...props}
    />
  );
});

export { NavLink };
