import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-WPWRSDCCNF', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};

export default PageTracker;