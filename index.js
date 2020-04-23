module.exports = {
  plugins: [
    function({ addComponents, theme }) {
      const screens = theme('screens');
      const userOptions = theme('breakpointHelper.options', {
        selector: '.breakpoint-helper::after',
      });
      let component = {};
      component[`${userOptions.selector}`] = {
        position: 'fixed',
        zIndex: '2147483647',
        left: '0',
        bottom: '1rem',
        padding: '0.33rem 0.5rem',
        borderRadius: '0 0.33rem 0.33rem 0',
        fontSize: '1rem',
        lineHeight: '1',
        fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
        backgroundColor: '#000',
        color: '#fff',
        content: `'[none]: 0px'`,
      };

      Object.entries(screens).forEach(([screen, value]) => {
        let style = {};
        style[`${userOptions.selector}`] = {
          content: `'${screen}: ${value}'`,
        };
        component[`@screen ${screen}`] = style;
      });

      addComponents(component);
    },
  ],
};
