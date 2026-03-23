import { describe, expect, test } from 'vitest';
import { Time } from '../Time.js';

describe('Constructor tests', () => {
  test('should initialize time at midnight (0, 0, 0)', () => {
    const time = new Time(0, 0, 0);
    expect(time.getHours()).toBe(0);
    expect(time.getMinutes()).toBe(0);
    expect(time.getSeconds()).toBe(0);
    expect(time.toString()).toBe('00:00:00');
  });

  test('should initialize time correctly (1, 0, 2)', () => {
    const time = new Time(1, 0, 2);
    expect(time.getHours()).toBe(1);
    expect(time.getMinutes()).toBe(0);
    expect(time.getSeconds()).toBe(2);
    expect(time.toString()).toBe('01:00:02');
  });

  test('should initialize time correctly (12, 34, 56)', () => {
    const time = new Time(12, 34, 56);
    expect(time.getHours()).toBe(12);
    expect(time.getMinutes()).toBe(34);
    expect(time.getSeconds()).toBe(56);
    expect(time.toString()).toBe('12:34:56');
  });

  test('should initialize time correctly at end of day (23, 59, 59)', () => {
    const time = new Time(23, 59, 59);
    expect(time.getHours()).toBe(23);
    expect(time.getMinutes()).toBe(59);
    expect(time.getSeconds()).toBe(59);
    expect(time.toString()).toBe('23:59:59');
  });
});

describe('Getter methods tests', () => {
  test('getHours() should return correct hour', () => {
    const time = new Time(12, 35, 47);
    expect(time.getHours()).toBe(12);
  });

  test('getMinutes() should return correct minutes', () => {
    const time = new Time(12, 35, 47);
    expect(time.getMinutes()).toBe(35);
  });

  test('getSeconds() should return correct seconds', () => {
    const time = new Time(12, 35, 47);
    expect(time.getSeconds()).toBe(47);
  });
});

describe('toString() tests', () => {
  test('should format time with leading zeros for single digits', () => {
    const time = new Time(1, 5, 9);
    expect(time.toString()).toBe('01:05:09');
  });

  test('should format midnight correctly', () => {
    const time = new Time(0, 0, 0);
    expect(time.toString()).toBe('00:00:00');
  });

  test('should format time without leading zeros for double digits', () => {
    const time = new Time(12, 34, 56);
    expect(time.toString()).toBe('12:34:56');
  });
});

describe('addSeconds() tests', () => {
  test('should add seconds correctly without rollover', () => {
    const time = new Time(12, 0, 0);
    time.addSeconds(30);
    expect(time.getHours()).toBe(12);
    expect(time.getMinutes()).toBe(0);
    expect(time.getSeconds()).toBe(30);
  });

  test('should add seconds with minute rollover', () => {
    const time = new Time(12, 0, 45);
    time.addSeconds(30);
    expect(time.getHours()).toBe(12);
    expect(time.getMinutes()).toBe(1);
    expect(time.getSeconds()).toBe(15);
  });

  test('should subtract seconds correctly (negative value)', () => {
    const time = new Time(12, 0, 30);
    time.addSeconds(-10);
    expect(time.getHours()).toBe(12);
    expect(time.getMinutes()).toBe(0);
    expect(time.getSeconds()).toBe(20);
  });

  test('should rollover when exceeding 86399', () => {
    const time = new Time(23, 59, 50);
    time.addSeconds(20);
    expect(time.getHours()).toBe(0);
    expect(time.getMinutes()).toBe(0);
    expect(time.getSeconds()).toBe(10);
  });

  test('should rollover to previous day when going negative', () => {
    const time = new Time(0, 0, 10);
    time.addSeconds(-20);
    expect(time.getHours()).toBe(23);
    expect(time.getMinutes()).toBe(59);
    expect(time.getSeconds()).toBe(50);
  });
});

