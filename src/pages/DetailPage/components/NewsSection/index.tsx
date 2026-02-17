import { FC } from 'react';
import { Typography } from '@imspdr/ui';
import { NewsItem, Section, NewsItemTitle } from './styled';

interface NewsItemData {
  title: string;
  description: string;
  link: string;
}

interface NewsSectionProps {
  news?: NewsItemData[];
}

export const NewsSection: FC<NewsSectionProps> = ({ news }) => {
  return (
    <Section>
      {news && news.length > 0 ? (
        news.map((item, index) => (
          <NewsItem key={index} onClick={() => window.open(item.link, '_blank')}>
            <NewsItemTitle>
              <Typography variant="body" level={2} color="foreground.1" bold>
                {item.title}
              </Typography>
            </NewsItemTitle>
          </NewsItem>
        ))
      ) : (
        <Typography variant="body" level={2} color="foreground.3">
          뉴스가 없습니다.
        </Typography>
      )}
    </Section>
  );
};
