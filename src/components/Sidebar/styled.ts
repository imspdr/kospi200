import styled from "@emotion/styled";
import { SIDEBAR_WIDTH, TAB_BAR_WIDTH } from "../../constants/layout";

export const SidebarContainer = styled.aside<{ isFolded: boolean }>`
  width: ${({ isFolded }) => (isFolded ? `${TAB_BAR_WIDTH}px` : `${SIDEBAR_WIDTH}px`)};
  height: calc(100vh - 60px);
  position: fixed;
  right: 0;
  top: 60px;
  background: var(--imspdr-background-bg1);
  border-left: 1px solid var(--imspdr-background-bg3);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  z-index: 900;
  overflow: hidden;

  @media (max-width: 1080px) {
    box-shadow: ${({ isFolded }) => (isFolded ? "none" : "-8px 0 24px var(--imspdr-shadow)")};
  }

  @media (max-width: 767px) {
    width: 100vw;
    height: ${({ isFolded }) => (isFolded ? "60px" : "50vh")};
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    flex-direction: column-reverse; /* TabBar at bottom */
    border-left: none;
    border-top: 1px solid var(--imspdr-background-bg3);
    box-shadow: 0 -8px 24px var(--imspdr-shadow);
  }
`;

export const SidebarMain = styled.div<{ isFolded: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  opacity: ${({ isFolded }) => (isFolded ? 0 : 1)};
  transition: opacity 0.2s;
  min-width: 0;
`;

export const SidebarContent = styled.div`
  flex: 1;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const TabBar = styled.div`
  width: ${TAB_BAR_WIDTH}px;
  height: 100%;
  background: var(--imspdr-background-bg1);
  border-left: 1px solid var(--imspdr-background-bg3);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12px;
  gap: 16px;
  flex-shrink: 0;

  @media (max-width: 767px) {
    width: 100%;
    height: 60px;
    flex-direction: row;
    justify-content: space-around;
    padding-top: 0;
    border-left: none;
    border-top: 1px solid var(--imspdr-background-bg3);
    gap: 0;
  }
`;

const SidebarIconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--imspdr-foreground-fg2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  @media (hover: hover) {
    &:hover {
      background: var(--imspdr-background-bg2);
      color: var(--imspdr-primary-main);
    }
  }
`;

export const TabButton = styled(SidebarIconButton)<{ isActive?: boolean }>`
  background: ${({ isActive }) => (isActive ? "var(--imspdr-background-bg3)" : "transparent")};
  color: ${({ isActive }) =>
    isActive ? "var(--imspdr-primary-main)" : "var(--imspdr-foreground-fg2)"};
`;

export const FoldButton = styled(SidebarIconButton)`
  margin-bottom: 24px;
  @media (max-width: 767px) {
    margin-bottom: 0;
  }
`;

export const SidebarSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SectionTitle = styled.div`
  padding: 0 4px;
  display: flex;
  align-items: center;
  color: var(--imspdr-foreground-fg3);
`;

// ... existing code ...
export const EmptyMessage = styled.div`
  padding: 20px 8px;
  text-align: center;
  color: var(--imspdr-foreground-fg3);
`;

export const MobileFoldButton = styled.button`
  width: 100%;
  height: 24px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--imspdr-foreground-fg2);
  cursor: pointer;
  flex-shrink: 0;
`;
