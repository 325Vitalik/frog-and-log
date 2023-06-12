/// <reference types="vite/client" />
declare module '*.md' {
	// "unknown" would be more detailed depends on how you structure frontmatter
	const attributes: Record<string, unknown>;

	// When "Mode.TOC" is requested
	const toc: { level: string; content: string }[];

	// When "Mode.HTML" is requested
	const html: string;

	// When "Mode.RAW" is requested
	const raw: string;

	// When "Mode.React" is requested. VFC could take a generic like React.VFC<{ MyComponent: TypeOfMyComponent }>
	import React from 'react';
	const ReactComponent: React.FC;

	// Modify below per your usage
	export { attributes, toc, html, ReactComponent };
}
