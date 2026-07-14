"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminApiExtensions = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const shop_api_extensions_1 = require("../shop/shop-api-extensions");
exports.adminApiExtensions = (0, graphql_tag_1.default) `
  ${shop_api_extensions_1.commonApiExtensions}

  input CreateBannerInput {
    title: String!
    active: Boolean
    startDate: DateTime!
    endDate: DateTime!
    description: String
    descriptionHtml: String
    descriptionJson: String
    backgroundColorHex: String
    showActionButton: Boolean
    actionButtonLabel: String
    actionButtonUrl: String
    actionButtonBackgroundColorHex: String
    actionButtonFontColorHex: String
    showCountdown: Boolean
    countdownButtonBackgroundColorHex: String
    countdownButtonFontColorHex: String
    showNewsletter: Boolean
    newsletterButtonBackgroundColorHex: String
    newsletterButtonFontColorHex: String
    isClosable: Boolean
    closeButtonColorHex: String
  }

  input UpdateBannerInput {
    id: ID!
    title: String
    active: Boolean
    startDate: DateTime
    endDate: DateTime
    description: String
    descriptionHtml: String
    descriptionJson: String
    backgroundColorHex: String
    showActionButton: Boolean
    actionButtonLabel: String
    actionButtonUrl: String
    actionButtonBackgroundColorHex: String
    actionButtonFontColorHex: String
    showCountdown: Boolean
    countdownButtonBackgroundColorHex: String
    countdownButtonFontColorHex: String
    showNewsletter: Boolean
    newsletterButtonBackgroundColorHex: String
    newsletterButtonFontColorHex: String
    isClosable: Boolean
    closeButtonColorHex: String
  }

  type BannerList implements PaginatedList {
    items: [Banner!]!
    totalItems: Int!
  }

  extend type Query {
    banners(productId: ID, options: BannerListOptions): BannerList!
    banner(id: ID!): Banner
  }

  extend type Mutation {
    createBanner(input: CreateBannerInput!): Banner!
    updateBanner(input: UpdateBannerInput!): Banner!
    deleteBanner(id: ID!): DeletionResponse!
  }

  # Auto-generated at runtime
  input BannerListOptions
`;
//# sourceMappingURL=admin-api-extensions.js.map