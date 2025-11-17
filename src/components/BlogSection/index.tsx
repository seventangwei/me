import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import type { BlogPost } from '@docusaurus/plugin-content-blog';
import { usePluginData, useAllPluginInstancesData } from '@docusaurus/useGlobalData';
import useGlobalData from '@docusaurus/useGlobalData';
import { Icon } from '@iconify/react';
import { clsx } from 'clsx';
import Image from '@theme/IdealImage';

import { useColorMode } from '@docusaurus/theme-common';
import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';
import { Section } from '../Section';

export type BlogPostType = BlogPost & {
  metadata: BlogPost['metadata'] & {
    frontMatter?: BlogPost['metadata']['frontMatter'] & { showInHome?: boolean }
  }
};

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));

const BLOG_POSTS_COUNT = 6;
const BLOG_POSTS_PER_ROW = 2;

export function BlogItem({ post }: { post: BlogPostType }) {
  const {
    metadata: { permalink, frontMatter, title, readingTime },
  } = post;

  return (
    <motion.li
      className={clsx('card', 'margin-bottom--md flex w-full bg-blog shadow-blog group')}
      key={permalink}
      initial={{ y: 100, opacity: 0.001 }}
      whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      viewport={{ once: true }}
    >
      {frontMatter.image && (
        <Link href={permalink} className="max-lg:max-h-[240px] xl:max-h-[207px] 2xl:max-h-[280px] w-full cursor-pointer overflow-hidden object-cover">
          <Image src={frontMatter?.image} alt={title} img="" />
        </Link>
      )}
      <div className="absolute top-4 right-4 flex items-center space-x-1 text-black text-xs opacity-0 group-hover:opacity-100">
        <Icon icon="ri:time-line" />
        <span>{readingTime}</span>
        <span>min</span>
      </div>
      <div className="card__body">
        <h4 className="text-base">
          <Link href={permalink} className="relative hover:no-underline">
            {title}
          </Link>
        </h4>
        <p className="text-sm">{frontMatter?.description}</p>
      </div>
    </motion.li>
  );
}

export default function BlogSection(): React.ReactElement {
  const { colorMode } = useColorMode();
  const blogData = usePluginData('docusaurus-plugin-content-blog') as {
    posts: BlogPostType[]
    postNum: number
    tagNum: number
  };

  const posts = chunk(blogData.posts.filter(post => !!post.metadata.frontMatter?.showInHome), BLOG_POSTS_PER_ROW);
  const ref = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 10, 100], [10, 0, -10], {
    clamp: false,
  });

  return (
    <div className={clsx(`relative w-screen max-w-full`)}>
      <Section title={<Translate id="homepage.blog.title">近期博客</Translate>} icon="tabler:book" href="/blog" className="px-3">
        <div ref={ref} className="flex flex-col gap-4 overflow-hidden rounded-card p-3 md:grid md:grid-cols-12">
          {posts.map((postGroup, index) => (
            <div className="col-span-4" key={index}>
              {postGroup.map((post, i) => (
                <motion.div style={{ y: i / 2 ? y : 0 }} key={i}>
                  <BlogItem key={post.id} post={post} />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
