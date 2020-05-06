// import dynamic from "next/dynamic";
import path from 'path';
import { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import React from "react";
import { NextSeo } from 'next-seo';
import posts from '../../content/metadata.json';
import Page from "../../components/page";
import markdownToHtml from '../../lib/markdownToHtml';

export const getStaticProps: GetStaticProps = async context => {
  const { postSlug } = context.params;
  const postMetadata = posts.find(x => x.slug == postSlug);
  const filePath = path.join(process.cwd(), `./content/posts/${postSlug}.md`);
  const md = fs.readFileSync(filePath, 'utf8');
  const html = await markdownToHtml(md);
  return { props: { postSlug, content: html, postMetadata } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = posts.map(x => ({ params: { postSlug: x.slug } }));
  return { paths, fallback: false };
};

function Post({ postMetadata, content, postSlug }) {
  
  if (!postMetadata || !content) {
    return (
      <Page>
        <article>
          No such post found.
        </article>
      </Page>
    )
  }
  return (
    <Page>
      <NextSeo
        title={`${postMetadata.title} - Victor Mota`}
        openGraph={{
          url: `https://vimota.me/writing/${postSlug}`,
          title: `${postMetadata.title} - Victor Mota`,
        }}
      />
      <div className="">
        <div className="text-2xl">
          {postMetadata.title}
        </div>
        <article>
          <div dangerouslySetInnerHTML={{'__html': content}}/>
          {/* <MdComponent /> */}
        </article>
      </div>
      <style jsx>{`
      `}</style>
    </Page>
  );
};

export default Post;
