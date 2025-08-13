import { Outlet } from 'react-router-dom';
import MainflowNavbar from './MainflowNavbar';
import MainflowFooter from './MainflowFooter';
export default function t() {
  return (
    <>
      <MainflowNavbar />
      <main>
        <Outlet />
      </main>
      <MainflowFooter/>
    </>
  );
}
