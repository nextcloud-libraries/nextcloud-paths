/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { describe, expect, it } from 'vitest'
import { dirname } from '../lib/index.ts'

describe('dirname', function() {
	it('Returns current folder if no file name given', function() {
		expect(dirname('')).toEqual('.')
	})
	it('Returns the root if dir is root', function() {
		expect(dirname('/')).toEqual('/')
	})
	it('Returns the root if dir is double root', function() {
		expect(dirname('//')).toEqual('/')
	})
	it('Returns dot if dir is dot', function() {
		expect(dirname('.')).toEqual('.')
	})
	it('Returns dot if no root given', function() {
		expect(dirname('some dir')).toEqual('.')
	})
	it('Returns the dir name if file name and root path given', function() {
		expect(dirname('/some name.txt')).toEqual('/')
	})
	it('Returns the dir name if double root path given', function() {
		expect(dirname('//some name.txt')).toEqual('/')
	})
	it('Returns the dir name if subdir given without root', function() {
		expect(dirname('subdir/some name.txt')).toEqual('subdir')
	})
	it('Returns the dir name if subdir given with root', function() {
		expect(dirname('/subdir/some name.txt')).toEqual('/subdir')
	})
	it('Returns the dir name if subdir given with double root', function() {
		// TODO: currently it behaves like Node's dirname, but for PHP it would be:
		// expect(dirname('//subdir/some name.txt')).toEqual('/subdir');
		expect(dirname('//subdir/some name.txt')).toEqual('//subdir')
	})
	it('Returns the dir name if subdir has dot', function() {
		expect(dirname('/subdir.dat/some name.txt')).toEqual('/subdir.dat')
	})
	it('Returns the dir name if file name is dot', function() {
		expect(dirname('/subdir/.')).toEqual('/subdir')
	})
	it('Returns the dir name if no file name given', function() {
		expect(dirname('subdir/')).toEqual('subdir')
	})
	it('Returns the dir name if no file name given with root', function() {
		expect(dirname('/subdir/')).toEqual('/subdir')
	})
})
