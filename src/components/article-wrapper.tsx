import { cn } from "@/lib/utils";
import React from "react";
import ArticleCard, { ArticleDescription, ArticleTitle } from "./article-card";
import { Posts } from "@prisma/client";

type ArticleWrapperProps = {
  className?: string;
  posts: Posts[];
};

export default function ArticleWrapper({ className, posts }: ArticleWrapperProps) {
  return (
    <section
      className={cn(`grid md:grid-cols-3 gap-10 md:gap-5 justify-center items-center`, className)}>
      {posts.map((post, index) => (
        <ArticleCard
          post={post}
          key={post.id}
          className={index > 0 ? "h-smallCard lg:h-card" : `h-card`}>
          <ArticleTitle>{post.title}</ArticleTitle>
          <ArticleDescription>{post.teaser}</ArticleDescription>
        </ArticleCard>
      ))}
    </section>
  );
}
