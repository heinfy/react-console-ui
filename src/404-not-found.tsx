import { Button, Layout, Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Layout>
      <Result
        status="404"
        title="404"
        subTitle={t('pages.notfound.404.subTitle')}
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            {t('pages.notfound.404.backHome')}
          </Button>
        }
      />
    </Layout>
  );
}
