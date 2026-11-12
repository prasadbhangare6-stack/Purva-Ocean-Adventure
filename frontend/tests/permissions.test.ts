import { test } from "node:test";
import assert from "node:assert/strict";
import { can, allowedResources } from "../lib/auth/permissions";

/**
 * Permission matrix tests. Run with `npm test`.
 * These guard the access rules from the brief; change them only deliberately.
 */

test("owner has complete access to every resource and action", () => {
  for (const r of ["trips", "users", "settings", "activity", "enquiries"] as const) {
    assert.equal(can("owner", r, "delete"), true);
    assert.equal(can("owner", r, "assign_roles"), true);
  }
});

test("editor can add and edit content but not publish, delete or manage users", () => {
  assert.equal(can("editor", "trips", "create"), true);
  assert.equal(can("editor", "trips", "update"), true);
  assert.equal(can("editor", "trips", "publish"), false);
  assert.equal(can("editor", "trips", "delete"), false);
  assert.equal(can("editor", "users", "read"), false);
  assert.equal(can("editor", "users", "assign_roles"), false);
});

test("enquiry manager sees only enquiries", () => {
  assert.deepEqual(allowedResources("enquiry_manager"), ["enquiries"]);
  assert.equal(can("enquiry_manager", "trips", "read"), false);
});

test("viewer can read but never change anything", () => {
  for (const r of allowedResources("viewer")) {
    assert.equal(can("viewer", r, "create"), false, `viewer create ${r}`);
    assert.equal(can("viewer", r, "update"), false, `viewer update ${r}`);
    assert.equal(can("viewer", r, "delete"), false, `viewer delete ${r}`);
  }
  assert.equal(can("viewer", "users", "read"), false);
});

test("admin manages content but cannot assign roles", () => {
  assert.equal(can("admin", "trips", "publish"), true);
  assert.equal(can("admin", "users", "assign_roles"), false);
});
