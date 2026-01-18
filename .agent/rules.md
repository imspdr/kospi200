# Project Architecture & Coding Standards

## 1. Architecture: Hook-Based Separation of Concerns
The project follows a strict separation between View (UI) and Logic (Business Rules).

-   **Pages (`src/pages`)**:
    -   Focus strictly on **UI composition** and **rendering**.
    -   Do **not** implement business logic (fetching, state mutation, headers handling) directly in the Page component.
    -   **Pattern**: Call a custom hook (e.g., `useQuiz`, `useDetail`) to retrieve state and handlers, then pass them to child components or render based on simple conditions (e.g., `isLoading`).

-   **Custom Hooks (`src/hooks`)**:
    -   Encapsulate **ALL** business logic, API calls, side effects (`useEffect`), and local/global state management.
    -   Return only the data and action handlers needed by the Page.
    -   Naming convention: `use{PageName}` or `use{FeatureName}` (e.g., `useUploadPage`).

## 2. UI Library Usage (`@imspdr/ui`)
Strict adherence to the design system components is required.

-   **Typography**:
    -   **MUST** use the `Typography` component for all text content.
    -   Avoid native HTML text tags (`<p>`, `<span>`, `<div>` for text) unless wrapped in `Typography`.
    -   Example: `<Typography variant="body" level={1}>Hello</Typography>`

-   **Buttons**:
    -   **MUST** use the `Button` component from `@imspdr/ui`.
    -   **Do NOT** wrap `Button` in `styled-components` (e.g., `const StyledButton = styled(Button)...`) to override its internal styles.
    -   Use the `Button` "as-is" to maintain design system consistency.
    -   If layout adjustments are needed (margin, width), use inline `style` or a wrapper `div`, or pass standard props if supported.

## 3. Styling & Theming
-   **CSS Variables**: Always use the defined CSS variables for colors to ensure precise theming (Dark/Light mode support).
    -   Backgrounds: `var(--imspdr-background-bg1)`, `var(--imspdr-background-bg2)`
    -   Foregrounds/Text: `var(--imspdr-foreground-fg1)` (Primary), `var(--imspdr-foreground-fg2)` (Secondary)
    -   Highlights: `var(--imspdr-mint-mint1)`, `var(--imspdr-border-border1)`
-   **Header/Nav Items**: Buttons placed in headers or navigation bars should generally match the background color of the container (`var(--imspdr-background-bg1)`) and have no border (`border: none`) to blend in.
