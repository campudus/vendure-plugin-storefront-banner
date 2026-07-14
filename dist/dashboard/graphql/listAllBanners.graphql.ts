import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import gql from "graphql-tag";

import type { ListBannersResult, ListBannersVariables } from "../helpers/types";

export const LIST_BANNERS_GQL = gql`
  query DashboardListBanners($options: BannerListOptions) {
    banners(options: $options) {
      items {
        id
        title
        description
        startDate
        endDate
        active
      }
      totalItems
    }
  }
` as unknown as TypedDocumentNode<ListBannersResult, ListBannersVariables>;
