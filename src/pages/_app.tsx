import React from "react";
import { AppProps } from "next/app";
import {
  Constants,
  ModelManager,
  ModelClient,
} from "@adobe/aem-spa-page-model-manager";
import { isEmpty } from "lodash";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";
import { useRouter } from "next/router";

//Local
//const modelClient = new ModelClient(`${process.env.NEXT_PUBLIC_PUBLISH_HOST}`);
//const modelClient = new ModelClient(`${process.env.NEXT_PUBLIC_AUTHOR_HOST_LOCAL}`);

ModelManager.initializeAsync();

//Local
// ModelManager.initializeAsync({
//   //path: "/content/poc-spa-site/us/en/home.model.json",
//   modelClient,
// });

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pageModel, updatePageModel] = React.useState<any>({});
  const modelPath =
    router.locale === "se"
      ? "/content/poc-spa-site/sv/se/hem.model.json"
      : "/content/poc-spa-site/us/en/home.model.json";

  React.useEffect(() => {
    //ModelManager.getData(modelPath).then((data) => {
    ModelManager.getData().then((data) => {
      updatePageModel(data);
    }).catch(e => console.log('data error: ', e));
  }, [modelPath]);

  return (
    !isEmpty(pageModel) && (
      <QueryClientProvider client={queryClient}>
        <Component
          {...pageProps}
          cqChildren={pageModel[Constants.CHILDREN_PROP]}
          cqItems={pageModel[Constants.ITEMS_PROP]}
          cqItemsOrder={pageModel[Constants.ITEMS_ORDER_PROP]}
          cqPath={pageModel[Constants.PATH_PROP]}
        />
      </QueryClientProvider>
    )
  );
}

export default App;