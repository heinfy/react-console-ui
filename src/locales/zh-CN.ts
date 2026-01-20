const settingDrawer = {
  'menu.login': '登录',
  'app.copyright.produced': '基于 Ant Design Proview 构建',
  // 头像下拉菜单
  'layout.header.user.center': '个人中心',
  'layout.header.user.setting': '个人设置',
  'layout.header.user.logout': '退出登录',
  'layout.header.logout.success': '退出成功',
  // 错误页
  'pages.error.title': 'Oops!',
  'pages.error.description': '抱歉，发生了意外错误。',
  // 登录页
  'pages.login.success': '登录成功',
  'pages.login.failure': '登录失败，请重试！',
  'pages.login.title': '管理控制台',
  'pages.login.description': '后台管理系统，专注于用户和权限以及系统事务的管理',
  'pages.login.accountLogin.tab': '邮箱密码登录',
  'pages.login.accountLogin.errorMessage':
    '错误的邮箱和密码(admin@example.com/password123)',
  'pages.login.email.placeholder': '邮箱: admin@example.com',
  'pages.login.email.required': '邮箱是必填项！',
  'pages.login.password.placeholder': '密码: password123',
  'pages.login.password.required': '密码是必填项！',
  'pages.login.phoneLogin.tab': '手机号登录',
  'pages.login.phoneLogin.errorMessage': '验证码错误',
  'pages.login.phoneNumber.placeholder': '请输入手机号！',
  'pages.login.phoneNumber.required': '手机号是必填项！',
  'pages.login.phoneNumber.invalid': '不合法的手机号！',
  'pages.login.captcha.placeholder': '请输入验证码！',
  'pages.login.captcha.required': '验证码是必填项！',
  'pages.login.phoneLogin.getVerificationCode': '获取验证码',
  'pages.getCaptchaSecondText': '秒后重新获取',
  'pages.login.rememberMe': '记住我',
  'pages.login.forgotPassword': '忘记密码 ?',
  'pages.login.submit': '登录',
  'pages.login.loginWith': '其他登录方式 :',
  'pages.login.registerAccount': '注册邮箱',
  // 404 页面
  'pages.notfound.404.subTitle': '抱歉，你访问的页面不存在',
  'pages.notfound.404.backHome': '返回首页',
  // 复制组件
  'com.copyableText.copySuccess': '已复制',
  'com.copyableText.clickToCopy': '点击复制'
};

const zhLocal = {
  lang: '简体中文',
  ...settingDrawer
};

export default zhLocal;
