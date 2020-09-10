module.exports = function ({ addComponents, theme }) {
  const screens = theme('screens');

  const selector = theme('breakpointHelper.selector', '.breakpoint-helper');
  const pseudo = theme('breakpointHelper.pseudo', '::after');
  const hideOnHover = theme('breakpointHelper.hideOnHover', true);
  const hideOnProduction = theme('breakpointHelper.hideOnProduction', true);
  const userStyles = theme('breakpointHelper.style', {});

  const defaultPosition = ['bottom', 'left'];
  const position = theme('breakpointHelper.position', defaultPosition);
  const positionY = position[0] || defaultPosition[0];
  const positionX = position[1] || defaultPosition[1];

  let component = {};

  component[`${selector}${pseudo}`] = Object.assign(
    {
      position: 'fixed',
      zIndex: '2147483647',
      [positionY]: '0',
      [positionX]: '0',
      padding: '0.33rem 0.5rem',
      borderRadius: '2px',
      fontSize: '0.75rem',
      lineHeight: '1rem',
      fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
      backgroundColor: '#000',
      color: '#fff',
      content: `'default (0px)'`,
    },
    userStyles,
  );

  if (hideOnHover) {
    component[`${selector}:hover${pseudo}`] = {
      display: 'none',
    };
  }

  Object.entries(screens).forEach(([screen, value]) => {
    let style = {};
    style[`${selector}${pseudo}`] = {
      content: `'${screen} (${value})'`,
    };
    component[`@screen ${screen}`] = style;
  });

  if (hideOnProduction && process.env.NODE_ENV !== 'production') addComponents(component);
};
