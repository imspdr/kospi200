import { FC } from 'react';
import { Typography } from '@imspdr/ui';
import { HeaderContainer, TitleSection, PriceSection, NameWrapper } from './styled';

interface MobileDetailHeaderProps {
  name: string;
  code: string;
  todayPrice: number;
  changePercent: number;
}

export const MobileDetailHeader: FC<MobileDetailHeaderProps> = ({
  name,
  code,
  todayPrice,
  changePercent,
}) => {
  const absChangePercent = Math.abs(changePercent);
  const priceColor = changePercent > 0 ? 'danger.1' : changePercent < 0 ? 'info.1' : 'foreground.3';

  return (
    <HeaderContainer>
      <TitleSection>
        <NameWrapper>
          <Typography variant="title" level={5} bold>
            {name}
          </Typography>
        </NameWrapper>
        <Typography variant="caption" color="foreground.3">
          {code}
        </Typography>
      </TitleSection>
      <PriceSection>
        <Typography variant="title" level={4} color={priceColor} bold>
          {todayPrice.toLocaleString()}
        </Typography>
        <Typography variant="body" level={3} color={priceColor} bold>
          {changePercent >= 0 ? '▲' : '▼'} {absChangePercent.toFixed(2)}%
        </Typography>
      </PriceSection>
    </HeaderContainer>
  );
};
