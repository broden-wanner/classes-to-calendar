const WORLD = 'world';

export function hello(world: string = WORLD): string {
  return `Hello ${world}! `;
}