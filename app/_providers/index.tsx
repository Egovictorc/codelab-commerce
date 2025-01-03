import { ReactNode } from "react";
import AppSnackbarProvider from "./AppSnackbarProvider";
import { StoreProvider } from "./StoreProvider";
import AppQueryClientProvider from "./AppQueryClientProvider";

type Props = {
  children: ReactNode;
};
const Providers: React.FC<Props> = ({ children }) => {
  return (
    <StoreProvider>
      <AppQueryClientProvider>
        <AppSnackbarProvider>{children}</AppSnackbarProvider>;
      </AppQueryClientProvider>
    </StoreProvider>
  );
};

export default Providers;
