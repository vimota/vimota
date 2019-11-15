import React from 'react';
import Page from '../components/page';
import AboutMd from '../content/about.md';

function About() {
	return (
			<Page>
				<article>
					<AboutMd />
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

export default About;
