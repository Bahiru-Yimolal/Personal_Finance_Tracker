// src/hooks/useRoleMenu.js
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { SIDEBAR_MENU } from "../components/sidebar/sidebarConfig";
import { useTranslation } from "./useTranslation";

export const useRoleMenu = () => {
  const role = useSelector(
    (state) => state.auth.userInfo?.role || "user"
  );
  const { t, language } = useTranslation();

  const translatedMenu = useMemo(() => {
    const filterAndTranslate = (menu) => {
      return menu
        .filter((item) => item.roles.includes(role))
        .map((item) => ({
          ...item,
          label: item.translationKey ? t(item.translationKey) : item.label,
          children: item.children
            ? filterAndTranslate(item.children)
            : undefined,
        }));
    };

    return filterAndTranslate(SIDEBAR_MENU);
  }, [role, language, t]);

  return translatedMenu;
};