describe('addMinutes() tests', () => {
  test('should add minutes correctly as per example (12:35:00 + 25 minutes)', () => {
    const time = new Time(12, 35, 0);
    time.addMinutes(25);
    expect(time.getHours()).toBe(13);
    expect(time.getMinutes()).toBe(0);
    expect(time.getSeconds()).toBe(0);
  });

  test('should add minutes without rollover', () => {
    const time = new Time(10, 30, 0);
    time.addMinutes(15);
    expect(time.getHours()).toBe(10);
    expect(time.getMinutes()).toBe(45);
    expect(time.getSeconds()).toBe(0);
  });

  test('should add minutes with hour rollover', () => {
    const time = new Time(10, 50, 0);
    time.addMinutes(20);
    expect(time.getHours()).toBe(11);
    expect(time.getMinutes()).toBe(10);
    expect(time.getSeconds()).toBe(0);
  });

  test('should subtract minutes correctly (negative value)', () => {
    const time = new Time(12, 30, 0);
    time.addMinutes(-15);
    expect(time.getHours()).toBe(12);
    expect(time.getMinutes()).toBe(15);
    expect(time.getSeconds()).toBe(0);
  });

  test('should rollover when adding minutes exceeds day', () => {
    const time = new Time(23, 50, 0);
    time.addMinutes(20);
    expect(time.getHours()).toBe(0);
    expect(time.getMinutes()).toBe(10);
    expect(time.getSeconds()).toBe(0);
  });

  test('should rollover to previous day when subtracting minutes goes negative', () => {
    const time = new Time(0, 10, 0);
    time.addMinutes(-20);
    expect(time.getHours()).toBe(23);
    expect(time.getMinutes()).toBe(50);
    expect(time.getSeconds()).toBe(0);
  });
});

describe('addHours() tests', () => {
  test('should add hours correctly as per example (13:00:00 + 12 hours)', () => {
    const time = new Time(13, 0, 0);
    time.addHours(12);
    expect(time.getHours()).toBe(1);
    expect(time.getMinutes()).toBe(0);
    expect(time.getSeconds()).toBe(0);
  });

  test('should add hours without rollover', () => {
    const time = new Time(10, 30, 0);
    time.addHours(5);
    expect(time.getHours()).toBe(15);
    expect(time.getMinutes()).toBe(30);
    expect(time.getSeconds()).toBe(0);
  });

  test('should add hours with day rollover', () => {
    const time = new Time(20, 0, 0);
    time.addHours(6);
    expect(time.getHours()).toBe(2);
    expect(time.getMinutes()).toBe(0);
    expect(time.getSeconds()).toBe(0);
  });

  test('should subtract hours correctly (negative value)', () => {
    const time = new Time(12, 0, 0);
    time.addHours(-3);
    expect(time.getHours()).toBe(9);
    expect(time.getMinutes()).toBe(0);
    expect(time.getSeconds()).toBe(0);
  });

  test('should rollover to previous day when subtracting hours goes negative', () => {
    const time = new Time(2, 0, 0);
    time.addHours(-5);
    expect(time.getHours()).toBe(21);
    expect(time.getMinutes()).toBe(0);
    expect(time.getSeconds()).toBe(0);
  });

  test('should handle multiple day rollovers', () => {
    const time = new Time(10, 0, 0);
    time.addHours(50); // More than 2 days
    expect(time.getHours()).toBe(12);
    expect(time.getMinutes()).toBe(0);
    expect(time.getSeconds()).toBe(0);
  });
});

describe('Combined operations tests', () => {
  test('should handle multiple operations in sequence', () => {
    const time = new Time(12, 35, 0);
    time.addMinutes(25);
    expect(time.getHours()).toBe(13);
    expect(time.getMinutes()).toBe(0);
    expect(time.getSeconds()).toBe(0);
    time.addHours(12);
    expect(time.getHours()).toBe(1);
    expect(time.getMinutes()).toBe(0);
    expect(time.getSeconds()).toBe(0);
  });

  test('should maintain accuracy through multiple operations', () => {
    const time = new Time(0, 0, 0);
    time.addHours(12);
    time.addMinutes(34);
    time.addSeconds(56);
    expect(time.getHours()).toBe(12);
    expect(time.getMinutes()).toBe(34);
    expect(time.getSeconds()).toBe(56);
  });
});