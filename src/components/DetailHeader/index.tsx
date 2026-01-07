import { FC } from 'react';
import { Typography } from '@imspdr/ui';
import { Header, PriceSummary } from './styled';

interface DetailHeaderProps {
  name: string;
  code: string;
  todayPrice: number;
  changePercent: number;
}

export const DetailHeader: FC<DetailHeaderProps> = ({ name, code, todayPrice, changePercent }) => {
  const absChangePercent = Math.abs(changePercent);

  return (
    <Header>
      <div>
        <Typography variant="title" level={2}>
          {name}
        </Typography>
        <Typography variant="caption" style={{ color: '#666' }}>
          {code}
        </Typography>
      </div>
      <PriceSummary>
        <Typography
          variant="title"
          level={1}
          style={{
            color: changePercent > 0 ? '#e23d29' : changePercent < 0 ? '#1e75d0' : '#999999',
          }}
        >
          {todayPrice.toLocaleString()}
        </Typography>
        <Typography
          variant="body"
          level={1}
          style={{
            color: changePercent > 0 ? '#e23d29' : changePercent < 0 ? '#1e75d0' : '#999999',
            fontWeight: 600,
          }}
        >
          {changePercent > 0 ? '▲' : changePercent < 0 ? '▼' : '-'}{' '}
          {absChangePercent !== 0 && `${absChangePercent.toFixed(2)}%`}
        </Typography>
      </PriceSummary>
    </Header>
  );
};
