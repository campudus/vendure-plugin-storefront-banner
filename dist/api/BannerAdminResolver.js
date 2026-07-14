"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerAdminResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const generated_types_1 = require("@vendure/common/lib/generated-types");
const core_1 = require("@vendure/core");
const Banner_1 = require("../entity/Banner");
let BannerAdminResolver = class BannerAdminResolver {
    constructor(connection, listQueryBuilder) {
        this.connection = connection;
        this.listQueryBuilder = listQueryBuilder;
    }
    async banners(_ctx, args) {
        const [items, totalItems] = await this.listQueryBuilder
            .build(Banner_1.Banner, args.options)
            .getManyAndCount();
        return ({ items, totalItems });
    }
    banner(ctx, args) {
        return this.connection.getRepository(ctx, Banner_1.Banner).findOne({ where: { id: args.id } });
    }
    async createBanner(ctx, args) {
        const banner = new Banner_1.Banner(args.input);
        const newBanner = await this.connection.getRepository(ctx, Banner_1.Banner).save(banner);
        return (0, core_1.assertFound)(this.connection.getRepository(ctx, Banner_1.Banner).findOne({ where: { id: newBanner.id } }));
    }
    async updateBanner(ctx, args) {
        const banner = await this.connection.getEntityOrThrow(ctx, Banner_1.Banner, args.input.id);
        const updatedBanner = (0, core_1.patchEntity)(banner, args.input);
        return this.connection.getRepository(ctx, Banner_1.Banner).save(updatedBanner);
    }
    async deleteBanner(ctx, args) {
        const banner = await this.connection.getEntityOrThrow(ctx, Banner_1.Banner, args.id);
        await this.connection.getRepository(ctx, Banner_1.Banner).remove(banner);
        return {
            result: generated_types_1.DeletionResult.DELETED,
            message: "",
        };
    }
};
exports.BannerAdminResolver = BannerAdminResolver;
__decorate([
    (0, graphql_1.Query)(),
    (0, core_1.Allow)(generated_types_1.Permission.ReadPromotion),
    __param(0, (0, core_1.Ctx)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], BannerAdminResolver.prototype, "banners", null);
__decorate([
    (0, graphql_1.Query)(),
    (0, core_1.Allow)(generated_types_1.Permission.CreatePromotion),
    __param(0, (0, core_1.Ctx)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", void 0)
], BannerAdminResolver.prototype, "banner", null);
__decorate([
    (0, graphql_1.Mutation)(),
    (0, core_1.Allow)(generated_types_1.Permission.UpdatePromotion),
    __param(0, (0, core_1.Ctx)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], BannerAdminResolver.prototype, "createBanner", null);
__decorate([
    (0, graphql_1.Mutation)(),
    (0, core_1.Allow)(generated_types_1.Permission.UpdatePromotion),
    __param(0, (0, core_1.Ctx)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], BannerAdminResolver.prototype, "updateBanner", null);
__decorate([
    (0, graphql_1.Mutation)(),
    (0, core_1.Allow)(generated_types_1.Permission.UpdatePromotion),
    __param(0, (0, core_1.Ctx)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], BannerAdminResolver.prototype, "deleteBanner", null);
exports.BannerAdminResolver = BannerAdminResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [core_1.TransactionalConnection,
        core_1.ListQueryBuilder])
], BannerAdminResolver);
//# sourceMappingURL=BannerAdminResolver.js.map