(function (root, factory) {
  if (root.define === 'function' && root.define.amd) {
    root.define('pclass', [], factory);
  } else if (typeof root.exports !== 'undefined') {
    root.exports = factory();
  } else {
    root.PClass = factory();
  }
}(this, function () {
  if (typeof Object.create !== 'function') {
    throw new Error('Function "Object.create" not found and is required by PClass.');
  }
  if (typeof Object.keys !== 'function') {
    throw new Error('Function "Object.keys" not found and is required by PClass.')
  }

  function PClass () {}

  PClass.__constructorArray__ = [];

  function basicPropExtend (dest, src) {
    var propKeyArray = Object.keys(src),
        propKey      = propKeyArray[0],
        i            = 0,
        L            = propKeyArray.length
    ;

    for (; i < L; i++) {
      propKey       = propKeyArray[i];
      dest[propKey] = src[propKey];
    }

    return dest;
  };

  PClass.extend = function (options) {
    options || (options = {});

    var ParentClass         = this,
        constructorArray    = ParentClass.__constructorArray__.slice(0),
        constructorArrayLen = typeof options.constructor === 'function' && options.hasOwnProperty('constructor')
                                ? constructorArray.unshift(options.constructor)
                                : constructorArray.length,
        ChildClass          = function (opts) {
          var i = constructorArrayLen;
          while (i--) {
            constructorArray[i](this, opts);
          }
        }
    ;

    basicPropExtend(ChildClass, ParentClass);

    options.staticProps && basicPropExtend(ChildClass,           options.staticProps);
    options.protoProps  && basicPropExtend(ChildClass.prototype, options.protoProps);

    ChildClass.prototype            = Object.create(ParentClass.prototype);
    ChildClass.__constructorArray__ = constructorArray;

    return ChildClass;
  };

  return PClass;
}));
