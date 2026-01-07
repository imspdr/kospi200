import { FC } from 'react';
import { Typography } from '@imspdr/ui';
import { NewsItem, Section } from './styled';

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
            <Typography
              variant="body"
              level={2}
              style={{ marginBottom: '8px', fontWeight: 'bold', lineHeight: 1.4 }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body"
              level={2}
              style={{ fontSize: '12px', color: '#666', lineHeight: 1.5 }}
            >
              {item.description.length > 150
                ? item.description.substring(0, 150) + '...'
                : item.description}
            </Typography>
          </NewsItem>
        ))
      ) : (
        <Typography variant="body" level={2} style={{ color: '#999' }}>
          뉴스가 없습니다.
        </Typography>
      )}
    </Section>
  );
};
