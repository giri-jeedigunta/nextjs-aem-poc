import React from 'react';
import Head from "next/head";
import { ContainerState, Page, PageProperties, withModel } from '@adobe/aem-react-editable-components';
import '../components';
class App extends Page<PageProperties, ContainerState> {
  render() {
    return (
      <>
        <Head>
          <title>NextJS + AEM</title>
        </Head>      
        {this.childComponents}
        {this.childPages}
      </>
    );
  }
}

export default withModel(App);