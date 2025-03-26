import { capitalize, cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import ArticleListItem from "./article-list-item";
import { getPosts } from "@/app/actions/actions";

export default async function BlogAside({ tags }: { tags: string[] }) {
  const recentArticles = await getPosts({ take: 3 });

  return (
    <aside className="lg:border-l border-white/5 lg:pl-10 px-5 pt-5">
      <Section>
        <h4 className="text-2xl">Tags</h4>
        <ul className="flex gap-4 flex-wrap ">
          {tags.map((tag) => {
            const tagSlug = tag.toLowerCase().replace(/\s/g, "-");
            return (
              <li
                key={tagSlug}
                className="group px-4 py-2 rounded-full border  border-white/10 transition hover:border-white/30">
                <Link
                  href={`/tags/${tagSlug}`}
                  className="text-gray-50/80 group-hover:text-gray-50 transition">
                  {capitalize(tag)}
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>
      <Section>
        <h4 className="text-2xl mt-10">Recent Articles</h4>
        <ul className="space-y-5">
          {recentArticles.map((article) => (
            <li key={article.id}>
              <ArticleListItem article={article} />
            </li>
          ))}
        </ul>
      </Section>
    </aside>
  );
}

function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cn(`flex flex-col gap-5`, className)}>{children}</section>;
}
