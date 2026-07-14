import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import gql from "graphql-tag";

import type { BannerFields } from "../helpers/types";

export const BANNER_FRAGMENT = gql`
  fragment DashboardBannerFields on Banner {
    id
    title
    active
    startDate
    endDate
    description
    descriptionHtml
    backgroundColorHex
    showActionButton
    actionButtonLabel
    actionButtonUrl
    actionButtonBackgroundColorHex
    actionButtonFontColorHex
    showCountdown
    countdownButtonBackgroundColorHex
    countdownButtonFontColorHex
    showNewsletter
    newsletterButtonBackgroundColorHex
    newsletterButtonFontColorHex
    isClosable
    closeButtonColorHex
    createdAt
    updatedAt
  }
` as unknown as TypedDocumentNode<BannerFields, Record<string, never>>;
