"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerPlugin = void 0;
const core_1 = require("@vendure/core");
const BannerAdminResolver_1 = require("./api/BannerAdminResolver");
const admin_api_extensions_1 = require("./api/graphql/admin/admin-api-extensions");
const shop_api_extensions_1 = require("./api/graphql/shop/shop-api-extensions");
const Banner_1 = require("./entity/Banner");
const BannerShopResolver_1 = require("./api/BannerShopResolver");
let BannerPlugin = class BannerPlugin {
};
exports.BannerPlugin = BannerPlugin;
exports.BannerPlugin = BannerPlugin = __decorate([
    (0, core_1.VendurePlugin)({
        imports: [core_1.PluginCommonModule],
        compatibility: "^3.5.0",
        entities: [Banner_1.Banner],
        shopApiExtensions: {
            schema: shop_api_extensions_1.shopApiExtensions,
            resolvers: [BannerShopResolver_1.BannerShopResolver],
        },
        adminApiExtensions: {
            schema: admin_api_extensions_1.adminApiExtensions,
            resolvers: [BannerAdminResolver_1.BannerAdminResolver],
        },
        dashboard: "./dashboard/index.tsx",
    })
], BannerPlugin);
//# sourceMappingURL=BannerPlugin.js.map