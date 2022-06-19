import { Equal, Expect } from '@type-challenges/utils';

// -----------------------------------------------------------------------------
// #1 get sub type from passed type
// -----------------------------------------------------------------------------
type QueueJob<T, U> = {
  id: string;
  name: T;
  payload: U;
}

type EmailJob = {
  email: string;
  name: string;
}

type TokenJob = {
  token: string;
  name: string;
}

type EmailQueue = QueueJob<'email', EmailJob>;
type TokenQueue = QueueJob<'token', TokenJob>;
// here is how to use infer to get sbu-type
// Purpose: get the name of the queue by Queue type
// type QueueName<Q extends QueueJob<string, unknown>> = Q['name'];
type QueueName<Q extends QueueJob<string, unknown>> = Q extends QueueJob<infer N, unknown> ? N : never; // "if" statement how break down the params

type EmailName = QueueName<EmailQueue>;
type TokenName = QueueName<TokenQueue>;
// -----------------------------------------------------------------------------
// #2 pull item type from the Array
// -----------------------------------------------------------------------------
// Test cases:
type T1 = Expect<Equal<Includes<['kars', 'edii', 'axvs'], 'kars'>, true>> // true
type T2 = Expect<Equal<Includes<['kars', 'edii', 'axvs'], 'col'>, false>> // false
type T3 = Expect<Equal<Includes<[1,2,4,5,3], 1>, true>> // true
type T4 = Expect<Equal<Includes<[1,2,4,5,6], 3>, false>> // flase
type T5 = Expect<Equal<Includes<[{}], {a: 'A'}>, false>> // flase
type T6 = Expect<Equal<Includes<[1,2,4,5, boolean, 6], false>, false>> // flase
// Solution:
type Includes<T extends readonly any[], U> = T extends [infer F, ...infer O] ?
  Equal<F, U> extends true ? true : Includes<O, U> : false;


// -----------------------------------------------------------------------------
// #3 Parameter<> and Return<>
// -----------------------------------------------------------------------------
// easy!

// -----------------------------------------------------------------------------
// #4 Template literals
// -----------------------------------------------------------------------------
// Test cases:
type cases = [
  Expect<Equal<Trim<'kars'>, 'kars'>>, // true
  Expect<Equal<Trim<'kars   '>, 'kars'>>, // true
  Expect<Equal<Trim<'   kars   '>, 'kars'>>, // true
  Expect<Equal<Trim<'   kars'>, 'kars'>>, // true
  Expect<Equal<Trim<' \n\t f kars  \t'>, 'f kars'>>, // true
]

type Chars = ' ' | '\t' | '\n';
type Trim<T extends string> = T extends `${Chars}${infer ST}` ? Trim<ST> :
  T extends `${infer STTT}${Chars}` ? Trim<STTT> : T;