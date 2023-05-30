interface Props {
  children: JSX.Element | JSX.Element[];
}

import { Notifications } from "@mantine/notifications";
import { AppHeader } from "components/Header";

export function Layout({ children }: Props) {
  return (
    <>
      <Notifications />

      <AppHeader />
      {children}
    </>
  );
}
