// components/CopyableText.tsx
import { CopyOutlined } from '@ant-design/icons';
import { Space, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

interface CopyableTextProps {
  text: string;
  maxLength?: number; // 默认 50
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
}

const CopyableText: React.FC<CopyableTextProps> = ({
  text,
  maxLength = 50,
  tooltipPlacement = 'top',
}) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const displayText = text.length > maxLength
    ? text.substring(0, maxLength) + '...'
    : text;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2秒后恢复
  };

  return (
    <Space size={4} align="center">
      <Text
        style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}
        title={text}
      >
        {displayText}
      </Text>
      <CopyToClipboard text={text} onCopy={handleCopy}>
        <Tooltip
          title={copied ? t('com.copyableText.copySuccess') : t('com.copyableText.clickToCopy')}
          placement={tooltipPlacement}
        >
          <CopyOutlined
            style={{
              color: copied ? '#52c41a' : '#1677ff',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          />
        </Tooltip>
      </CopyToClipboard>
    </Space>
  );
};

export default CopyableText;