# astro-devtoolbar-tailwind

A simple Astro Dev Toolbar integration to allow you to see and toggle Tailwind classes easily, per element, in real time! 💪

## Usage

### Installation

Install the integration **automatically** using the Astro CLI:

```bash
pnpm astro add astro-devtoolbar-tailwind
```

```bash
npm astro add astro-devtoolbar-tailwind
```

```bash
yarn astro add astro-devtoolbar-tailwind
```

Or install it **manually**:

1. Install the required dependencies

```bash
pnpm add astro-devtoolbar-tailwind
```

```bash
npm install astro-devtoolbar-tailwind
```

```bash
yarn add astro-devtoolbar-tailwind
```

2. Add the integration to your astro config

```diff
+import AstroDevtoolbarTailwind from "astro-devtoolbar-tailwind";

export default defineConfig({
  integrations: [
+    AstroDevtoolbarTailwind(),
  ],
});
```

### Configuration

TODO:configuration

## Contributing

This package is structured as a monorepo:

- `playground` contains code for testing the package
- `package` contains the actual package

Install dependencies using pnpm: 

```bash
pnpm i --frozen-lockfile
```

Start the playground:

```bash
pnpm playground:dev
```

You can now edit files in `package`. Please note that making changes to those files may require restarting the playground dev server.

## Licensing

[MIT Licensed](https://github.com/futurethemes/astro-devtoolbar-tailwind/blob/LICENSE). Made with ❤️ by [jdtjenkins](https://github.com/jdtjenkins).

## Acknowledgements

The Astro Team 💖
