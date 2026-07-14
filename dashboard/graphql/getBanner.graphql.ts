import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import gql from "graphql-tag";

import type { GetBannerResult, GetBannerVariables } from "../helpers/types";
import { BANNER_FRAGMENT } from "./fragments.graphql";

export const GET_BANNER_GQL = gql`
  query DashboardGetBanner($id: ID!) {
    banner(id: $id) {
      ...DashboardBannerFields
    }
  }
  ${BANNER_FRAGMENT}
` as unknown as TypedDocumentNode<GetBannerResult, GetBannerVariables>;
