import { forwardRef } from "react";
import { Link as RouterLink, NavLink as RouterNavLink } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { localizeTo } from "@/lib/i18nRoutes";

// Drop-in replacements for react-router's Link / NavLink: internal links such as
// "/cenote-diving" automatically point to "/es/cenote-diving" on Spanish pages.
export const Link = forwardRef(function Link({ to, ...props }, ref) {
  const { lang } = useLanguage();
  return <RouterLink ref={ref} to={localizeTo(to, lang)} {...props} />;
});

export const NavLink = forwardRef(function NavLink({ to, ...props }, ref) {
  const { lang } = useLanguage();
  return <RouterNavLink ref={ref} to={localizeTo(to, lang)} {...props} />;
});
