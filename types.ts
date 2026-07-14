export type CreateBannerInput = {
  title: string;
  active?: boolean | null;
  startDate: Date;
  endDate: Date;
  description?: string | null;
  descriptionHtml?: string | null;
  descriptionJson?: string | null;
  backgroundColorHex?: string | null;
  showActionButton?: boolean | null;
  actionButtonLabel?: string | null;
  actionButtonUrl?: string | null;
  actionButtonBackgroundColorHex?: string | null;
  actionButtonFontColorHex?: string | null;
  showCountdown?: boolean | null;
  countdownButtonBackgroundColorHex?: string | null;
  countdownButtonFontColorHex?: string | null;
  showNewsletter?: boolean | null;
  newsletterButtonBackgroundColorHex?: string | null;
  newsletterButtonFontColorHex?: string | null;
  isClosable?: boolean | null;
  closeButtonColorHex?: string | null;
};

export type UpdateBannerInput = Partial<CreateBannerInput> & { id: string };

export type MutationCreateBannerArgs = { input: CreateBannerInput };
export type MutationUpdateBannerArgs = { input: UpdateBannerInput };
export type MutationDeleteBannerArgs = { id: string };
export type QueryBannerArgs = { id: string };
export type QueryBannersArgs = { options?: Record<string, unknown> };
