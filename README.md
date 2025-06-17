# Brukerflate Innkreving

![sekvensdiagram](./sekvensdiagram.svg)

## Local Development Setup

### NPM Authentication

This project uses GitHub Packages for some dependencies. To install these packages locally, you need to set up authentication:

1. Copy the `.npmrc.template` file to `.npmrc`:
   ```bash
   cp .npmrc.template .npmrc
   ```

2. Replace `<YOUR_GITHUB_TOKEN>` in the `.npmrc` file with your personal GitHub token that has read access to packages:
   ```
   //npm.pkg.github.com/:_authToken=<YOUR_GITHUB_TOKEN>
   @navikt:registry=https://npm.pkg.github.com
   ```

3. To create a GitHub token:
   - Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Generate a new token with the `read:packages` scope
   - Copy the token and use it in your `.npmrc` file

Note: The `.npmrc` file is ignored by git to prevent accidentally committing your personal token.
