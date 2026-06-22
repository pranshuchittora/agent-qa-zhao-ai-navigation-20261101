import { useEffect } from 'react';
import { useLocation } from 'react-router';

/** 路由切换时滚动到页面顶部 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
