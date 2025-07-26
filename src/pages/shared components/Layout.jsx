// components/Layout.jsx
import MenuBar from './MenuBar';
import { Outlet } from 'react-router-dom';
export default function Layout() {
  return (
    <>
      <MenuBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
