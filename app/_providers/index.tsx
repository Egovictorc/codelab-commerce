import { ReactNode } from "react";
import AppSnackbarProvider from "./AppSnackbarProvider";
import { StoreProvider } from "./StoreProvider";

type Props = {
  children: ReactNode;
};
const Providers: React.FC<Props> = ({ children }) => {
  return (
    <StoreProvider>
      <AppSnackbarProvider>{children}</AppSnackbarProvider>;
    </StoreProvider>
  );
};

export default Providers;
