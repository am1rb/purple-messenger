const muiStyles = jest.genMockFromModule("@material-ui/styles");

const fakeObj = (parent) =>
  new Proxy(
    {},
    {
      get(target, propKey) {
        return parent ? `${parent}-${propKey}` : propKey;
      },
    }
  );

const fakeCreateStyles = (stylesOrCreator, { name } = {}) => () => {
  return fakeObj(name);
};

muiStyles.makeStyles = fakeCreateStyles;

module.exports = muiStyles;
