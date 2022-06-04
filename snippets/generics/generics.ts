// #1 Generics with Union primitive types
type Target = string[];
type MdapTarget = 'perf' | 'exception' | 'api' | 'custom' | 'resource';
type MdapRnTarget = 'exception';
type DasTarget = 'numeric' | 'click' | 'pv';

function getTargetPlugin<T extends Target>(target: T) {
  return target + '_plugin';
}

const mTarget: MdapTarget = 'perf' as const;
const eTarget = 'exception';
const dTarget: DasTarget = 'numeric';

const mPlugin = getTargetPlugin(mTarget);
// -----

// #2
