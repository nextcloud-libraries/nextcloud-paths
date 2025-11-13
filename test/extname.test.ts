/*
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { expect, test } from 'vitest'
import { extname } from '../lib/index'

test.each`
input                | expected
${'index.html'}      | ${'.html'}
${'index.coffee.md'} | ${'.md'}
${'index.'}          | ${'.'}
${'index'}           | ${''}
${'.index'}          | ${''}
${'.index.md'}       | ${'.md'}
`('extname($input) -> $expected', ({ input, expected }) => {
	expect(extname(input)).toBe(expected)
})
