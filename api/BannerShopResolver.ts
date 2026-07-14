import {Query, Resolver} from "@nestjs/graphql";
import { Permission } from "@vendure/common/lib/generated-types";
import {Allow, Ctx, RequestContext, TransactionalConnection} from "@vendure/core";

import {Banner} from "../entity/Banner";

@Resolver()
export class BannerShopResolver {
  constructor(
    private connection: TransactionalConnection,
  ) {
  }

  @Query()
  @Allow(Permission.Public)
  activeBanners(@Ctx() ctx: RequestContext) {
    return this.connection.getRepository(ctx, Banner).find({
      where: {
        active: true,
      },
    });
  }
}
