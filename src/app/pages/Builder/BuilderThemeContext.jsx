import React, { createContext, useContext, useMemo } from 'react';

const BuilderThemeContext = createContext();

export const BuilderThemeProvider = ({ theme, children }) => {
  const cssVariables = useMemo(() => {
    if (!theme) return {};
    return {
      '--builder-primary': theme.colors?.primary || '#0ea5e9',
      '--builder-secondary': theme.colors?.secondary || '#1e293b',
      '--builder-background': theme.colors?.background || '#ffffff',
      '--builder-text': theme.colors?.text || '#1e293b',
      '--builder-font-family': theme.typography?.fontFamily || theme.fontFamily || "'Inter', sans-serif",
    };
  }, [theme]);

  return (
    <BuilderThemeContext.Provider value={{ theme }}>
      <div style={cssVariables} className="builder-theme-scope contents">
        {children}
      </div>
    </BuilderThemeContext.Provider>
  );
};

export const useBuilderTheme = () => useContext(BuilderThemeContext);

/**
 * ACTION HANDLER ENGINE
 * Executes logic based on the button action definition.
 */
export const handleBuilderAction = (action, e) => {
  if (e) e.preventDefault();
  if (!action) return;

  const { type, payload } = action;

  switch (type) {
    case 'page': {
      window.dispatchEvent(new CustomEvent('builder-navigate', { detail: payload.toLowerCase() }));
      break;
    }
    case 'link':
      if (payload.startsWith('http')) {
        window.open(payload, '_blank');
      } else if (payload.startsWith('/')) {
        window.location.pathname = payload;
      } else if (payload.startsWith('#')) {
        window.location.hash = payload;
      } else {
        // Assume it's an internal page name (Multi-page system)
        const url = new URL(window.location.href);
        url.searchParams.set('page', payload.toLowerCase());
        window.history.pushState({}, '', url);
        // Force a window popstate event if needed, or just let the app react to URL change
        window.location.reload(); // Simplest way to ensure state syncs across the whole app for now
      }
      break;
    
    case 'mailto':
      window.location.href = `mailto:${payload}`;
      break;

    case 'scroll':
      const element = document.getElementById(payload);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      break;

    case 'modal':
      alert(`Action: Modal triggered with content: ${payload}`);
      break;

    default:
      console.warn(`Unknown action type: ${type}`);
  }
};
