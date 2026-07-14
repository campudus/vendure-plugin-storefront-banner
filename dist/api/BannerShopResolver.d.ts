import { RequestContext, TransactionalConnection } from "@vendure/core";
import { Banner } from "../entity/Banner";
export declare class BannerShopResolver {
    private connection;
    constructor(connection: TransactionalConnection);
    activeBanners(ctx: RequestContext): Promise<Banner[]>;
}
//# sourceMappingURL=BannerShopResolver.d.ts.map