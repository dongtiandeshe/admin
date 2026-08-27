/* @Author: Duanyt
 * @Date: 2026-08-25 09:17:24
 * @LastEditTime: 2026-08-27 15:19:13
 * @LastEditors: Duanyt
 * @Description: 
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from '@/router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
);
