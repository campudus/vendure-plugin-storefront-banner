import gql from "graphql-tag";

export const commonApiExtensions = gql`
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

export const shopApiExtensions = gql`
  ${commonApiExtensions}

  extend type Query {
    activeBanners: [Banner]!
  }
`;
