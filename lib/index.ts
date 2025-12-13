/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

/**
 * URI-Encodes a file path but keep the path slashes.
 *
 * @param path - The path to encode
 */
export function encodePath(path: string): string {
	if (!path) {
		return path
	}

	return path
		.split('/')
		.map(encodeURIComponent)
		.join('/')
}

/**
 * Returns the base name of the given path.
 * For example for "/abc/somefile.txt" it will return "somefile.txt"
 *
 * @param path - The path to get the basename of
 */
export function basename(path: string): string {
	return path
		.replace(/\\/g, '/')
		.replace(/\/+$/g, '')
		.replace(/.*\//, '')
}

/**
 * Returns the dir name of the given path.
 * For example for "/abc/somefile.txt" it will return "/abc"
 *
 * @param path - The path to get the directory of
 */
export function dirname(path: string): string {
	path = path.replaceAll(/\\/g, '/')
	const sections = path.split('/')
	if (sections.length <= 1) {
		// there was no slash in the path
		return '.'
	}

	sections.pop()
	if (sections.length === 1 && sections[0] === '') {
		return '/'
	}

	return sections.join('/')
}

/**
 * Get the file extension of the given path
 *
 * @param path - The path to get the extension of
 */
export function extname(path: string): string {
	const base = basename(path)
	const index = base.lastIndexOf('.')
	if (index > 0) {
		return base.substring(index)
	}
	return ''
}

/**
 * Joins multiple path segments into a single path.
 *
 * @param args - The path segments to join
 * @deprecated use `join()` instead
 */
export function joinPaths(...args: string[]): string {
	return join(...args)
}

/**
 * Joins multiple path segments into a single path.
 *
 * @param args - The path segments to join
 */
export function join(...args: string[]): string {
	if (arguments.length < 1) {
		return ''
	}

	// discard empty arguments
	const nonEmptyArgs = args.filter((arg) => arg.length > 0)
	if (nonEmptyArgs.length < 1) {
		return ''
	}

	const lastArg = nonEmptyArgs[nonEmptyArgs.length - 1]
	const leadingSlash = nonEmptyArgs[0].charAt(0) === '/'
	const trailingSlash = lastArg.charAt(lastArg.length - 1) === '/'
	const sections = nonEmptyArgs.reduce((acc, section) => acc.concat(section.split('/')), [] as string[])

	let first = !leadingSlash
	const path = sections.reduce((acc, section) => {
		if (section === '') {
			return acc
		}

		if (first) {
			first = false
			return acc + section
		}

		return acc + '/' + section
	}, '')

	if (trailingSlash) {
		// add it back
		return path + '/'
	}
	return path
}

/**
 * Returns whether the given paths are the same, without
 * leading, trailing or doubled slashes and also removing
 * the dot sections.
 *
 * @param path1 - First path to check
 * @param path2 - Second path to check
 */
export function isSamePath(path1: string, path2: string): boolean {
	const pathSections1 = (path1 || '').split('/').filter((p) => p !== '.')
	const pathSections2 = (path2 || '').split('/').filter((p) => p !== '.')
	path1 = join(...pathSections1)
	path2 = join(...pathSections2)

	return path1 === path2
}
