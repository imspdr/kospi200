import { FC } from 'react';
import { Typography, useDeviceType } from '@imspdr/ui';
import { Header, PriceSummary, TitleBlock } from './styled';

interface DetailHeaderProps {
  name: string;
  code: string;
  todayPrice: number;
  changePercent: number;
}

export const DetailHeader: FC<DetailHeaderProps> = ({ name, code, todayPrice, changePercent }) => {
  const { isPc } = useDeviceType();
  const absChangePercent = Math.abs(changePercent);

  return (
    <Header>
      <TitleBlock>
        <Typography variant="title" level={isPc ? 2 : 5} bold>
          {name}
        </Typography>
        <Typography variant="caption" color="foreground.3">
          {code}
        </Typography>
      </TitleBlock>
      <PriceSummary>
        <Typography
          variant="title"
          level={isPc ? 1 : 4}
          color={changePercent > 0 ? 'danger.1' : changePercent < 0 ? 'info.1' : 'foreground.3'}
          bold
        >
          {todayPrice.toLocaleString()}
        </Typography>
        <Typography variant="body" level={isPc ? 2 : 3} color={changePercent >= 0 ? 'danger.1' : 'info.1'} bold>
          {changePercent >= 0 ? '▲' : '▼'} {absChangePercent.toFixed(2)}%
        </Typography>
      </PriceSummary>
    </Header>
  );
};
