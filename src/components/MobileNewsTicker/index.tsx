import { FC, useEffect, useState } from 'react';
import { Typography } from '@imspdr/ui';
import { TickerContainer, TickerItem } from './styled';

interface NewsItemData {
  title: string;
  description: string;
  link: string;
}

interface MobileNewsTickerProps {
  news?: NewsItemData[];
}

export const MobileNewsTicker: FC<MobileNewsTickerProps> = ({ news }) => {
  const [nowIndex, setNowIndex] = useState(0);

  useEffect(() => {
    if (!news || news.length <= 1) return;

    const timer = setInterval(() => {
      setNowIndex((v) => v + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, [news]);

  if (!news || news.length === 0) return null;

  const divideLength = news.length;
  const currentIndex = nowIndex % divideLength;
  const previousIndex = (nowIndex - 1 + divideLength) % divideLength;

  return (
    <TickerContainer>
      {news.map((item, i) => {
        let status: 'current' | 'previous' | 'hidden' = 'hidden';
        if (i === currentIndex) status = 'current';
        else if (i === previousIndex) status = 'previous';

        return (
          <TickerItem
            key={i}
            status={status}
            onClick={() => window.open(item.link, '_blank')}
          >
            <Typography variant="body" level={3} color="foreground.1" bold>
              {item.title}
            </Typography>
          </TickerItem>
        );
      })}
    </TickerContainer>
  );
};
