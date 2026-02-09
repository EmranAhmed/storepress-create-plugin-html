# @storepress/create-plugin-html

This is a template for [`@wordpress/create-block`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/) to create StorePress Plugin.

## Usage

This template can be used by running the following command:

```bash
npx -y @wordpress/create-block@latest --template @storepress/create-plugin-html --no-wp-scripts my-html-extension-name && cd "$_"
```

Navigate to the newly created folder and get started.

```
npm i                        # Install dependencies
npm run packages-update      # Update package dependency
npm run build                # Build the javascript
npx -y http-server           # Start Server
```

## Development

For development on this tool itself, you can also install from a local directory.

```bash
npx -y @wordpress/create-block@latest --template ./path/to/storepress/create-plugin-html --no-wp-scripts my-html-extension-name && cd "$_"
```

### Add Tests

Please check [Base Plugin](https://github.com/EmranAhmed/storepress-base-plugin/) to add `test` and others.

This is a template to used with [`@wordpress/create-block`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/) to create a StorePress Plugin starting point.
