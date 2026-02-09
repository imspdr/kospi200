import { useState } from "react";

import {
  HiChevronDoubleDown,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronDoubleUp,
  HiClock,
  HiStar,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Typography, useDeviceType } from "@imspdr/ui";
import { useStocks } from "../../hooks/useKospiData";
import { useRecentlyViewed } from "../../hooks/useRecentlyViewed";
import { useStarred } from "../../hooks/useStarred";
import { StockMiniCard } from "../StockMiniCard";
import {
  EmptyMessage,
  FoldButton,
  MobileFoldButton,
  SectionTitle,
  SidebarContainer,
  SidebarContent,
  SidebarMain,
  SidebarSection,
  TabBar,
  TabButton,
} from "./styled";

interface SidebarProps {
  isFolded: boolean;
  onToggleFold: () => void;
}

export default function Sidebar({ isFolded, onToggleFold }: SidebarProps) {
  const navigate = useNavigate();
  const { data: stocks } = useStocks();
  const { isPc } = useDeviceType();
  const { toggleStar, isStarred, starredStocks } = useStarred(stocks ?? []);
  const { recentlyViewedStocks } = useRecentlyViewed(stocks ?? []);

  const [activeTab, setActiveTab] = useState<"starred" | "recent">("recent");

  const handleStockClick = (code: string) => {
    navigate(`/detail/${code}`);
    if (!isPc && !isFolded) {
      onToggleFold();
    }
  };

  const renderStockList = (stocks: any[]) => {
    return stocks.map((stock) => (
      <StockMiniCard
        key={stock.code}
        name={stock.name}
        code={stock.code}
        price={stock.today}
        change={stock.today - stock.last}
        changePercent={((stock.today - stock.last) / stock.last) * 100}
        toBuy={stock.toBuy}
        isStarred={isStarred(stock.code)}
        onToggleStar={() => toggleStar(stock.code)}
        onClick={() => handleStockClick(stock.code)}
        isFolded={isFolded}
      />
    ));
  };

  const currentStocks = activeTab === "starred" ? starredStocks : recentlyViewedStocks;
  const tabLabel = activeTab === "starred" ? "관심 종목" : "최근 본 종목";
  const tabIcon = activeTab === "starred" ? <HiStar /> : <HiClock />;

  const getFoldIcon = () => {
    if (isPc) {
      return isFolded ? <HiChevronDoubleLeft size={24} /> : <HiChevronDoubleRight size={24} />;
    }
    return isFolded ? <HiChevronDoubleUp size={24} /> : <HiChevronDoubleDown size={24} />;
  };

  return (
    <SidebarContainer isFolded={isFolded}>
      {!isFolded && (
        <SidebarMain isFolded={isFolded}>
          <SidebarContent>
            <SidebarSection>
              <SectionTitle>
                {tabIcon}
                <Typography variant="title" level={5} color="foreground.3" bold>
                  {tabLabel}
                </Typography>
              </SectionTitle>
              {currentStocks.length === 0 ? (
                <EmptyMessage>
                  <Typography variant="body" level={2}>
                    {activeTab === "starred" ? "관심 종목이 없습니다." : "최근 본 종목이 없습니다."}
                  </Typography>
                </EmptyMessage>
              ) : (
                renderStockList(currentStocks)
              )}
            </SidebarSection>
          </SidebarContent>
        </SidebarMain>
      )}

      <TabBar>
        {isPc && <FoldButton onClick={onToggleFold}>{getFoldIcon()}</FoldButton>}

        <TabButton
          isActive={activeTab === "starred"}
          onClick={() => {
            setActiveTab("starred");
            if (isFolded) onToggleFold();
          }}
          title="관심 종목"
        >
          <HiStar size={24} />
        </TabButton>

        <TabButton
          isActive={activeTab === "recent"}
          onClick={() => {
            setActiveTab("recent");
            if (isFolded) onToggleFold();
          }}
          title="최근 본 종목"
        >
          <HiClock size={24} />
        </TabButton>
      </TabBar>

      {!isPc && !isFolded && (
        <MobileFoldButton onClick={onToggleFold}>
          <HiChevronDoubleDown size={12} />
        </MobileFoldButton>
      )}
    </SidebarContainer>
  );
}
