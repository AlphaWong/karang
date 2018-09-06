const path = require('path');

module.exports = {
  require: [path.resolve(__dirname, 'styleguide/setup.js')],
  ignore: [
    '**/__tests__/**',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.spec.{js,jsx,ts,tsx}',
    '**/*.d.ts',
    '**/_story.{js,jsx,ts,tsx}',
  ],
  exampleMode: 'expand',
  usageMode: 'expand',
  skipComponentsWithoutExample: true,
  getExampleFilename(componentPath) {
    let ComponentName = componentPath
      .split(path.sep)
      .pop()
      .split('.')
      .shift();

    let p;
    if (ComponentName === 'index') {
      p = path.join(componentPath, '..');
      ComponentName = p.split(path.sep).pop();
    } else {
      p = path.join(componentPath, '../..');
    }

    return path.join(p, `${ComponentName}.md`);
  },
  pagePerSection: true,
  sections: [
    {
      name: 'Introduction',
      content: 'README.md',
    },
    {
      name: 'UI Components',
      components: 'src/components/**/{index,[A-Z]*}.js',
    },
  ],
};