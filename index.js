/**
 * External dependencies
 */
const {join} = require('path')

/**
 * Converts a string to kebab-case by replacing separators (hyphens, dots,
 * underscores, spaces, and plus signs) with hyphens and lowercasing.
 *
 * @param {string} input - The string to convert.
 * @returns {string} The kebab-cased string (e.g. "my-plugin-name").
 *
 * @example
 * kebabCase('My Plugin Name') // => 'my-plugin-name'
 * kebabCase('my_plugin.name') // => 'my-plugin-name'
 */
function kebabCase(input) {
    const regex = /[-._\s+]/gi
    return input.replace(regex, '-').toLowerCase()
}

/**
 * Converts a string to snake_case by replacing separators (hyphens, dots,
 * underscores, spaces, and plus signs) with underscores and lowercasing.
 *
 * @param {string} input - The string to convert.
 * @returns {string} The snake_cased string (e.g. "my_plugin_name").
 *
 * @example
 * snakeCase('My Plugin Name') // => 'my_plugin_name'
 * snakeCase('my-plugin.name') // => 'my_plugin_name'
 */
function snakeCase(input) {
    const regex = /[-._\s+]/gi
    return input.replace(regex, '_').toLowerCase()
}

/**
 * Converts a string to CONSTANT_CASE by replacing separators (hyphens, dots,
 * underscores, spaces, and plus signs) with underscores and uppercasing.
 *
 * @param {string} input - The string to convert.
 * @returns {string} The constant-cased string (e.g. "MY_PLUGIN_NAME").
 *
 * @example
 * constantCase('my-plugin-name') // => 'MY_PLUGIN_NAME'
 * constantCase('my plugin.name') // => 'MY_PLUGIN_NAME'
 */
function constantCase(input) {
    const regex = /[-._\s+]/gi
    return input.replace(regex, '_').toUpperCase()
}

/**
 * Maps the literal string `"storepress"` to its branded casing `"StorePress"`,
 * leaving all other inputs unchanged.
 *
 * @param {string} input - The string to check.
 * @returns {string} `"StorePress"` if input is `"storepress"`, otherwise the original input.
 *
 * @example
 * pascalStorePress('storepress') // => 'StorePress'
 * pascalStorePress('myplugin')   // => 'myplugin'
 */
function pascalStorePress(input) {
    return 'storepress' === input ? 'StorePress' : input
}

/**
 * Converts a string to PascalCase by extracting alphanumeric words and
 * capitalizing the first letter of each.
 *
 * @param {string} input - The string to convert.
 * @returns {string} The PascalCased string (e.g. "MyPluginName").
 *
 * @example
 * pascalCase('my-plugin-name') // => 'MyPluginName'
 * pascalCase('my plugin name') // => 'MyPluginName'
 */
