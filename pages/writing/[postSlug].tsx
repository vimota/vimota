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
        <div className="text-gray-600 text-sm">
          {postMetadata.date}
        </div>
        <div className="text-2xl pt-4 pb-2">
          {postMetadata.title}
        </div>
        <article>
          <div dangerouslySetInnerHTML={{ '__html': content }} />
        </article>
      </div>
      <div className="border text-center border-green-700 text-gray-800 px-4 py-3 my-3" role="alert">
        <p className="text-base">Reach out to me on <a href={"https://twitter.com/vimota"}>Twitter</a>, I&apos;d love to hear from you!</p>
      </div>
      <style jsx>{`
      `}</style>
    </Page>
  );
};

export default Post;
