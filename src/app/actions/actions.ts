'use server';

import prisma from "@/lib/db";
import { capitalize } from "@/lib/utils";
import { Posts } from "@prisma/client";


type getPostsProps = {
  category?: string | undefined;
  take?: number;
  skip?: number;
  tagSlug?: string;
}



export async function getPosts({ category, tagSlug, take, skip }: getPostsProps = {}): Promise<Posts[]> {
  let posts;
  if (category || tagSlug) {
    posts = await prisma.posts.findMany({
      where: {
        category: category ? capitalize(category) : undefined,
        tags: tagSlug ? { contains: tagSlug } : undefined
      },
      take: take || 8,
      skip: skip || 0
    })
  } else {
    posts = await prisma.posts.findMany({
      take: take || 8,
      skip: skip || 0
    });
  }

  return posts;
}


export async function getPostBySlug(slug: string) {
  const post = await prisma.posts.findFirst({
    where: {
      slug
    }
  });

  return post;
}