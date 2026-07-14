import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import { DeletionResponse, DeletionResult, Permission } from "@vendure/common/lib/generated-types";
import {
  Allow,
  assertFound,
  Ctx,
  ListQueryBuilder,
  patchEntity,
  RequestContext,
  TransactionalConnection,
} from "@vendure/core";

import {Banner} from "../entity/Banner";

import {
  MutationCreateBannerArgs,
  MutationDeleteBannerArgs,
  MutationUpdateBannerArgs,
  QueryBannerArgs,
  QueryBannersArgs,
} from "../types";

@Resolver()
export class BannerAdminResolver {
  constructor(
    private connection: TransactionalConnection,
    private listQueryBuilder: ListQueryBuilder,
  ) {
  }

  @Query()
  @Allow(Permission.ReadPromotion)
  async banners(@Ctx() _ctx: RequestContext, @Args() args: QueryBannersArgs) {
    const [items, totalItems] = await this.listQueryBuilder
      .build(Banner, args.options)
      .getManyAndCount();

    return ({items, totalItems});
  }

  @Query()
  @Allow(Permission.CreatePromotion)
  banner(@Ctx() ctx: RequestContext, @Args() args: QueryBannerArgs) {
    return this.connection.getRepository(ctx, Banner).findOne({where: {id: args.id}});
  }

  @Mutation()
  @Allow(Permission.UpdatePromotion)
  async createBanner(@Ctx() ctx: RequestContext, @Args() args: MutationCreateBannerArgs): Promise<Banner> {
    const banner = new Banner(args.input);

    const newBanner = await this.connection.getRepository(ctx, Banner).save(banner);

    return assertFound(this.connection.getRepository(ctx, Banner).findOne({where: {id: newBanner.id}}));
  }

  @Mutation()
  @Allow(Permission.UpdatePromotion)
  async updateBanner(@Ctx() ctx: RequestContext, @Args() args: MutationUpdateBannerArgs) {
    const banner = await this.connection.getEntityOrThrow(ctx, Banner, args.input.id);

    const updatedBanner = patchEntity(banner, args.input);

    return this.connection.getRepository(ctx, Banner).save(updatedBanner);
  }

  @Mutation()
  @Allow(Permission.UpdatePromotion)
  async deleteBanner(@Ctx() ctx: RequestContext, @Args() args: MutationDeleteBannerArgs): Promise<DeletionResponse> {
    const banner = await this.connection.getEntityOrThrow(ctx, Banner, args.id);

    await this.connection.getRepository(ctx, Banner).remove(banner);

    return {
      result: DeletionResult.DELETED,
      message: "",
    };
  }
}
