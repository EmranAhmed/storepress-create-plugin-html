/**
 * External dependencies
 */
const { join } = require('path')

// two-words
function kebabCase (input) {
  const regex = /[-._\s+]/gi
  return input.replace(regex, '-').toLowerCase()
}

function constantCase (input) {
  const regex = /[-._\s+]/gi
  return input.replace(regex, '_').toUpperCase()
}

function pascalStorePress (input) {
  return 'storepress' === input ? 'StorePress' : input
}

function pascalCase (input) {
  return (input.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('')
}

module.exports = {
  defaultValues: {
    folderName: 'src',
    namespace: 'storepress',
    slug: 'plugin',
    version: '0.0.1',
    title: 'StorePress Plugin',
    description: 'A StorePress Plugin',
    author: 'EmranAhmed',
    dashicon: 'pets',
    category: 'storepress',
    attributes: {},
    license: 'GPL-2.0-or-later',
    customScripts: {
      'postinstall': 'git init -q && rimraf .husky && npx husky init && echo "npx lint-staged" > .husky/pre-commit',

      'prebuild': 'rimraf build',
      'build': 'npm run start -- --no-watch && wp-scripts build --webpack-copy-php --experimental-modules',

      'check-engines': 'wp-scripts check-engines',
      'check-licenses': 'wp-scripts check-licenses',

      'format': 'wp-scripts format ./src',
      'format:all': 'npm run format:php && npm run format:css && npm run format:js',
      'format:js': 'wp-scripts format \'./src/**/*.js\'',
      'format:css': 'wp-scripts format \'./src/**/*.scss\'',

      'lint:css': 'wp-scripts lint-style \'./src/**/*.scss\'',
      'lint:css:report': 'npm run lint:css -- --output-file scss-report.txt',
      'lint:css:fix': 'npm run lint:css -- --fix',

      'lint:js': 'wp-scripts lint-js --format=pretty \'./src/**/*.js\'',
      'lint:js:report': 'npm run lint:js -- --format html --output-file lint-report.html',
      'lint:js:fix': 'npm run lint:js -- --fix',

      'lint:md:docs': 'wp-scripts lint-md-docs',
      'lint:pkg-json': 'wp-scripts lint-pkg-json',

      'packages-update': 'wp-scripts packages-update',

      'prepackage': 'rimraf ${npm_package_name}.zip && npm run build',
      'package': './tools/package.js',

      'plugin-zip': 'npm run package -- --zip',

      'test:e2e': 'wp-scripts test-e2e',
      'test:unit': 'wp-scripts test-unit-js',

      'start': 'rimraf build && wp-scripts start --webpack-copy-php --experimental-modules',
    },
    npmDependencies: [
      '@storepress/utils',
    ],
    npmDevDependencies: [
      '@wordpress/scripts',
      '@woocommerce/dependency-extraction-webpack-plugin',
      '@woocommerce/eslint-plugin',
      '@wordpress/base-styles',
      '@wordpress/dependency-extraction-webpack-plugin',
      'eslint-plugin-you-dont-need-lodash-underscore',
      'husky',
      'lint-staged',
      "prettier@npm:wp-prettier",
      'fs-extra',
      'webpack-remove-empty-scripts',
      'eslint-plugin-prettier@5.2.1',
      'eslint-formatter-pretty',
      'rimraf',
    ],
    customPackageJSON: {
      'publishConfig': {
        'access': 'public',
      },
      'sideEffects': [
        'src/**',
      ],
      'main': 'build/index.js',
      'module': 'src/index.js',
      'files': [
        'src/**',
      ],
      'zip': [
        'build/**',
        'index.html',
        'global-style.css',
      ],
    },
    transformer: (view) => {
      const todayDate = new Date().toJSON().slice(0, 10)
      const pascaleNamespace = pascalCase(pascalStorePress(view.namespace))
      const constantNamespace = constantCase(view.namespace)
      const kebabNamespace = kebabCase(view.namespace)
      const constantSlug = constantCase(view.slug) // TWO_WORDS
      const kebabSlug = kebabCase(view.slug) // two-words
      const pascaleSlug = pascalCase(pascalStorePress(view.slug)) // 'TwoWords'
      return {
        ...view,
        name: `@${kebabNamespace}/${kebabSlug}`,
        todayDate: todayDate,
        constantNamespace: constantNamespace,
        kebabNamespace: kebabNamespace,
        pascaleNamespace: pascaleNamespace,

        constantSlug: constantSlug,
        kebabSlug: kebabSlug,
        pascaleSlug: pascaleSlug,
        GITHUB_REPOSITORY_NAME: '${{ github.event.repository.name }}',
        GITHUB_RELEASE_NAME: '${{ env.RELEASE_NAME }}',
        GITHUB_RELEASE_TAG: '${{ env.RELEASE_TAG }}',
        GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
        GITHUB_PAGE_URL: '${{ steps.deployment.outputs.page_url }}',
      }
    },
  },
  pluginTemplatesPath: join(__dirname, 'plugin-templates'),
  blockTemplatesPath: join(__dirname, 'block-templates'),
}
