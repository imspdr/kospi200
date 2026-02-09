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
        <Typography variant="title" level={2} bold>
          {name}
        </Typography>
        <Typography variant="caption" color="foreground.3">
          {code}
        </Typography>
      </div>
      <PriceSummary>
        <Typography
          variant="title"
          level={1}
          color={changePercent > 0 ? 'danger.1' : changePercent < 0 ? 'info.1' : 'foreground.3'}
          bold
        >
          {todayPrice.toLocaleString()}
        </Typography>
        <Typography variant="body" level={2} color={changePercent >= 0 ? 'danger.1' : 'info.1'} bold>
          {changePercent >= 0 ? '▲' : '▼'} {absChangePercent.toFixed(2)}%
        </Typography>
      </PriceSummary>
    </Header>
  );
};