function pascalCase(input) {
    return (input.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('')
}

module.exports = {
    defaultValues       : {
        wpScripts          : false,
        folderName         : 'src',
        namespace          : 'storepress',
        slug               : 'plugin',
        version            : '0.0.1',
        title              : 'StorePress Plugin',
        description        : 'A StorePress Plugin',
        author             : 'EmranAhmed',
        dashicon           : 'pets',
        category           : 'storepress',
        attributes         : {},
        license            : 'GPL-2.0-or-later',
        customScripts      : {
            'postinstall' : 'npm run packages-install:all && git init -q && rimraf .husky && npx husky init && echo "npx lint-staged" > .husky/pre-commit',

            'prebuild' : 'rimraf build && npm run external:build',
            'build'    : 'wp-scripts build --webpack-copy-php --experimental-modules',

            'check-engines'  : 'wp-scripts check-engines',
            'check-licenses' : 'wp-scripts check-licenses',

            'format'     : 'wp-scripts format ./src',
            'format:all' : 'npm run format:php && npm run format:css && npm run format:js',
            'format:js'  : 'wp-scripts format \'./src/**/*.js\'',
            'format:css' : 'wp-scripts format \'./src/**/*.scss\'',

            'lint:css'        : 'wp-scripts lint-style \'./src/**/*.scss\'',
            'lint:css:report' : 'npm run lint:css -- --output-file scss-report.txt',
            'lint:css:fix'    : 'npm run lint:css -- --fix',

            'lint:js'        : 'wp-scripts lint-js --format=pretty \'./src/**/*.js\'',
            'lint:js:report' : 'npm run lint:js -- --format html --output-file lint-report.html',
            'lint:js:fix'    : 'npm run lint:js -- --fix',

            'lint:md:docs'  : 'wp-scripts lint-md-docs',
            'lint:pkg-json' : 'wp-scripts lint-pkg-json',

            "packages-install:all"       : "node ./tools/packages-install.js",
            "packages-update:storepress" : "node ./tools/packages-update.js",

            "packages-update" : "wp-scripts packages-update && npm run packages-update:storepress && npm run packages-install:all",

            'prepackage' : 'rimraf ${npm_package_name}.zip && npm run build',
            'package'    : 'node ./tools/package.js',

            'plugin-zip' : 'npm run package -- --zip',

            'test:e2e'  : 'wp-scripts test-e2e',
            'test:unit' : 'wp-scripts test-unit-js',

            "external:dev"   : "wp-scripts start --no-watch --config tools/webpack.config.externals.js --experimental-modules --webpack-no-externals",
            "external:build" : "wp-scripts build --config tools/webpack.config.externals.js --experimental-modules --webpack-no-externals",

            'prestart' : 'rimraf build && npm run external:dev',
            'start'    : 'wp-scripts start --webpack-copy-php --experimental-modules',
        },
        npmDependencies    : [
            '@storepress/utils',
            '@wordpress/element',
            '@wordpress/interactivity',
        ],
        npmDevDependencies : [
            '@wordpress/scripts',
            '@wordpress/dependency-extraction-webpack-plugin',
            '@wordpress/eslint-plugin',
            '@wordpress/base-styles',
            '@wordpress/dependency-extraction-webpack-plugin',
            'husky',
            'lint-staged',
            "prettier",
            'fs-extra',
            'webpack-remove-empty-scripts',
            'eslint-plugin-prettier',
            'eslint-formatter-pretty',
            'rimraf',
        ],
        customPackageJSON  : {
            'publishConfig' : {
                'access' : 'public',
            },
            'sideEffects'   : [
                'src/**',
            ],
            'main'          : 'build/index.js',
            'module'        : 'src/index.js',
            'files'         : [
                'src/**',
            ],
            'zip'           : [
                'build/**',
                'index.html',
                'index-module.html',
            ],
        },
        transformer        : (view) => {
            const todayDate         = new Date().toJSON().slice(0, 10)
            const pascaleNamespace  = pascalCase(pascalStorePress(view.namespace))
            const constantNamespace = constantCase(view.namespace)
            const kebabNamespace    = kebabCase(view.namespace)
            const constantSlug      = constantCase(view.slug) // TWO_WORDS
            const kebabSlug         = kebabCase(view.slug) // two-words
            const pascaleSlug       = pascalCase(pascalStorePress(view.slug)) // 'TwoWords'
            const snakeNamespace    = snakeCase(view.namespace)
            const snakeSlug         = snakeCase(view.slug)
            return {
                ...view,
                name              : `@${kebabNamespace}/${kebabSlug}`,
                todayDate         : todayDate,
                constantNamespace : constantNamespace,
                kebabNamespace    : kebabNamespace,
                pascaleNamespace  : pascaleNamespace,
                snakeNamespace    : snakeNamespace,

                constantSlug : constantSlug,
                kebabSlug    : kebabSlug,
                pascaleSlug  : pascaleSlug,
                snakeSlug    : snakeSlug,

                GITHUB_REPOSITORY_NAME   : '${{ github.event.repository.name }}',
                GITHUB_RELEASE_NAME      : '${{ env.RELEASE_NAME }}',
                GITHUB_RELEASE_TAG       : '${{ env.RELEASE_TAG }}',
                GITHUB_TOKEN             : '${{ secrets.GITHUB_TOKEN }}',
                GITHUB_PAGE_URL          : '${{ steps.deployment.outputs.page_url }}',
                GITHUB_CHANGELOG_CONTENT : "${{ steps.changelog.outputs.changelog }}",
            }
        },
    },
    pluginTemplatesPath : join(__dirname, 'plugin-templates'),
    blockTemplatesPath  : join(__dirname, 'block-templates'),
}
