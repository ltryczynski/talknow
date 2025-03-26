import ArticleWrapper from "@/components/article-wrapper";
import Main from "@/components/main";
import { WrapperBox } from "@/components/wrapper";
import { capitalize } from "@/lib/utils";
import React from "react";
import { Metadata } from "next";
import NotFound from "@/app/not-found";
import { getPosts } from "@/app/actions/actions";

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const categoryName = capitalize(params.slug);
  return {
    title: `${categoryName} Archive Page | TalkNow`,
    description: `Archive page for ${categoryName} category`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const searchQuery = params.slug;
  let posts;

  if (searchQuery === "all") {
    posts = await getPosts();
  } else {
    posts = await getPosts({ category: searchQuery });
  }
  if (posts.length === 0) {
    return <NotFound />;
  }

  return (
    <Main>
      <WrapperBox className="mt-5">
        <h1 className="text-2xl lg:text-3xl mb-5 xl:text-4xl capitalize">
          {searchQuery === "all" ? "All Posts" : `${capitalize(searchQuery)} Archive Page`}
        </h1>
        <ArticleWrapper posts={posts} />
      </WrapperBox>
    </Main>
  );
}
