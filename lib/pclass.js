(function (root, factory) {
  if (root.define === 'function' && root.define.amd) {
    root.define('pclass', [], factory);
  } else if (typeof root.exports !== 'undefined') {
    root.exports = factory();
  } else {
    root.PClass = factory();
  }
}(this, this.define, this.module, this.exports, function () {
  function PClass () {
    
  }

  return PClass;
}));
