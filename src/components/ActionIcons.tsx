import useEmotionCss from "@/hooks/useEmotionCss";
import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from "@ant-design/icons";
import classNames from 'classnames';

const ActionIcons = () => {
  const langClassName = useEmotionCss(({ token }) => ({
    color: token.colorFill,
    '&:hover': {
      color: token.colorPrimaryActive
    }
  }));
  const twClass = 'ml-2 text-2xl align-middle cursor-pointer transition-colors duration-300'
  return (
    <>
      <AlipayCircleOutlined
        key="AlipayCircleOutlined"
        className={classNames(langClassName, twClass)}
      />
      <TaobaoCircleOutlined
        key="TaobaoCircleOutlined"
        className={classNames(langClassName, twClass)}
      />
      <WeiboCircleOutlined
        key="WeiboCircleOutlined"
        className={classNames(langClassName, twClass)}
      />
    </>
  );
};
export default ActionIcons;