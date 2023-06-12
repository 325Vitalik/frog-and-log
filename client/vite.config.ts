import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import Markdown from '@pity/vite-plugin-react-markdown';
import { plugin as mdPlugin, Mode } from 'vite-plugin-markdown';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), mdPlugin({ mode: [Mode.REACT] })],
});
