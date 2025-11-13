/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { describe, expect, it  } from 'vitest';
import { joinPaths, join } from "../lib/index";

describe.for([join, joinPaths])("joinPaths", (joinPaths) => {
	it("returns empty string with no or empty arguments", function () {
		expect(joinPaths()).toEqual("");
		expect(joinPaths("")).toEqual("");
		expect(joinPaths("", "")).toEqual("");
	});
	it("returns joined path sections", function () {
		expect(joinPaths("abc")).toEqual("abc");
		expect(joinPaths("abc", "def")).toEqual("abc/def");
		expect(joinPaths("abc", "def", "ghi")).toEqual("abc/def/ghi");
	});
	it("keeps leading slashes", function () {
		expect(joinPaths("/abc")).toEqual("/abc");
		expect(joinPaths("/abc", "")).toEqual("/abc");
		expect(joinPaths("", "/abc")).toEqual("/abc");
		expect(joinPaths("/abc", "def")).toEqual("/abc/def");
		expect(joinPaths("/abc", "def", "ghi")).toEqual("/abc/def/ghi");
	});
	it("keeps trailing slashes", function () {
		expect(joinPaths("", "abc/")).toEqual("abc/");
		expect(joinPaths("abc/")).toEqual("abc/");
		expect(joinPaths("abc/", "")).toEqual("abc/");
		expect(joinPaths("abc", "def/")).toEqual("abc/def/");
		expect(joinPaths("abc", "def", "ghi/")).toEqual("abc/def/ghi/");
	});
	it("splits paths in specified strings and discards extra slashes", function () {
		expect(joinPaths("//abc//")).toEqual("/abc/");
		expect(joinPaths("//abc//def//")).toEqual("/abc/def/");
		expect(joinPaths("//abc//", "//def//")).toEqual("/abc/def/");
		expect(joinPaths("//abc//", "//def//", "//ghi//")).toEqual("/abc/def/ghi/");
		expect(joinPaths("//abc//def//", "//ghi//jkl/mno/", "//pqr//")).toEqual(
			"/abc/def/ghi/jkl/mno/pqr/"
		);
		expect(joinPaths("/abc", "/def")).toEqual("/abc/def");
		expect(joinPaths("/abc/", "/def")).toEqual("/abc/def");
		expect(joinPaths("/abc/", "def")).toEqual("/abc/def");
	});
	it("discards empty sections", function () {
		expect(joinPaths("abc", "", "def")).toEqual("abc/def");
	});
	it("returns root if only slashes", function () {
		expect(joinPaths("//")).toEqual("/");
		expect(joinPaths("/", "/")).toEqual("/");
		expect(joinPaths("/", "//", "/")).toEqual("/");
	});
});
