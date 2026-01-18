
import PageLayout from '@/components/PageLayout';
import { ThemeConsumer, ThemeProvider } from '@/components/Provider/Theme';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { saveUserInfoByAmount, selectUser } from '@/store/user/userSlice';
import type { ThemeConfig } from 'antd';
import { ConfigProvider, Layout, message } from 'antd';
import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  redirect,
  Route,
  RouterProvider,
  type LoaderFunctionArgs
} from 'react-router-dom';
import { getCurrentUser } from './api/self';
import FullPageLoading from './components/FullPageLoading';
import './i18n';
import { clearAllCookies } from './utils/cookie';
import { clearAllStorage, getToken } from './utils/storage';
import UserDetailPage from './views/UserDetail';

const Index = lazy(() => import('@/views/Index'));
const Dashboard = lazy(() => import('@/views/Dashboard'));
const Setting = lazy(() => import('@/views/Setting'));
const Chart = lazy(() => import('@/views/Chart'));
const User = lazy(() => import('@/views/admin/User'));
const Role = lazy(() => import('@/views/admin/Role'));
const Permission = lazy(() => import('@/views/admin/Permission'));
const ErrorPage = lazy(() => import('./error-page'));
const NotFoundPage = lazy(() => import('./404-not-found'));

const Login = lazy(() => import('@/views/Login'));

interface ThemeContextProps {
  defaultTheme: ThemeConfig;
}

const App = () => {
  const { userInfo } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  console.log('用户信息： ', userInfo);

  const protectedLoader = async ({ request }: LoaderFunctionArgs) => {
    if (userInfo) return null;
    try {
      const result = await getCurrentUser();
      if (result) {
        dispatch(saveUserInfoByAmount(result));
        return null;
      }
      clearAllStorage();
      clearAllCookies();
      throw Error('登录过期, 请重新登录');
    } catch (error) {
      const params = new URLSearchParams();
      const pathname = new URL(request.url).pathname;
      params.set('redirect', pathname);
      message.success(error as string);
      return redirect(`/login?${params.toString()}`);
    }
  };

  const loginLoader = () => getToken() ? redirect('/') : null

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={<PageLayout />}
          errorElement={<ErrorPage />}
          loader={protectedLoader}
        >
          <Route index element={<Index />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="setting" element={<Setting />} />
          <Route path="admin">
            <Route index element={<Navigate to="user" replace />} />
            <Route path="user" element={<User />} />
            <Route path="user/:id" element={<UserDetailPage />} />
            <Route path="role" element={<Role />} />
            <Route path="permission" element={<Permission />} />
          </Route>
          <Route path="chart" element={<Chart />} />
        </Route>
        <Route path="login" element={<Login />} loader={loginLoader} />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </>
    )
  );

  return (
    <ThemeProvider>
      <ThemeConsumer>
        {({ defaultTheme }: ThemeContextProps) => {
          return (
            <ConfigProvider theme={{
              ...defaultTheme,
            }}>
              <Suspense fallback={<FullPageLoading />}>
                <Layout>
                  <RouterProvider router={router} />
                </Layout>
              </Suspense>
            </ConfigProvider>
          );
        }}
      </ThemeConsumer>
    </ThemeProvider >
  );
};

export default App;