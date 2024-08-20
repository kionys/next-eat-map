import "@components/styles/globals.css";
import { Layout } from "components/layout";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const { session } = pageProps;

  return (
    <QueryClientProvider client={queryClient}>
      {/* next auth - session provider */}
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools />
      </SessionProvider>
    </QueryClientProvider>
  );
};
export default App;
