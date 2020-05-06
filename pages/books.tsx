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
				<article className="max-w-screen-md md:px-18 m-auto">
					<BooksMd />
				</article>
				<style jsx>{`
			`}</style>

			</Page>);
}

export default Books;
