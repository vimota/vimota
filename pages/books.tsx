import React from 'react';
import Page from '../components/page';
import BooksMd from '../content/books.md';
import { NextSeo } from 'next-seo';

function Books() {
	return (
			<Page>
				<NextSeo
          title="Books - Victor Mota"
          openGraph={{
            url: `https://vimota.me/books`,
            title: "Books - Victor Mota",
          }}
        />
				<article>
					<BooksMd />
				</article>
				<style jsx>{`
				article {
					max-width: 650px;
					margin: auto;
					font-size: 16px;
				}
			`}</style>

				<style jsx global>{`
				body {
					width: 100%;
					overflow-x: hidden;
				}
			`}</style>
			</Page>);
}

export default Books;
