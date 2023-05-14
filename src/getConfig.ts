import findupSync from 'findup-sync';

const getConfig = () => {
  const path = findupSync('quarks.config.ts');

  const config = path && require(path);

  return config;
};

export default getConfig;
