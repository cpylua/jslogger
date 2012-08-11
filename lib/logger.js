// Generated by CoffeeScript 1.3.3
(function() {
  var Logger, name, root, _, _ref,
    __slice = [].slice;

  Logger = function(module) {
    if (module == null) {
      module = "*No Name*";
    }
    this.__prefix = module;
    this.__level = Logger.__level;
    if ((typeof console !== "undefined" && console !== null) && typeof console.log === "object") {
      return Logger.__iehacks();
    }
  };

  Logger.__loglevels = {
    OFF: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4
  };

  Logger.__level = Logger.__loglevels.DEBUG;

  Logger.__iehacks = function() {
    var fn, fns, method, _i, _len;
    fns = ["error", "warn", "info", "log"];
    for (_i = 0, _len = fns.length; _i < _len; _i++) {
      fn = fns[_i];
      method = console[fn];
      if (Function.prototype.bind) {
        console[fn] = function() {
          var f;
          f = Function.prototype.bind.call(method, console);
          return f(Array.prototype.slice.call(arguments).join(" "));
        };
      } else if (Function.prototype.call) {
        console[fn] = function() {
          return Function.prototype.call.call(method, console, Array.prototype.slice.call(arguments).join(" "));
        };
      }
    }
    return void 0;
  };

  Logger.__now = function() {
    var d;
    d = new Date();
    return d.toLocaleTimeString();
  };

  Logger.prototype.__header = function(cate) {
    return "" + cate + " " + this.__prefix + " " + (Logger.__now()) + ": ";
  };

  _ref = Logger.__loglevels;
  for (name in _ref) {
    _ = _ref[name];
    Logger[name] = name;
  }

  Logger.setLevel = function(level) {
    var levels;
    levels = Logger.__loglevels;
    level = levels[level];
    if ((level != null) && (levels.OFF <= level && level <= levels.DEBUG)) {
      return Logger.__level = level;
    }
  };

  Logger.getLevel = function() {
    return Logger.__level;
  };

  Logger.prototype.setLevel = function(level) {
    var levels;
    levels = Logger.__loglevels;
    level = levels[level];
    if ((level != null) && (levels.OFF <= level && level <= levels.DEBUG)) {
      if (level <= Logger.__level) {
        return this.__level = level;
      }
    }
  };

  Logger.prototype.getLevel = function() {
    return this.__level;
  };

  Logger.prototype.error = function() {
    var level, msgs;
    msgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    level = Math.min(Logger.__level, this.__level);
    if (((typeof console !== "undefined" && console !== null ? console.error : void 0) != null) && level >= Logger.__loglevels.ERROR) {
      return console.error.apply(console, [this.__header("ERROR")].concat(__slice.call(msgs)));
    }
  };

  Logger.prototype.warn = function() {
    var level, msgs;
    msgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    level = Math.min(Logger.__level, this.__level);
    if (((typeof console !== "undefined" && console !== null ? console.warn : void 0) != null) && level >= Logger.__loglevels.WARN) {
      return console.warn.apply(console, [this.__header("WARN")].concat(__slice.call(msgs)));
    }
  };

  Logger.prototype.info = function() {
    var level, msgs;
    msgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    level = Math.min(Logger.__level, this.__level);
    if (((typeof console !== "undefined" && console !== null ? console.info : void 0) != null) && level >= Logger.__loglevels.INFO) {
      return console.info.apply(console, [this.__header("INFO")].concat(__slice.call(msgs)));
    }
  };

  Logger.prototype.debug = function() {
    var level, msgs;
    msgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    level = Math.min(Logger.__level, this.__level);
    if (((typeof console !== "undefined" && console !== null ? console.log : void 0) != null) && level >= Logger.__loglevels.DEBUG) {
      return console.log.apply(console, [this.__header("DEBUG")].concat(__slice.call(msgs)));
    }
  };

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.Logger = Logger;

}).call(this);