# Contributing Guidelines
Please feel free to propose changes to this document by opening issue if there is any missing or unclear guideline. Also, please take a moment to review this document in order to make the contribution process easy and effective for everyone involved.

## Code guidelines

### JavaScript

We follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

### CSS
```bash
// TODO
```

### Handle broken changes with previous version

Please make sure to your changes are backward compatible with the previous version, and handle it by using `console.warn` and `/** @deprecated */`. For example:

```bash
static propTypes = {
  /** @deprecated Please use `size` */
  variant: string, // TODO: `variant` is deprecated
};

componentDidMount() {
  if (this.props.variant) {
    // eslint-disable-next-line no-console
    console.warn(`[PinInput] prop `variant` is deprecated. 
      Please check documentation for better alternative.`);
  }
}

render() {
  const { variant, size } = this.props;
  return (
    <Comp
      size={variant || size} // TODO: `variant` is deprecated
    />
  )
}
```

### Handle incorrect usage by developers

Please handle possible incorrect usages from developers by using `console.warn` and related propTypes. For example:

```bash
componentDidMount() {
  if (this.props.current && this.props.onChange === noop) {
    // eslint-disable-next-line no-console
    console.warn(
      'No `onChange` handler provided with `current` prop. This will render a read-only component.'
    );
  }
}
```

## Components structure

### Folder structure

```bash
// TODO
```

### Import ordering

```bash
// TODO
```

### Prop-types and default props

```bash
// TODO
```

### Handler binding

```bash
// TODO
```

## Issues

We are using [Issues](https://git.easygroup.co/lalamove/karang/issues) for our bugs/features requests/issues.

### Labels

There are several labels to help us organize and identify issues.

- `WIP` - Issues that we are currently working on.
- `up next` - Issues that we will work in next sprint / coming few weeks.
- `bug` - Issues that are reported to us. Please follow Bug reports section for the format of bugs reporting.
- `debt` - Issues that related to known technical debts.
- `discussion` - Issues that open for discussion.
- `feature` - Issues asking for a new feature to be added, or an existing one to be extended. New features require a minor version bump (e.g., `v1.1.0` to `v1.2.0`)
- `docs` - Issues for improving or updating our documentation.
- `test` - Issues for improving or updating our test cases.

### Bug reports

A bug is a demonstrable problem that is caused by the code in the repository. Bug reports are helpful for developers and users. Before reporting the bugs, you may:

- Validate and lint your code
- Search in [issue tracker](https://git.easygroup.co/lalamove/karang/issues)
- Check if the issues have been fixed in [new release](https://git.easygroup.co/lalamove/karang/tags)

Please create an issue in the repository and **use `Bug` template**. 

Try to be as detailed as possible in your bugs report. A well detailed report helps us to identify your problem quickly and help you in a better way.

## Pull requests

Good pull requests are a big help to our repository. Before you submit a pull request, please:

- **Ask first** in Issues if you are working on significant pull request (features, code refactoring) - Don't waste your time to work on the issues that we might not merge / another one is working on
- Check and follow our code guidelines used throughout the project

### Procedures

The following process is the suggested way for you to work on this project:

1. Fork this repo
2. Get the latest changes from `upstream:dev`
3. Create a new feature branch (based on `upstream:dev` branch) to contain your feature, change or fixes
4. Commit your changes
5. If you've fixed a bug or added code that should be tested, add tests
6. Ensure your changes is able to build and pass tests
7. Push your changes to your forked project
8. Rebase the `upstream:dev` branch to your feature branch to keep it up-to-date
9. Open a pull request with title and description, target to `upstream:dev` branch

## Versioning

We follow the Semantic Versioning.

Given a version number `MAJOR.MINOR.PATCH` (e.g. version 2.0.1)

- **MAJOR** version when you make incompatible code changes in the library (e.g. Upgrade required React version from React 16 to 17)
- **MINOR** version when you add functionality in the library (e.g. Add input component)
- **PATCH** version when you make backwards-compatible bug fixes (e.g. Fix UI issues that does not affect functionality)

[Semantic Versioning 2.0.0](https://semver.org/)

## Branches

- **master** - stable release, [https://ui.lalamove.com](https://ui.lalamove.com)
- **dev** - includes latest complete developed features
- **feature/<name>** - works for a specific feature, always created from `dev` and merge to `dev`
- **bugfix/<name>** - work for bugs fixes, always created from `dev` and merge to `dev`

## Git flow

We follow [the GitHub flow](https://guides.github.com/introduction/flow/).

## Release cycle

Right now, we release a new version to `master` in every 2 weeks. Maintainers in this repository are responsible for the release. We follow the procedure below:

1. Related changes passed code review
2. Merge related changes from `dev` to `master` by maintainers
    - Make sure **change the merge commit message to correct format as below** when merging, to allow CI to trigger version bump correctly and automatically
    - Merge commit message should start from `MAJOR:` , `MINOR:` or `PATCH:`.
