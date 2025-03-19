/**
 * If cond is true, do nothing.  Otherwise, throw error with msg
 *
 * @param {boolean} cond Test condition
 * @param {string} msg path to the button icon
 * @throws If the condition is false
 */
export const customAssert = (cond, msg) => {
  if (cond) {
    return
  }
  throw new Error(msg)
}

const getTypeDescription = (value) => {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  return typeof value;
}

/**
 * Checks if a named parameter is defined
 * @param {string} name Parameter name
 * @param {any} value Parameter value
 * @throws If the parameter is not defined
 */
export const assertDefinedParam = (name, value) => {
  customAssert(
    value !== null && value !== undefined,
    `Parameter "${name}" is ${getTypeDescription(value)}. Expected a defined value.`
  )
  return value;
}

/**
 * Equivalent to calling assertDefined on each parameter
 *
 * @param {any} args Variable length arguments to customAssert are defined
 * @return {any} args That was passed in
 * @throws If any argument is not defined
 */
export const assertDefined = (...args) => {
  const callerName = new Error().stack
    ?.split('\n')[2]
    ?.trim()
    ?.split(' ')[1]
    || 'Unknown';

  if (args.length === 0) {
    throw new Error(`No arguments provided to assertDefined (called from ${callerName})`);
  }

  // If first argument is an object, treat it as named parameters
  if (args.length === 1 && typeof args[0] === 'object') {
    const params = args[0];
    Object.entries(params).forEach(([key, value]) => {
      assertDefinedParam(`${callerName}.${key}`, value);
    });
    return params;
  }

  // Original array validation
  for (const ndx in args) {
    if (Object.prototype.hasOwnProperty.call(args, ndx)) {
      const arg = args[ndx];
      const cleanCallerName = callerName.split('[')[0]; // Remove any existing array notation
      const paramName = `${cleanCallerName}[${ndx}]`;
      customAssert(
        arg !== null && arg !== undefined,
        `Parameter "${paramName}" is ${getTypeDescription(arg)}. Expected a defined value.`
      )
    }
  }

  return args.length === 1 ? args[0] : args;
}
