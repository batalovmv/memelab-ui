import { cn } from './cn';

describe('cn', () => {
  it('joins strings', () => {
    expect(cn('foo', 'bar', 'baz')).toBe('foo bar baz');
  });

  it('handles single string', () => {
    expect(cn('single')).toBe('single');
  });

  it('handles empty input', () => {
    expect(cn()).toBe('');
  });

  it('handles booleans', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
    expect(cn('foo', true && 'bar', 'baz')).toBe('foo bar baz');
  });

  it('handles null', () => {
    expect(cn('foo', null, 'bar')).toBe('foo bar');
  });

  it('handles undefined', () => {
    expect(cn('foo', undefined, 'bar')).toBe('foo bar');
  });

  it('handles falsy values', () => {
    expect(cn('foo', false, null, undefined, 'bar')).toBe('foo bar');
  });

  it('handles objects', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });

  it('handles objects with null values', () => {
    expect(cn({ foo: true, bar: null, baz: undefined })).toBe('foo');
  });

  it('handles empty object', () => {
    expect(cn({})).toBe('');
  });

  it('handles mixed strings and objects', () => {
    expect(cn('foo', { bar: true, baz: false }, 'qux')).toBe('foo bar qux');
  });

  it('handles nested arrays', () => {
    expect(cn(['foo', ['bar', 'baz']])).toBe('foo bar baz');
  });

  it('handles deeply nested arrays', () => {
    expect(cn(['foo', ['bar', ['baz', 'qux']]])).toBe('foo bar baz qux');
  });

  it('handles arrays with falsy values', () => {
    expect(cn(['foo', false, 'bar', null, 'baz', undefined])).toBe('foo bar baz');
  });

  it('handles arrays with objects', () => {
    expect(cn(['foo', { bar: true, baz: false }])).toBe('foo bar');
  });

  it('handles numbers', () => {
    expect(cn('foo', 123, 'bar')).toBe('foo 123 bar');
  });

  it('handles zero', () => {
    expect(cn('foo', 0, 'bar')).toBe('foo bar');
  });

  it('handles complex combinations', () => {
    expect(
      cn('base', 'extra', { active: true, disabled: false }, ['array', 'items'], undefined, null, false && 'hidden'),
    ).toBe('base extra active array items');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn('btn', isActive && 'btn-active', isDisabled && 'btn-disabled')).toBe('btn btn-active');
  });

  it('handles object with all false values', () => {
    expect(cn({ foo: false, bar: false })).toBe('');
  });

  it('preserves spaces in strings', () => {
    expect(cn('  foo  ', '  bar  ')).toBe('  foo     bar  ');
  });
});
