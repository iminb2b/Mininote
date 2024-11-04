import PageContainer from "@/components/PageContent";
import { NextPage } from "next";
import PageMeta from "@/components/PageMeta";
import Page from "@/components/Page/Page";

const HomePage: NextPage = () => {
  return (
    <PageContainer>
      <PageMeta title="Min - Home Page" description={"Nhung Nguyen"} />
      <Page />
    </PageContainer>
  );
};

export default HomePage;
