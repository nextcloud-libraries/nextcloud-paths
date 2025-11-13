/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default async (env: Parameters<typeof viteConfig>[0]) => {
	const config
		= typeof viteConfig === 'function' ? await viteConfig(env) : viteConfig

	return defineConfig({
		...config,
		// node-externals conflicts with vitest
		plugins: config.plugins!.filter((plugin) => plugin && (!('name' in plugin) || plugin?.name !== 'node-externals')),
		test: {
			coverage: {
				reporter: ['text', 'lcov'],
			},
		},
	})
}
