import { FC, ReactNode } from 'react';
import { Typography } from '@imspdr/ui';
import { BadgeContainer } from './styled';

interface SignalBadgeProps {
  children: ReactNode;
}

export const SignalBadge: FC<SignalBadgeProps> = ({ children }) => {
  return (
    <BadgeContainer>
      <Typography variant="caption" color="white" level={2} bold>
        {children}
      </Typography>
    </BadgeContainer>
  );
};
