type F = <T extends unknown[]>(source: [...T], cb: (params: T) => void) => void
// [...T] is Tuple Type 的指示器，它改编了对 数组字面量 原始类型的推断，有了这个上下文类型，['hello', 42] 的原始类型不再被推断成 (string | number)[] ，而是被推成了 [string, number]

const watcher: F = (source, cb) => {}

watcher([1, 'hello', { a: 1 }], (params) => { console.log(params) })
// params 的类型为 [number, string, { a: number }] tuple 类型


declare function test3<T extends unknown[]>(t: [string, ...T]): T;
test3(['hello', 42]); // return type is: [number]

// Reference:
// explain: https://www.zhihu.com/question/523396892
// Variadic Tuple feature: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html