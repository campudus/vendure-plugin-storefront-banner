import { PluginCommonModule, VendurePlugin } from "@vendure/core";

import { BannerAdminResolver } from "./api/BannerAdminResolver";
import { adminApiExtensions } from "./api/graphql/admin/admin-api-extensions";
import { shopApiExtensions } from "./api/graphql/shop/shop-api-extensions";
import { Banner } from "./entity/Banner";
import { BannerShopResolver } from "./api/BannerShopResolver";

@VendurePlugin({
  imports: [PluginCommonModule],
  compatibility: "^3.5.0",
  entities: [Banner],
  shopApiExtensions: {
    schema: shopApiExtensions,
    resolvers: [BannerShopResolver],
  },
  adminApiExtensions: {
    schema: adminApiExtensions,
    resolvers: [BannerAdminResolver],
  },
  dashboard: "./dashboard/index.tsx",
})
export class BannerPlugin {
}
