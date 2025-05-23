import React from 'react';
import Page from '../components/page';
import AboutMd from '../content/about.md';

function About() {
	return (
		<Page>
			<article className="max-w-screen-md m-auto">
				<AboutMd />
			</article>
			<style jsx>{`
			`}</style>

		</Page>);
}

export default About;
