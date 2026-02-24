import {Biome} from '@biomejs/js-api/nodejs';
import fs from 'node:fs/promises';
import path from 'node:path';
import {getWorkspaceRoot} from '../utils/get-workspace-root.js';
import {getColors} from './get-colors.js';

const biome = new Biome();
const {projectKey} = biome.openProject(getWorkspaceRoot());

async function generateWebsiteAsset() {
	const content = await getContent();
	const destination = path.join(
		getWorkspaceRoot(),
		'website/src/assets/colors.json',
	);

	const formatResult = biome.formatContent(projectKey, content, {
		filePath: 'colors.json',
	});

	await fs.writeFile(destination, formatResult.content, 'utf-8');
}

async function getContent() {
	const colors = await getColors();

	const ignored = [
		/**/
		'white',
		'black',
		'transparent',
	];

	ignored.forEach((k) => {
		delete colors[k];
	});

	return JSON.stringify(colors, null, 2);
}

generateWebsiteAsset();
