const withMDX = require('@next/mdx')({
  extension: /[/\\](content)[/\\](.+)\.(md|mdx)?$/,
})
const withSass = require('@zeit/next-sass')

module.exports = withMDX(
  withSass({
    webpack(config, options) {
      // Further custom configuration here
      return config
    },
  })
)