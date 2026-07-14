"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopApiExtensions = exports.commonApiExtensions = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.commonApiExtensions = (0, graphql_tag_1.default) `
  type Banner implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    active: Boolean!
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
`;
exports.shopApiExtensions = (0, graphql_tag_1.default) `
  ${exports.commonApiExtensions}

  extend type Query {
    activeBanners: [Banner]!
  }
`;
//# sourceMappingURL=shop-api-extensions.js.map