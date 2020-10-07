module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  env: {
    test: {
      presets: ['@babel/preset-env', '@babel/react', 'next/babel'],
    },
    development: {
      presets: ['next/babel'],
    },
  },
};
