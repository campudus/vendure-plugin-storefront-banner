# @campudus/vendure-plugin-storefront-banner

A [Vendure](https://www.vendure.io/) plugin for managing storefront banners.

Extends the Admin API and Shop API with banner CRUD operations and provides a full Vendure Dashboard UI with a rich text editor (Tiptap v3).

## Features

- **Admin API**: `banners`, `banner`, `createBanner`, `updateBanner`, `deleteBanner`
- **Shop API**: `activeBanners` — returns all banners with `active: true`
- **Dashboard UI**: list page, detail/edit page, rich text editor, colour pickers, date pickers, toggle switches
- Banner fields: title, active flag, start/end dates, HTML description, background colour, action button, countdown block, newsletter block, close button

## Installation

```bash
# Latest (main branch):
npm install github:campudus/vendure-plugin-storefront-banner

# Pin to a specific release:
npm install github:campudus/vendure-plugin-storefront-banner#v0.1.1
```

Register the plugin in your Vendure config:

```ts
import { BannerPlugin } from "@campudus/vendure-plugin-storefront-banner";

export const config: VendureConfig = {
  plugins: [
    BannerPlugin,
  ],
};
```

Run a database migration after adding the plugin to create the `banner` table:

```bash
npm run migration:generate && npm run migration:run
```

## Dashboard UI

The plugin registers a nav item under an "Extensions" section of the Vendure Dashboard (both titles are localized via the catalog). If your project already defines an "extensions" nav section with a different title, the banner plugin will add a duplicate — you can remove the `navSections` declaration from `dashboard/index.tsx` in that case.

## Localization

Dashboard strings are localized with [Lingui](https://lingui.dev/). Source strings are English (`en`), with a German (`de`) catalog shipped in `dashboard/i18n/`. The Vendure Dashboard loads the compiled catalogs automatically.

To update or add translations after changing dashboard strings:

```bash
npx lingui extract   # regenerate the .po catalogs
```

Then fill in the `msgstr` entries for each locale in `dashboard/i18n/{locale}.po`. Add further locales via `locales` in `lingui.config.js`.

## Peer dependencies

All peer dependencies listed in `package.json` must be installed in the consumer project. Most are already present in a standard Vendure + Dashboard setup. Additional dependencies specific to this plugin:

- `@tiptap/core`, `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-color`, `@tiptap/extension-text-style`, `@tiptap/extension-underline`
- `react-colorful`
- `react-datepicker`
- `react-hook-form`

## License

MIT — © Campudus GmbH
