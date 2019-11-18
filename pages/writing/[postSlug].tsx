import dynamic from 'next/dynamic';
import React from 'react';
import Page from '../../components/page';

interface Props {
	postSlug: string
}

class Post extends React.Component<Props> {
	static async getInitialProps({ query }) {
		return { postSlug: query.postSlug };
	}

	render() {
		const { postSlug } = this.props;
		const MdComponent = dynamic(() => import(`../../content/posts/${postSlug}.md`));
		return (
			<Page>
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
