import { DeletionResponse } from "@vendure/common/lib/generated-types";
import { ListQueryBuilder, RequestContext, TransactionalConnection } from "@vendure/core";
import { Banner } from "../entity/Banner";
import { MutationCreateBannerArgs, MutationDeleteBannerArgs, MutationUpdateBannerArgs, QueryBannerArgs, QueryBannersArgs } from "../types";
export declare class BannerAdminResolver {
    private connection;
    private listQueryBuilder;
    constructor(connection: TransactionalConnection, listQueryBuilder: ListQueryBuilder);
    banners(_ctx: RequestContext, args: QueryBannersArgs): Promise<{
        items: Banner[];
        totalItems: number;
    }>;
    banner(ctx: RequestContext, args: QueryBannerArgs): Promise<Banner | null>;
    createBanner(ctx: RequestContext, args: MutationCreateBannerArgs): Promise<Banner>;
    updateBanner(ctx: RequestContext, args: MutationUpdateBannerArgs): Promise<Banner>;
    deleteBanner(ctx: RequestContext, args: MutationDeleteBannerArgs): Promise<DeletionResponse>;
}
//# sourceMappingURL=BannerAdminResolver.d.ts.map