import HeroShowcase from "@/components/hero-showcase";
import { Wrapper, WrapperBox } from "@/components/wrapper";
import Main from "@/components/main";
import ArticleWrapper from "@/components/article-wrapper";
import AdBlock from "@/components/ad-block";
import { ArticleTopBar } from "@/components/article-card";
import { getPosts } from "./actions/actions";

export default async function Home() {
  const featured_posts = await getPosts({ take: 3 });
  const lifestyle_posts = await getPosts({ category: "Lifestyle", take: 3 });
  const automotive_posts = await getPosts({ category: "Automotive", take: 3 });
  const technology_posts = await getPosts({ category: "Technology", take: 3 });

  return (
    <Main className="space-y-10">
      <WrapperBox>
        <ArticleTopBar title="Latest Articles" categoryLink="/category/all" />

        <HeroShowcase posts={featured_posts} />
      </WrapperBox>
      <WrapperBox>
        <ArticleTopBar title="Lifestyle" categoryLink="/category/automotive" />
        <ArticleWrapper posts={lifestyle_posts} />
      </WrapperBox>
      <Wrapper className="mt-10">
        <AdBlock className="border border-[#5e27b1]" imageSrc="/baner.jpg" />
      </Wrapper>

      <WrapperBox>
        <ArticleTopBar title="Automotive" categoryLink="/category/automotive" />
        <ArticleWrapper posts={automotive_posts} />
      </WrapperBox>

      <WrapperBox>
        <ArticleTopBar title="Technology" categoryLink="/category/technology" />
        <ArticleWrapper posts={technology_posts} />
      </WrapperBox>
    </Main>
  );
}
