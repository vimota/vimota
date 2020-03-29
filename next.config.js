const withMDX = require('@next/mdx')({
  extension: /[/\\](content)[/\\](.+)\.(md|mdx)?$/,
});

module.exports = withMDX({
    webpack(config, _) {
      // Further custom configuration here
      return config
    },
  }
)