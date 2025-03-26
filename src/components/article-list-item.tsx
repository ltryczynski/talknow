import { Posts } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ArticleListItemProps = Pick<Posts, "title" | "slug" | "featured_image">;

export default function ArticleListItem({ article }: { article: ArticleListItemProps }) {
  const { title, slug, featured_image } = article;
  return (
    <Link href={`/blog/${slug}`}>
      <section className="flex gap-5">
        <Image
          src={featured_image}
          width={64}
          height={64}
          alt={title}
          className="object-cover aspect-squares rounded-md"
        />
        <h5 className="text-lg font-medium ">{title}</h5>
      </section>
    </Link>
  );
}
