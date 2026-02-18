/*
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { expect, test } from 'vitest'
import { normalize } from '../lib/index.ts'

test('normalize', () => {
	expect(normalize('./fixtures///b/../b/c.js')).toBe('fixtures/b/c.js')
	expect(normalize('/foo/../../../bar')).toBe('/bar')
	expect(normalize('a//b//../b')).toBe('a/b')
	expect(normalize('a//b//./c')).toBe('a/b/c')
	expect(normalize('a//b//.')).toBe('a/b')
	expect(normalize('/a/b/c/../../../x/y/z')).toBe('/x/y/z')
	expect(normalize('///..//./foo/.//bar')).toBe('/foo/bar')
	expect(normalize('bar/foo../../')).toBe('bar/')
	expect(normalize('bar/foo../..')).toBe('bar')
	expect(normalize('bar/foo../../baz')).toBe('bar/baz')
	expect(normalize('bar/foo../')).toBe('bar/foo../')
	expect(normalize('bar/foo..')).toBe('bar/foo..')
	expect(normalize('../foo../../../bar')).toBe('../../bar')
	expect(normalize('../../.././../../../bar')).toBe('../../../../../../bar')
	expect(normalize('../../../foo/../../../bar')).toBe('../../../../../bar')
	expect(normalize('../../../foo/../../../bar/../../')).toBe('../../../../../../')
	expect(normalize('../foobar/barfoo/foo/../../../bar/../../')).toBe('../../')
	expect(normalize('../../../foobar/../../../bar/../../baz')).toBe('../../../../../../baz')
	expect(normalize('/../../../foobar/../../../bar/../../baz')).toBe('/baz')
})
