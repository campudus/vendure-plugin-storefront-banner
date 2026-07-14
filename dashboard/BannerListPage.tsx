import {
  ActionBarItem,
  Badge,
  Button,
  DetailPageButton,
  Link,
  ListPage,
} from "@vendure/dashboard";
import { Trans, useLingui } from "@lingui/react/macro";
import { type AnyRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

import { DELETE_BANNER_GQL, LIST_BANNERS_GQL } from "./graphql";
import { formatDate } from "./helpers/banners";

type BannerListPageProps = {
  route: AnyRoute;
};

export function BannersListPage({ route }: BannerListPageProps) {
  const { t } = useLingui();

  return (
    <ListPage
      pageId="banner-list"
      title={t`Promotional banners`}
      listQuery={LIST_BANNERS_GQL}
      deleteMutation={DELETE_BANNER_GQL}
      route={route}
      customizeColumns={{
        title: {
          cell: ({ row }) => (
            <DetailPageButton
              id={row.original.id}
              label={<span className="max-w-xs truncate block">{row.original.title}</span>}
            />
          ),
        },
        description: {
          header: t`Description`,
          cell: ({ row }) => (
            <div className="max-w-lg truncate text-muted-foreground">
              {row.original.description}
            </div>
          ),
        },
        active: {
          header: t`Status`,
          cell: ({ row }) => (
            <div className="flex justify-center">
              <Badge variant={row.original.active ? "default" : "secondary"}>
                {row.original.active ? t`Active` : t`Inactive`}
              </Badge>
            </div>
          ),
        },
        startDate: {
          header: t`Starts on`,
          cell: ({ row }) => (
            <div className="text-center">{formatDate(row.original.startDate)}</div>
          ),
        },
        endDate: {
          header: t`Ends on`,
          cell: ({ row }) => (
            <div className="text-center">{formatDate(row.original.endDate)}</div>
          ),
        },
      }}
    >
      <ActionBarItem itemId="create-banner">
        <Button render={<Link to="./new" />}>
          <PlusIcon className="mr-2 h-4 w-4" />
          <Trans>Create new banner</Trans>
        </Button>
      </ActionBarItem>
    </ListPage>
  );
}
