import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';

export default [
	{
		input: 'src/index.js',
		output: [
			{
				file: 'dist/icanvas.es.js',
				format: 'esm',
			},
		],
		external: ['wx'],
		plugins: [
			json(),
			babel({
				babelrc: false,
				presets: [['@babel/preset-env', { modules: false }]],
				plugins: ['@babel/proposal-class-properties', '@babel/transform-runtime'],
				exclude: 'node_modules/**',
				externalHelpers: false,
				runtimeHelpers: true,
			}),
			commonjs(),
		],
	},
	{
		input: 'src/index.js',
		output: [
			{
				name: 'ICanvasWeb',
				file: 'dist/icanvas.umd.js',
				format: 'umd',
			},
		],
		external: ['wx'],
		plugins: [
			resolve({ preferBuiltins: true }),
			json(),
			babel({
				babelrc: false,
				presets: [['@babel/preset-env', { modules: false }]],
				plugins: ['@babel/proposal-class-properties', '@babel/transform-runtime'],
				exclude: 'node_modules/**',
				externalHelpers: false,
				runtimeHelpers: true,
			}),
			commonjs(),
		],
	},
];
