import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const { t } = useTranslation();
  const error: unknown = useRouteError();

  // 类型守卫函数
  const getErrorMessage = (err: unknown) => {
    if (err && typeof err === 'object') {
      if ('statusText' in err && typeof err.statusText === 'string') {
        return err.statusText;
      }
      if ('message' in err && typeof err.message === 'string') {
        return err.message;
      }
    }
    return String(err);
  };

  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  };

  return (
    <div id="error-page" style={style}>
      <h1>{t('pages.error.title')}</h1>
      <p>{t('pages.error.description')}</p>
      <p>
        <i>{getErrorMessage(error)}</i>
      </p>
    </div>
  );
}