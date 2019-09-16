import React from 'react';
import Page from '../../components/page';
import posts from '../../content/metadata.json';
import Link from 'next/link';
import Head from 'next/head';

const Post = ({ slug, date, title }) => (
	<div className="post">
		<span className="date">{date}</span>
		<Link href={`/writing/${slug}`}><a>{title}</a></Link>

		<style jsx>{`
        .post {
          margin-bottom: 10px;
        }
        .date {
          display: inline-block;
          width: 140px;
          text-align: right;
          margin-right: 30px;
          color: #999;
        }
        a {
          text-decoration: none;
        }
        @media (max-width: 500px) {
          .post {
            margin-bottom: 15px;
          }
          .date {
            display: block;
            width: inherit;
            text-align: inherit;
            font-size: 11px;
            color: #ccc;
            margin-bottom: 5px;
          }
        }
      `}</style>
	</div>
);


const PostListing = ({ postSlug }) => (
	<Page>
		<Head>
			<title>Writing</title>
		</Head>
		<div className="posts">
			{
				posts.map(({ slug, date, title }) => (
          <Post
            key={slug}
						slug={slug}
						date={date}
						title={title}
					/>
				))
			}
		</div>
	</Page>
);

export default PostListing;