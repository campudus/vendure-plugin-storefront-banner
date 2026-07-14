import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import gql from "graphql-tag";

import type { CreateBannerResult, CreateBannerVariables } from "../helpers/types";
import { BANNER_FRAGMENT } from "./fragments.graphql";

export const CREATE_BANNER_GQL = gql`
  mutation DashboardCreateBanner($input: CreateBannerInput!) {
    createBanner(input: $input) {
      ...DashboardBannerFields
    }
  }
  ${BANNER_FRAGMENT}
` as unknown as TypedDocumentNode<CreateBannerResult, CreateBannerVariables>;
