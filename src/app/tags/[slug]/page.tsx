import ArticleWrapper from "@/components/article-wrapper";
import Main from "@/components/main";
import { WrapperBox } from "@/components/wrapper";
import { capitalize } from "@/lib/utils";
import React from "react";
import { Metadata } from "next";
import NotFound from "@/app/not-found";
import { getPosts } from "@/app/actions/actions";

type TagPageProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: TagPageProps): Metadata {
  const tagName = capitalize(params.slug);
  return {
    title: `${tagName} Tag | TalkNow`,
    description: `Archive page for ${tagName} tag`,
  };
}

export default async function TagsPage({ params }: TagPageProps) {
  const searchQuery = params.slug.replace(/-/g, " ");
  console.log(searchQuery);
  const posts = await getPosts({ tagSlug: searchQuery });

  if (posts.length === 0) {
    return <NotFound />;
  }

  return (
    <Main className="h-auto">
      <WrapperBox className="mt-5">
        <h1 className="text-2xl lg:text-3xl mb-5 xl:text-4xl capitalize">
          {searchQuery === "all" ? "All Posts" : `${capitalize(searchQuery)} Tag Archive Page`}
        </h1>
        <ArticleWrapper posts={posts} />
      </WrapperBox>
    </Main>
  );
}
