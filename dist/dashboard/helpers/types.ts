export type BannerFields = {
  __typename?: "Banner";
  id: string;
  title: string;
  active: boolean;
  startDate: string;
  endDate: string;
  description: string | null;
  descriptionHtml: string | null;
  backgroundColorHex: string | null;
  showActionButton: boolean | null;
  actionButtonLabel: string | null;
  actionButtonUrl: string | null;
  actionButtonBackgroundColorHex: string | null;
  actionButtonFontColorHex: string | null;
  showCountdown: boolean | null;
  countdownButtonBackgroundColorHex: string | null;
  countdownButtonFontColorHex: string | null;
  showNewsletter: boolean | null;
  newsletterButtonBackgroundColorHex: string | null;
  newsletterButtonFontColorHex: string | null;
  isClosable: boolean | null;
  closeButtonColorHex: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Banner = Omit<BannerFields, "id" | "createdAt" | "updatedAt" | "startDate" | "endDate"> & {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  startDate: Date | string;
  endDate: Date | string;
};

export type BannerFormValues = {
  id: string;
  title: string;
  active: boolean;
  startDate: string;
  endDate: string;
  description: string;
  descriptionHtml: string;
  backgroundColorHex: string;
  showActionButton: boolean;
  actionButtonLabel: string;
  actionButtonUrl: string;
  actionButtonBackgroundColorHex: string;
  actionButtonFontColorHex: string;
  showCountdown: boolean;
  countdownButtonBackgroundColorHex: string;
  countdownButtonFontColorHex: string;
  showNewsletter: boolean;
  newsletterButtonBackgroundColorHex: string;
  newsletterButtonFontColorHex: string;
  isClosable: boolean;
  closeButtonColorHex: string;
};

export type CreateBannerInput = {
  title: string;
  active?: boolean | null;
  startDate: string;
  endDate: string;
  description?: string | null;
  descriptionHtml?: string | null;
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

export type GetBannerResult = { banner: BannerFields | null };
export type GetBannerVariables = { id: string };

export type CreateBannerResult = { createBanner: BannerFields };
export type CreateBannerVariables = { input: CreateBannerInput };

export type UpdateBannerResult = { updateBanner: BannerFields };
export type UpdateBannerVariables = { input: UpdateBannerInput };

export type DeleteBannerResult = { deleteBanner: { result: string; message: string | null } };
export type DeleteBannerVariables = { id: string };

export type ListBannersResult = {
  banners: {
    items: Array<{
      id: string;
      title: string;
      description: string | null;
      startDate: string;
      endDate: string;
      active: boolean;
    }>;
    totalItems: number;
  };
};
export type ListBannersVariables = { options?: Record<string, unknown> | null };
