/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { describe, expect, it } from 'vitest'
import { encodePath } from '../lib/index.ts'

describe('encodePath', () => {
	it('Returns empty string if no path given', () => {
		expect(encodePath('')).toEqual('')
	})

	it('Returns slash if only slash given', () => {
		expect(encodePath('/')).toEqual('/')
	})

	it('Encodes simple path without special characters', () => {
		expect(encodePath('/some/simple/path.txt')).toEqual('/some/simple/path.txt')
	})

	it('Encodes path with spaces', () => {
		expect(encodePath('/some path/with spaces/file name.txt')).toEqual('/some%20path/with%20spaces/file%20name.txt')
	})

	it('Encodes path with special characters', () => {
		expect(encodePath('/path/with/special!@#$%^&*()chars.txt')).toEqual('/path/with/special!%40%23%24%25%5E%26*()chars.txt')
	})

	it('Encodes path with unicode characters', () => {
		expect(encodePath('/路径/含有/中文字符.txt')).toEqual('/%E8%B7%AF%E5%BE%84/%E5%90%AB%E6%9C%89/%E4%B8%AD%E6%96%87%E5%AD%97%E7%AC%A6.txt')
	})

	it('Encodes path with mixed characters', () => {
		expect(encodePath('/混合/mixed 路径/with 特殊 chars!@#.txt')).toEqual('/%E6%B7%B7%E5%90%88/mixed%20%E8%B7%AF%E5%BE%84/with%20%E7%89%B9%E6%AE%8A%20chars!%40%23.txt')
	})
})
