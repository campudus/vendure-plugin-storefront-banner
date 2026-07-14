import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import gql from "graphql-tag";

import type { DeleteBannerResult, DeleteBannerVariables } from "../helpers/types";

export const DELETE_BANNER_GQL = gql`
  mutation DashboardDeleteBanner($id: ID!) {
    deleteBanner(id: $id) {
      result
      message
    }
  }
` as unknown as TypedDocumentNode<DeleteBannerResult, DeleteBannerVariables>;
