# @workspace/utils

Shared utility functions for the monorepo.

## Installation

This package is part of the workspace and can be imported in other packages:

```typescript
// Import all utilities from the barrel export
import {
  isValidUrl,
  capitalize,
  handleErrors,
  assertValue,
} from "@workspace/utils";

// Or import from specific modules
import { isValidUrl, isRelativeUrl } from "@workspace/utils/url";
import { capitalize, getTitleCase } from "@workspace/utils/string";
import {
  convertToSlug,
  parseChildrenToSlug,
} from "@workspace/utils/slug";
import { handleErrors } from "@workspace/utils/error";
import { assertValue } from "@workspace/utils/assert";
```

## Modules

### `@workspace/utils/url`

- `isRelativeUrl(url: string)`: Check if a URL is relative
- `isValidUrl(url: string)`: Validate if a URL is valid (absolute or relative)

### `@workspace/utils/string`

- `capitalize(str: string)`: Capitalize the first letter of a string
- `getTitleCase(name: string)`: Convert camelCase to Title Case

### `@workspace/utils/slug`

- `convertToSlug(text?: string, options?)`: Convert text to URL-friendly slug
- `parseChildrenToSlug(children)`: Convert Portable Text children to slug

### `@workspace/utils/error`

- `handleErrors<T>(promise: Promise<T>)`: Wrap promises with error handling, returns tuple `[data, error]`

### `@workspace/utils/assert`

- `assertValue<T>(v: T | undefined, errorMessage: string)`: Assert that a value is defined, throws if undefined
