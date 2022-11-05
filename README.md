# Project Name

## Table of Contents

- [Getting Started](#getting-started)
  - [Development](#development)
  - [Linting](#linting)
  - [Building](#building)
- [Project Structure](#project-structure)
  - [Clients](#clients)
    - [Apollo](#apollo)
    - [Logger](#logger)
  - [Components](#components)
    - [Atoms](#atoms)
    - [Molecules](#molecules)
    - [Organisms](#organisms)
  - [Controllers](#controllers)
  - [Factories](#factories)
  - [Lib](#lib)
    - [Utils](#utils)
  - [Pages](#pages)
  - [Public](#public)
- [Testing Strategies](#testing-strategies)
  - [Mocks](#mocks)
  - [Unit Testing](#unit-testing)
- [Deployment and Pipelines](#deployment-and-pipelines)
- [Learn More](#learn-more)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Development

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Linting

Next.js provides an ESLint plugin, eslint-plugin-next, already bundled within the base configuration that makes it possible to catch common issues and problems in a Next.js application. For more information please refer to [the NextJs docs](https://nextjs.org/docs/basic-features/eslint#linting-custom-directories-and-files)

This installation includes on save linting, prettier, storybook and typescript plugins.

To run manually do: 

```bash
npm run lint
```
and the `--fix` flag will attempt to autofix some issues: 

```bash
npm run lint --fix
```

### Building

To build the project run:

```bash
npm run build
```

`next build` generates an optimized version of your application for production. This standard output includes:

- HTML files for pages using getStaticProps or Automatic Static Optimization
- CSS files for global styles or for individually scoped styles
- JavaScript for pre-rendering dynamic content from the Next.js server
- JavaScript for interactivity on the client-side through React

This output is generated inside the .next folder:

- .next/static/chunks/pages – Each JavaScript file inside this folder relates to the route with the same name. For example, .next/static/chunks/pages/about.js would be the JavaScript file loaded when viewing the /about route in your application
- .next/static/media – Statically imported images from next/image are hashed and copied here
- .next/static/css – Global CSS files for all pages in your application
- .next/server/pages – The HTML and JavaScript entry points prerendered from the server. The .nft.json files are created when Output File Tracing is enabled and contain all the file paths that depend on a given page.
- .next/server/chunks – Shared JavaScript chunks used in multiple places throughout your application
- .next/cache – Output for the build cache and cached images, responses, and pages from the Next.js server. Using a cache helps decrease build times and improve performance of loading images
All JavaScript code inside .next has been compiled and browser bundles have been minified to help achieve the best performance and support all modern browsers.

## Project Structure

### Clients

This is where all singleton instances should live.

#### Apollo

This client gives us global access to all the Apollo feature.

Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL. Use it to fetch, cache, and modify application data, all while automatically updating your UI.

Please refer to the Apollo [documentation](https://www.apollographql.com/docs/react/data/queries/) if you have any questions.

#### Logger 

This client gives us global access to `pino` logging capabilities. Can be used both in front-end and back-end code.

**Uage:**

basic example using try-catch block

```ts
import { logger, LOG } from '@clients/Logger';

const foo = () => {
  try {
    // some code
  } catch (error) {
    logger.error(error, LOG.ERROR.EXAMPLE.FOO)
  }
}
```

we can also log all sorts of attributes

```ts
import { logger, LOG } from '@clients/Logger';

const bar = () => {
  try {
    const attr1;
    const attr2;

    // some code

  } catch (error) {
    logger.error(
      {
        error,
        some_attr: attr1,
        some_other_arrt: attr2, 
      }, 
      LOG.ERROR.EXAMPLE.BAR
    )
  }
}
```

doesn't need to be used in a try-catch block

```ts
import { logger, LOG } from '@clients/Logger';

const baz = () => {
  const attr1;
  const attr2;

  logger.info(
    {
      some_attr: attr1,
      some_other_arrt: attr2, 
    }, 
    LOG.INFO.EXAMPLE.BAZ
  );
}
```

**Logs Factory**

This factory can produce 3 types of loggings: `ERROR`, `WARN` and `INFO`.
Within each type we can have multiple sub-types, each in turn with their own sub-types. 
At the end of each branch we map it with an `enum` containing all the error codes for that sub-type (found in `types.ts`).

```ts
enum EAPOLLOCLIENT {
  LINK = 'clients.apollo.link.error',
  NETWORK = 'clients.apollo.network.error',
}

enum EROWFACTORY {
  CREATE_ROW = 'factories.row_factory.create_row.error',
}

enum ECONTENTCONTROLLER {
  GET_ROWS = 'controllers.content_controller.get_rows.error',
}

const LOG = {
  ERROR: {
    FACTORY: {
      ROW: EROWFACTORY,
    },
    CONTROLLER: {
      CONTENT_CONTROLLER: ECONTENTCONTROLLER,
    },
    ROUTES: {},
    CLIENTS: {
      APOLLO: EAPOLLOCLIENT,
    },
  },
  WARN: {},
  INFO: {},
};
```

### Components

In this installation, we use the Atomic Design principles as our design system philosophy.

#### Atoms

Atoms are the basic elements that help inform everything (i.e. buttons, inputs, headings, etc)

#### Molecules

Molecules are the next-largest building block in the food chain. Created by the joining of different atoms, molecules are complex by nature. Because they’re the product of various atoms, though, it’s possible to break them down, conceptually, into something easier to digest.

#### Organisms

Atoms combine to form molecules, and molecules combine to form organisms. In the world of Atomic Design, organisms are the elements that shape both the appearance and functionality of a website. They’re also the elements that start to impact UI.

### Controllers

In MVC architecture a controller acts as an interface between View and Model. This directory is home to our controllers, responsible for controlling the flow of the application execution.

When we make a request a controller is responsible for returning the response to that request.

**Usage:**

1. Create a directory with the controller name in `PascalCase`
2. Create a new ts file in `PascalCase` and export all controller methods within the new file
3. Add tests around the new controller methods
4. Use the new conroller in `getServerSideProps` to fetch data in the application

**basic example**

```ts
// @controllers/ContentController/ContentController.ts

import Apollo from '@clients/Apollo';
import { gql } from '@apollo/client';

import { logger, LOG } from '@clients/Logger';

export const getRows = async () => {
  try {
    const data = await Apollo.query({
      query: gql``,
    });

    return data;
  } catch (error) {
    logger.error(error, LOG.ERROR.CONTROLLER.CONTENT_CONTROLLER.GET_ROWS);

    return null;
  }
};


// @pages/index.tsx

import { contentController } from '@controllers/index';

export const getServerSideProps = async () => {
  const data = await contentController.getRows();

  return {
    props: {
      data,
    },
  };
};

const Page: NextPage = ({ data }: any) => {
  return <></>;
}
```

### Factories

Home dir for all the factories we might want to create

#### Row factory

Builder methods for creating Row components for the web pages. It wraps a constructor for different types of row items and returns instances of the objects via
a simple API.

**Usage**

1. Create row component dir in `@factories/RowFactory/components/<NewRowComponent>`
2. Create row component in the new directory
3. Export the component in the directory and in the index file of the `components` folder
4. Import the new component in the `RowFactory.tsx` file
5. Add a new tupple to the `rowItem` mappings

```tsx
import { RowComponent, NewRowComponent } from '@factories/./components';

export const rowItem = { 
  rowComponent: RowComponent,
  newRowComponent: NewRowComponent
};
```

basic example:

```tsx

import React, { FC } from 'react';

import { logger, LOG } from '@clients/Logger';

// here is where we import our row components
import { RowComponent } from './components';

// here is where we map our components with a key
export const rowItem = { rowComponent: RowComponent };

export type CreateRowT = {
  type: typeof rowItem | any;
  attributes: any;
};

export const createRow: FC<CreateRowT> = ({ type, attributes }): JSX.Element | null => {
  try {
    const Row = rowItem[type];

    if (!attributes?.display) return null;

    if (!Row)
      throw new TypeError(
        'EROWFACTORY: could not parse row component, check if row type matches the mappings',
      );

    return <Row {...attributes} />;
  } catch (err) {
    logger.warn(
      {
        component: type,
        err,
      },
      LOG.ERROR.FACTORY.ROW.CREATE_ROW,
    );

    return null;
  }
};

export default createRow;
```

example using the builder method to create a dynamic page:

```tsx
import type { NextPage } from 'next';
import Error from 'next/error';

import { renderComponents } from '@lib/utils';
import { rowFactory } from '@factories/index';
import { logger } from '@clients/Logger';


const Page: NextPage = ({ data }: any) => {
  if (!data.page || !data.page.display) {
    return <Error statusCode={404} />;
  }

  const components = data?.rows?.map(({ type, value }: any) => {
    const Component = rowFactory.createRow({
      type,
      attributes: value,
    });

    return Component;
  });

  return renderComponents({ components });
};

export default Page;
```

### Lib

This directory is home to the utility methods, macros, types and consts that are meant to be used globally.

### Pages

Home to all our [pages](https://nextjs.org/docs/basic-features/pages), [middleware](https://nextjs.org/docs/middleware), and [API routes](https://nextjs.org/docs/api-routes/introduction), [custom error](https://nextjs.org/docs/advanced-features/custom-error-page#404-page), [custom app](https://nextjs.org/docs/advanced-features/custom-app) and [custom document](https://nextjs.org/docs/advanced-features/custom-document) files.

Please refer to the [Next.js Documentation](https://nextjs.org/docs/basic-features/pages) for more information.

### Public

Home to all our static files, like images, serverd by Next. Files inside public can be referenced by our code starting from the base URL (`/`)

```ts
import Image from 'next/image'

function Avatar() {
  return <Image src="/me.png" alt="me" width="64" height="64" />
}

export default Avatar
```

For more information about this please refer to the [documentation](https://nextjs.org/docs/basic-features/static-file-serving).

## Testing Strategies
### Mocks

The convention here is to place all mocks inside the `__mocks__` dir at root level and add them using the same structure as the project's. Mocks are imported them via absolute path (i.e. `@mocks/path/to/mock`).

### Unit Testing

In this installation we are using `Jest` and `React Testing Library (RTL)` for unit testing.

To run all tests do: 

```bash
npm run test
```

To run a specific test run:

```bash
npm run test -t <module_name>
```

#### File hierarchy

The convention here is to place a `__tests__` dir inside each module and an `index.spec.ts` file inside it that contains all tests for that module. 

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment and Pipelines

