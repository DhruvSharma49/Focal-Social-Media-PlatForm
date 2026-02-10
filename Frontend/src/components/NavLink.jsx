// import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
// import { forwardRef } from "react";
// import { cn } from "@/lib/utils";

// interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
//   className?: string;
//   activeClassName?: string;
//   pendingClassName?: string;
// }

// const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
//   ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
//     return (
//       <RouterNavLink
//         ref={ref}
//         to={to}
//         className={({ isActive, isPending }) =>
//           cn(className, isActive && activeClassName, isPending && pendingClassName)
//         }
//         {...props}
//       />
//     );
//   },
// );

// NavLink.displayName = "NavLink";

// export { NavLink };



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
