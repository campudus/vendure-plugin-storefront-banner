import { defineDashboardExtension, detailPageRouteLoader } from "@vendure/dashboard";
import { CodeSquareIcon } from "lucide-react";

import { BannerDetailPage } from "./BannerDetailPage";
import { BannersListPage } from "./BannerListPage";
import { GET_BANNER_GQL } from "./graphql";

const EXTENSIONS_NAV_SECTION = {
  id: "extensions",
  title: "Erweiterungen",
  icon: CodeSquareIcon,
};

defineDashboardExtension({
  navSections: [
    EXTENSIONS_NAV_SECTION,
  ],
  routes: [
    {
      path: "/banners",
      loader: () => ({ breadcrumb: "Werbebanner" }),
      navMenuItem: {
        sectionId: "extensions",
        id: "banners",
        url: "/banners",
        title: "Werbebanner",
        order: 300,
      },
      component: route => <BannersListPage route={route} />,
    },
    {
      path: "/banners/$id",
      loader: detailPageRouteLoader({
        queryDocument: GET_BANNER_GQL,
        breadcrumb: (isNew, entity) => [
          { path: "/banners", label: "Werbebanner" },
          isNew ? "Neuer Banner" : (entity.title ?? "Banner bearbeiten"),
        ],
      }),
      component: route => <BannerDetailPage route={route} />,
    },
  ],
});
