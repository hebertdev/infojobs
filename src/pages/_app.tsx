import { useState } from "react";
import NextApp, { AppProps, AppContext } from "next/app";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { Layout } from "layout/Layout";

//react query
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

//redux
import { Provider as ReduxProvider } from "react-redux";
import { store } from "store/index";

//context
import { UserContextProvider } from "@/contexts/UserContext";

//components
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <MantineProvider
          withNormalizeCSS
          withGlobalStyles
          theme={{
            colors: {
              brand: [
                "#E9F5FB",
                "#C2E3F5",
                "#9AD0EE",
                "#73BEE8",
                "#4CACE1",
                "#2499DB",
                "#2088c2", //this ##2088c2
                "#165C83",
                "#0E3D58",
                "#071F2C",
              ],
            },
            colorScheme: "light",
            primaryColor: "brand",
          }}
        >
          <ReduxProvider store={store}>
            <UserContextProvider>
              <NextNProgress color="#2088c2" height={5} />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </UserContextProvider>
          </ReduxProvider>
        </MantineProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
  };
};
