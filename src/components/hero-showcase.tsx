import { cn } from "@/lib/utils";
import ArticleCard, { ArticleDescription, ArticleTitle } from "./article-card";
import { Posts } from "@prisma/client";

export default function HeroShowcase({ posts }: { posts: Posts[] }) {
  return (
    <section>
      <div className="grid md:grid-cols-3 md:grid-rows-2 gap-10 md:gap-5 lg:h-[476px]">
        {posts.map(
          (post, index) =>
            index < 3 && (
              <ArticleCard
                key={post.id}
                post={post}
                className={cn({
                  "lg:col-start-1 lg:row-start-1 lg:col-span-2 lg:row-span-2 h-card lg:h-full":
                    index === 0,
                  "lg:col-start-3 lg:row-start-1 lg:col-span-1 lg:row-span-1 h-smallCard lg:h-full":
                    index === 1,
                  "lg:col-start-3 lg:row-start-2 lg:col-span-1 lg:row-span-1 h-smallCard lg:h-full":
                    index === 2,
                })}>
                <ArticleTitle
                  className={cn({
                    "text-2xl lg:text-3xl": index === 0,
                  })}>
                  {post.title}
                </ArticleTitle>
                <ArticleDescription>{post.teaser}</ArticleDescription>
              </ArticleCard>
            )
        )}
      </div>
    </section>
  );
}
