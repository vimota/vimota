import dynamic from "next/dynamic";
import React from "react";
import { NextSeo } from 'next-seo';
import posts from '../../content/metadata.json';
import Page from "../../components/page";

interface Props {
  postSlug: string;
}

class Post extends React.Component<Props> {
  static async getInitialProps({ query }) {
    return { postSlug: query.postSlug };
  }

  render() {
		const { postSlug } = this.props;
		const postMetadata = posts.find(x => x.slug == postSlug);
    const MdComponent = dynamic(() =>
      import(`../../content/posts/${postSlug}.md`)
		);
		if (!postMetadata || !MdComponent) {
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
        <article>
          <MdComponent />
        </article>
        <style jsx>{`
          article {
            max-width: 650px;
            margin: auto;
          }
        `}</style>

        <style jsx global>{`
          body {
            width: 100%;
            overflow-x: hidden;
          }
        `}</style>
      </Page>
    );
  }
}

export default Post;
