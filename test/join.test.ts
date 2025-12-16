/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { describe, expect, it } from 'vitest'
import { join } from '../lib/index.ts'

describe('join', () => {
	it('returns empty string with no or empty arguments', function() {
		expect(join()).toEqual('')
		expect(join('')).toEqual('')
		expect(join('', '')).toEqual('')
	})
	it('returns joined path sections', function() {
		expect(join('abc')).toEqual('abc')
		expect(join('abc', 'def')).toEqual('abc/def')
		expect(join('abc', 'def', 'ghi')).toEqual('abc/def/ghi')
	})
	it('keeps leading slashes', function() {
		expect(join('/abc')).toEqual('/abc')
		expect(join('/abc', '')).toEqual('/abc')
		expect(join('', '/abc')).toEqual('/abc')
		expect(join('/abc', 'def')).toEqual('/abc/def')
		expect(join('/abc', 'def', 'ghi')).toEqual('/abc/def/ghi')
	})
	it('keeps trailing slashes', function() {
		expect(join('', 'abc/')).toEqual('abc/')
		expect(join('abc/')).toEqual('abc/')
		expect(join('abc/', '')).toEqual('abc/')
		expect(join('abc', 'def/')).toEqual('abc/def/')
		expect(join('abc', 'def', 'ghi/')).toEqual('abc/def/ghi/')
	})
	it('splits paths in specified strings and discards extra slashes', function() {
		expect(join('//abc//')).toEqual('/abc/')
		expect(join('//abc//def//')).toEqual('/abc/def/')
		expect(join('//abc//', '//def//')).toEqual('/abc/def/')
		expect(join('//abc//', '//def//', '//ghi//')).toEqual('/abc/def/ghi/')
		expect(join('//abc//def//', '//ghi//jkl/mno/', '//pqr//')).toEqual('/abc/def/ghi/jkl/mno/pqr/')
		expect(join('/abc', '/def')).toEqual('/abc/def')
		expect(join('/abc/', '/def')).toEqual('/abc/def')
		expect(join('/abc/', 'def')).toEqual('/abc/def')
	})
	it('discards empty sections', function() {
		expect(join('abc', '', 'def')).toEqual('abc/def')
	})
	it('returns root if only slashes', function() {
		expect(join('//')).toEqual('/')
		expect(join('/', '/')).toEqual('/')
		expect(join('/', '//', '/')).toEqual('/')
	})
})
