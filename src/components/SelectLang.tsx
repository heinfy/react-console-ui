import { locales } from "@/locales";
import { setStorage } from "@/utils/storage";
import { Dropdown, Space } from "antd";
import { useTranslation } from "react-i18next";

const Lang = () => {
  const { i18n } = useTranslation();
  const langMenu = {
    items: Object.entries(locales).map(([key, { lang }]) => ({
      key: key,
      label: (
        <Space>
          <span style={{ marginRight: '8px' }}>{key}</span>
          {lang}
        </Space>
      )
    })),
    selectedKeys: [i18n.language],
    onClick: ({ key }: { key: string }) => {
      setStorage('locale', key);
      document.documentElement.lang = key;
      i18n.changeLanguage(key);
    }
  };
  return (
    <Dropdown menu={langMenu} placement="bottomRight">
      <span className="cursor-pointer p-3 inline-flex items-center justify-center text-lg align-middle">
        <i className="anticon">
          <svg
            aria-hidden="true"
            fill="currentColor"
            focusable="false"
            height="1em"
            viewBox="0 0 24 24"
            width="1em"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              className="css-c4d79v"
              d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
            />
          </svg>
        </i>
      </span>
    </Dropdown>
  );
};

export default Lang