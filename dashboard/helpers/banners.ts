import { Banner, BannerFormValues } from "./types";

export const getEmptyBanner = (): Banner => ({
  title: "",
  description: "",
  descriptionHtml: "",
  backgroundColorHex: "",
  actionButtonLabel: "",
  actionButtonUrl: "",
  actionButtonBackgroundColorHex: "",
  actionButtonFontColorHex: "",
  countdownButtonBackgroundColorHex: "",
  countdownButtonFontColorHex: "",
  newsletterButtonBackgroundColorHex: "",
  newsletterButtonFontColorHex: "",
  closeButtonColorHex: "",
  showActionButton: false,
  showCountdown: false,
  showNewsletter: false,
  isClosable: false,
  startDate: "",
  endDate: "",
  active: false,
});

export const toBannerFormValues = (banner: Banner | null | undefined): BannerFormValues => {
  const defaults = { ...getEmptyBanner(), id: "" };
  const source = banner ?? {};

  const picked = Object.fromEntries(
    Object.entries(source).filter(([k]) => k in defaults),
  );

  const withoutNil = Object.fromEntries(
    Object.entries(picked).filter(([, v]) => v != null),
  );

  return { ...defaults, ...withoutNil } as BannerFormValues;
};

export const toDate = (value: Date | string): Date | null => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
};

export const formatDate = (value: Date | string): string => {
  const date = toDate(value);

  return date ? date.toLocaleString("de-DE") : "-";
};
