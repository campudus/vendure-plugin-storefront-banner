import gql from "graphql-tag";

import { commonApiExtensions } from "../shop/shop-api-extensions";

export const adminApiExtensions = gql`
  ${commonApiExtensions}

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
