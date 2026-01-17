import AppsLogo from "@/components/AppsLogo";

const LogoAndTitle = (
  props: {
    isMobile?: boolean;
  }
): React.ReactNode => {
  const { isMobile } = props;

  const logoDom = <AppsLogo />;

  if (isMobile) {
    return <span key="title">{logoDom}</span>;
  }
  return (
    <span key="title">
      {logoDom}
      <h1>{'Ant Design Pro'}</h1>
    </span>
  );
};

export default LogoAndTitle