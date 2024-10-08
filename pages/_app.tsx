import "@components/styles/globals.css";
import { Layout } from "components/layout";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const { session } = pageProps;

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {/* next auth - session provider */}
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer
              autoClose={1000}
              pauseOnFocusLoss={false}
              pauseOnHover={false}
            />
          </Layout>
          <ReactQueryDevtools />
        </SessionProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};
export default App;
