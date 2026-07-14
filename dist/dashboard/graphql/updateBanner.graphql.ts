import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import gql from "graphql-tag";

import type { UpdateBannerResult, UpdateBannerVariables } from "../helpers/types";
import { BANNER_FRAGMENT } from "./fragments.graphql";

export const UPDATE_BANNER_GQL = gql`
  mutation DashboardUpdateBanner($input: UpdateBannerInput!) {
    updateBanner(input: $input) {
      ...DashboardBannerFields
    }
  }
  ${BANNER_FRAGMENT}
` as unknown as TypedDocumentNode<UpdateBannerResult, UpdateBannerVariables>;
