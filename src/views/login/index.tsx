import { defaultVar } from '@/config/index';
import { useAppDispatch } from '@/store/hooks';
import { saveUserInfoByAmount } from '@/store/user/userSlice';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { login } from '@/api/auth';
import { getCurrentUser } from '@/api/self';
import ActionIcons from '@/components/ActionIcons';
import AppsLogo from '@/components/AppsLogo';
import { DefaultFooter as Footer } from '@/components/Footer';
import SelectLang from '@/components/SelectLang';
import { lightTheme } from '@/context/ThemeContext';
import useEmotionCss from '@/hooks/useEmotionCss';
import type { LoginBody } from '@/types/auth';
import { getStorage, setStorage, setToken, THEME_MODE, TOKEN_TYPE } from '@/utils/storage';
import classNames, { length } from 'classnames';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const mode = getStorage(THEME_MODE) || lightTheme.mode;
  const [count, setCount] = useState<number>(60);
  const [timing, setTiming] = useState(false);
  const [loading, setLoading] = useState<boolean>();
  const [type, setType] = useState<string>('account');

  // 从本地存储获取初始类型值
  const rememberMe = JSON.parse(getStorage('rememberMe') || 'null');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      if (rememberMe) {
        form.setFieldsValue(rememberMe);
      } else {
        form.setFieldsValue({
          email: 'admin@example.com',
          password: 'admin123'
        });
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsInitialized(true);
    }
  }, [rememberMe, form, isInitialized]);

  // 获取用户信息
  const fatchUserData = async () => {
    const userInfo = await getCurrentUser();
    // 保存用户信息
    dispatch(saveUserInfoByAmount(userInfo));
    message.success(t('pages.login.success'));
  };
  // 登录
  const handleSubmit = async (values: LoginBody) => {
    const body: LoginBody = { type, rememberMe: !!values.rememberMe };
    if (type === 'account') {
      body.email = values.email;
      body.password = values.password;
    } else if (type === 'mobile') {
      body.mobile = values.mobile;
      body.captcha = values.captcha;
    }
    try {
      // 登录
      const result = await login(body);
      if (values.rememberMe) {
        setStorage('rememberMe', body);
      }
      const { access_token, token_type } = result;
      setToken(access_token)
      setStorage(TOKEN_TYPE, token_type)
      await fatchUserData();
      const urlParams = new URL(window.location.href).searchParams;
      navigate(urlParams.get('redirect') || '/');
    } catch (error) {
      console.log('error', error);
      message.error(error as string);
    }
  };

  const onGetCaptcha = (mobile: string) => {
    if (!mobile) return;
    setTimeout(() => {
      setLoading(true);
      setTiming(true);
    }, 400);
  };

  // 监听秒数
  useEffect(() => {
    let interval = 0;
    if (timing) {
      interval = window.setInterval(() => {
        setCount(preSecond => {
          if (preSecond <= 1) {
            setLoading(false);
            setTiming(false);
            clearInterval(interval);
            // 重置秒数
            return 60;
          }
          return preSecond - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing]);

  const loginClassName = useEmotionCss(({ token }) => ({
    color: token.colorText,
  }));


  return (
    <div className={classNames('flex flex-col h-screen overflow-auto bg-[url(/static/login/bg.png)] bg-[100%_100%]', {
    }, loginClassName)}>
      <Helmet>
        <title>
          {t('menu.login')}- {defaultVar.title}
        </title>
      </Helmet>
      <div
        className="w-10 h-10 leading-10 fixed right-4 rounded-md hover:bg-gray-200/70"
        data-lang
      >
        <SelectLang />
      </div>
      <div className="flex-1 p-[32px]">
        <div className="flex flex-1 flex-col h-full px-2 py-4 overflow-auto bg-inherit">
          <div className="text-center">
            <div className="flex items-center justify-center h-11 lh-11">
              <span className="w-11 h-11 me-4 align-top">
                <AppsLogo className="h-full" width={40} height={40} />
              </span>
              <span className="relative top-0.5 font-semibold text-3xl">
                {t('pages.login.title')}
              </span>
            </div>
            <div className="mt-3 mb-10 text-sm">
              {t('pages.login.description')}
            </div>
          </div>
          <div className="w-[328px] min-w-[280px] max-w-[75vw] mx-auto">
            <Form onFinish={handleSubmit} form={form}>
              <Tabs
                activeKey={type}
                onChange={setType}
                centered
                items={[
                  {
                    key: 'account',
                    label: t('pages.login.accountLogin.tab')
                  },
                  {
                    key: 'mobile',
                    label: t('pages.login.phoneLogin.tab')
                  }
                ]}
              />

              {type === 'account' && (
                <>
                  <Form.Item<LoginBody>
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: t('pages.login.email.required')
                      }
                    ]}
                  >
                    <Input
                      size="large"
                      prefix={<UserOutlined />}
                      placeholder={t('pages.login.email.placeholder')}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: t('pages.login.password.required')
                      }
                    ]}
                  >
                    <Input
                      size="large"
                      prefix={<LockOutlined />}
                      type="password"
                      placeholder={t('pages.login.password.placeholder')}
                    />
                  </Form.Item>
                </>
              )}

              {type === 'mobile' && (
                <>
                  <Form.Item<LoginBody>
                    name="mobile"
                    rules={[
                      {
                        required: true,
                        message: t('pages.login.phoneNumber.required')
                      },
                      {
                        pattern: /^1\d{10}$/,
                        message: t('pages.login.phoneNumber.invalid')
                      }
                    ]}
                  >
                    <Input
                      size="large"
                      disabled
                      prefix={<MobileOutlined />}
                      placeholder={t('pages.login.phoneNumber.placeholder')}
                    />
                  </Form.Item>
                  <Form.Item
                    name="captcha"
                    rules={[
                      {
                        required: true,
                        message: t('pages.login.captcha.required')
                      }
                    ]}
                  >
                    <div className="flex align-center">
                      <Input
                        disabled
                        size="large"
                        prefix={<LockOutlined />}
                        placeholder={t('pages.login.captcha.placeholder')}
                        className="flex-1 mr-4 transition-width duration-300"
                      />
                      <Button
                        className='block'
                        size="large"
                        disabled={timing}
                        loading={loading}
                        onClick={async () => {
                          try {
                            if (form.getFieldValue('mobile')) {
                              await form.validateFields(['mobile']);
                              const mobile = form.getFieldValue('mobile');
                              if (mobile.length === 11) {
                                onGetCaptcha(mobile);
                              }
                            }
                          } catch (error) {
                            console.error(error);
                          }
                        }}
                      >
                        {timing
                          ? `${count} ${t('pages.getCaptchaSecondText')}`
                          : t('pages.login.phoneLogin.getVerificationCode')}
                      </Button>
                    </div>
                  </Form.Item>
                </>
              )}

              <div className='mb-6'>
                <Form.Item noStyle name="rememberMe" valuePropName="checked">
                  <Checkbox>{t('pages.login.rememberMe')}</Checkbox>
                </Form.Item>
                <a className='float-right'>
                  {t('pages.login.forgotPassword')}
                </a>
              </div>
              <div className='flex align-center gap-2'>
                <Button block type="primary" htmlType="submit">
                  {t('pages.login.submit')}
                </Button>
              </div>
            </Form>
            <div className="mt-6 text-sm">
              {t('pages.login.loginWith')} <ActionIcons key="icons" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
