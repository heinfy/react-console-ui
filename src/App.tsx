
import PageLayout from '@/components/PageLayout';
import { ThemeConsumer, ThemeProvider } from '@/components/Provider/Theme';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { saveUserInfoByAmount, selectUser } from '@/store/user/userSlice';
import type { ConfigProviderProps, ThemeConfig } from 'antd';
import { ConfigProvider, Layout, message } from 'antd';
import { lazy, Suspense, useMemo } from 'react';
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

import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useTranslation } from 'react-i18next';
import { defaultLocale, enUS as enUSKey } from './locales';

console.log('zhCN', zhCN);

type Locale = ConfigProviderProps['locale'];

dayjs.locale('zh-cn');

const Dashboard = lazy(() => import('@/views/Dashboard'));
const Setting = lazy(() => import('@/views/Setting'));
const Chart = lazy(() => import('@/views/Chart'));
const User = lazy(() => import('@/views/admin/User'));
const Role = lazy(() => import('@/views/admin/Role'));
const Permission = lazy(() => import('@/views/admin/Permission'));
const TableList = lazy(() => import('@/views/list/TableList'));
const Markdown = lazy(() => import('@/views/preview/Markdown'));
const Pdf = lazy(() => import('@/views/preview/PDF'));
const ErrorPage = lazy(() => import('./error-page'));
const NotFoundPage = lazy(() => import('./404-not-found'));

const Login = lazy(() => import('@/views/Login'));

interface ThemeContextProps {
  defaultTheme: ThemeConfig;
}

const App = () => {
  const { userInfo } = useAppSelector(selectUser);
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  console.log('用户信息： ', userInfo);

  const locale = useMemo(() => {
    const isDefault = i18n.language === defaultLocale;
    dayjs.locale(isDefault ? defaultLocale : enUSKey);
    return isDefault ? zhCN : enUS;
  }, [i18n.language]) as Locale;

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
          <Route index element={<Dashboard />} />
          <Route path="setting" element={<Setting />} />
          <Route path="admin">
            <Route index element={<Navigate to="user" replace />} />
            <Route path="user" element={<User />} />
            <Route path="user/:id" element={<UserDetailPage />} />
            <Route path="role" element={<Role />} />
            <Route path="permission" element={<Permission />} />
          </Route>
          <Route path="list">
            <Route index element={<Navigate to="table-list" replace />} />
            <Route path="table-list" element={<TableList />} />
          </Route>
          <Route path="preview">
            <Route index element={<Navigate to="markdown" replace />} />
            <Route path="markdown" element={<Markdown />} />
            <Route path="pdf" element={<Pdf />} />
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
            <ConfigProvider locale={locale} theme={{
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