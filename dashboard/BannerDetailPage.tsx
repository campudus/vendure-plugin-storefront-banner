import {
  FullWidthPageBlock,
  Page,
  PageLayout,
  PageTitle,
  toast,
  useDetailPage,
  useNavigate,
} from "@vendure/dashboard";
import { useLingui } from "@lingui/react/macro";
import { type AnyRoute } from "@tanstack/react-router";
import { type UseFormReturn } from "react-hook-form";

import { BannerForm } from "./components/BannerForm/BannerForm";
import { CREATE_BANNER_GQL, GET_BANNER_GQL, UPDATE_BANNER_GQL } from "./graphql";
import { toBannerFormValues } from "./helpers/banners";
import { BannerFormValues } from "./helpers/types";

import "./BannerDetailPage.scss";

type BannerDetailPageProps = {
  route: AnyRoute;
};

export function BannerDetailPage({ route }: BannerDetailPageProps) {
  const { id } = route.useParams() as { id: string };
  const navigate = useNavigate();
  const { t } = useLingui();
  const isCreating = id === "new";

  const { form, submitHandler, entity, isPending, resetForm } = useDetailPage({
    queryDocument: GET_BANNER_GQL,
    createDocument: CREATE_BANNER_GQL,
    updateDocument: UPDATE_BANNER_GQL,
    setValuesForUpdate: banner => toBannerFormValues(banner),
    params: { id },
    onSuccess: async updatedBanner => {
      toast.success(isCreating ? t`Banner created.` : t`Banner updated.`);
      resetForm();

      if (isCreating) {
        void navigate({ to: `/banners/${updatedBanner.id}` });
      }
    },
    onError: err => {
      toast(err instanceof Error ? err.message : t`Error while saving.`);
    },
  });

  const title = isCreating ? t`New banner` : (entity.title ?? t`Edit banner`);

  return (
    <Page pageId="banner-detail" form={form} submitHandler={submitHandler}>
      <PageTitle>{title}</PageTitle>

      <PageLayout>
        <FullWidthPageBlock blockId="main">
          <BannerForm
            form={form as unknown as UseFormReturn<BannerFormValues>}
            isCreating={isCreating}
            isPending={isPending}
            onCancel={() => void navigate({ to: "/banners" })}
          />
        </FullWidthPageBlock>
      </PageLayout>
    </Page>
  );
}
