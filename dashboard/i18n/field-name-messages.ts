/**
 * Field-name translation ids consumed by the Vendure Dashboard's data-table
 * (sortable column headers and the column-visibility dropdown) via
 * `getTranslatedFieldName(column.id)` → `i18n.t("fieldName.<id>")`.
 *
 * These ids are never string literals elsewhere in this plugin, so they are
 * marked here with `/* i18n *​/` comments to keep them in the extracted catalog.
 * Vendure ships translations for common fields (e.g. `description`, `id`) but
 * not for these banner columns, which otherwise fall back to English.
 *
 * Mirrors the pattern in `@vendure/dashboard`'s `i18n/common-strings.ts`.
 */
export const bannerFieldNameMessageIds = [
  /* i18n */ "fieldName.title",
  /* i18n */ "fieldName.active",
  /* i18n */ "fieldName.startDate",
  /* i18n */ "fieldName.endDate",
];
