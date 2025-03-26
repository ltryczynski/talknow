import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import H2 from "./h2";
import ShowMore from "./show-more";
import { Posts } from "@prisma/client";

type ArticleCardProps = {
  className?: string;
  children?: React.ReactNode;
  post: Posts;
};

type ArticleTopBarProps = Omit<ArticleCardProps, "post"> & {
  title: string;
  categoryLink: string;
};

export default function ArticleCard({ className, children, post }: ArticleCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        `relative flex gap-y-2 flex-col justify-end pb-5 px-5 border border-gray-50/10`,
        className
      )}>
      <article>
        {children}
        <div className="bg-gradient-to-b from-gray-950/0 via-gray-950/70  to-gray-950 w-full h-full absolute inset-0 m-auto z-0 "></div>
        {true && (
          <Image
            src={post.featured_image}
            width={800}
            height={600}
            alt={post.title}
            className="w-full h-full absolute inset-0 m-auto object-cover -z-20"
          />
        )}
      </article>
    </Link>
  );
}

export function ArticleTitle({ children, className }: Omit<ArticleCardProps, "post">) {
  return <h3 className={cn(`text-xl lg:text-2xl z-20 relative`, className)}>{children}</h3>;
}

export function ArticleDescription({ children, className }: Omit<ArticleCardProps, "post">) {
  return <p className={cn(`text-sm mt-2 line-clamp-2 z-20 relative`, className)}>{children}</p>;
}

export function ArticleTopBar({ title, className, categoryLink }: ArticleTopBarProps) {
  return (
    <div className={cn(`w-full flex justify-between items-center z-20 relative`, className)}>
      <H2>{title}</H2>
      <ShowMore href={categoryLink} />
    </div>
  );
}
