/**
 * Message ids that are consumed by the Vendure Dashboard via runtime-built
 * lookup keys (`i18n.t(...)`) rather than a `<Trans>` / `t` macro literal in
 * this plugin, so they would not be picked up by `lingui extract` otherwise.
 * They are marked here with `/* i18n *​/` comments to keep them in the
 * extracted catalog, mirroring the pattern in `@vendure/dashboard`'s
 * `i18n/common-strings.ts`.
 *
 * - Field names: the data-table (sortable column headers and the
 *   column-visibility dropdown) looks up `i18n.t("fieldName.<id>")` via
 *   `getTranslatedFieldName(column.id)`. Vendure ships `description`/`id`,
 *   not these.
 * - Navigation labels: nav section/menu-item titles are looked up via
 *   `i18n.t(item.title)` with the raw title string (see `nav-main.tsx`).
 *   Natural language messages get compiled to hashed catalog keys, which
 *   `i18n.t(literal)` would not find — so these use explicit dotted ids
 *   (kept as literal catalog keys) and are set as the `title` values in
 *   `index.tsx`.
 */
export const bannerFieldNameMessageIds = [
  /* i18n */ "fieldName.title",
  /* i18n */ "fieldName.active",
  /* i18n */ "fieldName.startDate",
  /* i18n */ "fieldName.endDate",
];

export const bannerNavMessageIds = [
  /* i18n */ "navSection.extensions",
  /* i18n */ "navMenuItem.banners",
];
