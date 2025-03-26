import React from "react";
import { notFound } from "next/navigation";
import { Wrapper, WrapperBox } from "../../../components/wrapper";
import Main from "../../../components/main";
import "./page.css";
import Image from "next/image";
import Link from "next/link";
import SocialIcons from "../../../components/social-icons";
import { ListBulletIcon, CalendarIcon } from "@radix-ui/react-icons";
import ArticleCard, { ArticleTitle } from "../../../components/article-card";
import { Metadata } from "next";
import BlogAside from "@/components/blog-aside";
import { getPostBySlug, getPosts } from "@/app/actions/actions";

type PageProps = {
  params: {
    slug: string;
  };
};
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  return {
    title: `${post.title} | TalkNow`,
    description: post.teaser,
  };
}

export default async function Page({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  const relatedPosts = await getPosts({ category: post.category, take: 4 });
  const filteredRelatedPost = relatedPosts.filter((p) => p.id !== post.id).splice(0, 3);

  const safeContent = {
    __html: post.content,
  };

  return (
    <Main className="pt-0 container">
      <Wrapper className="">
        <Image
          src={post.featured_image}
          width={800}
          height={600}
          alt={post.featured_image}
          className="w-full h-[428px] object-cover"
        />
        <section className="flex flex-col absolute bottom-5 left-5 px-5 lg:px-10">
          <div className="flex relative z-20 items-center gap-1 text-gray-50/80 mb-1 pb-2 after:w-full after:h-[1px] after:bottom-0 after:inset-x-0 after:mx-auto after:bg-gradient-to-r from-gray-50/30 via-gray-50/10 to-gray-50/0 after:absolute">
            <CalendarIcon />
            {new Date(post.publishedAt).toLocaleDateString()}
          </div>
          <h1 className="z-20 text-2xl lg:text-3xl xl:text-5xl">{post.title}</h1>
        </section>
        <div className="bg-gradient-to-b from-gray-950/0 to-gray-950/80 absolute inset-0 m-auto w-full h-full z-10"></div>
      </Wrapper>
      <WrapperBox className="mt-8 grid lg:grid-cols-3 grid-cols-1">
        <p className="text-xl text-gray-50/80 mb-5 px-5 lg:col-span-3">{post.teaser}</p>

        <div
          dangerouslySetInnerHTML={safeContent}
          className="text-gray-50/90 mt-5 text-md lg:text-base post_content col-span-2 px-5"
        />
        <BlogAside tags={post.tags.split(", ")} />
        <div className="border-t col-span-2 pt-3 border-gray-50/10 flex flex-col lg:flex-row gap-y-5 items-center justify-between">
          <p className="text-sm text-gray-50/50 ">
            Published on {new Date(post.publishedAt).toLocaleDateString()}
          </p>
          <div className="flex gap-x-10 items-center">
            <Link
              href={`/category/${post.category.toLowerCase()}`}
              className="flex items-center justify-center gap-2 text-sm bg-gray-50/10 hover:bg-gray:50/20 transition text-gray-50/80 hover:text-gray-50 h-max px-5 py-2 rounded-full">
              <ListBulletIcon />
              {post.category}
            </Link>
            <SocialIcons />
          </div>
        </div>
      </WrapperBox>
      <WrapperBox className="mt-10">
        <h2 className="text-2xl">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRelatedPost.map((post) => (
            <ArticleCard className="lg:h-card h-smallCard" key={post.id} post={post}>
              <ArticleTitle className="text-xl lg:text-2xl">{post.title}</ArticleTitle>
            </ArticleCard>
          ))}
        </div>
      </WrapperBox>
    </Main>
  );
}
