Logger = (module = "*No Name*") ->
  @__prefix = module
  @__level = Logger.__level
  if console? and typeof console.log is "object"
    Logger.__iehacks()

Logger.__loglevels = {
  OFF: 0
  ERROR: 1
  WARN: 2
  INFO: 3
  DEBUG: 4
}

Logger.__level = Logger.__loglevels.DEBUG

Logger.__iehacks = ->
  fns = ["error", "warn", "info", "log"]
  for fn in fns
    method = console[fn]
    if Function.prototype.bind # ie9
      console[fn] = ->
        f = Function.prototype.bind.call method, console
        f Array.prototype.slice.call(arguments).join(" ")
    else if Function.prototype.call # ie8
      console[fn] = ->
        Function.prototype.call.call method, console, Array.prototype.slice.call(arguments).join(" ")
  undefined

Logger.__now = ->
  d = new Date()
  d.toLocaleTimeString()

Logger::__header = (cate) ->
  "#{cate} #{@__prefix} #{Logger.__now()}: "

#
# public methods/fields
Logger[name] = name for name, _ of Logger.__loglevels

Logger.setLevel = (level) ->
  levels = Logger.__loglevels
  level = levels[level]
  if level? and levels.OFF <= level <= levels.DEBUG
    Logger.__level = level

Logger.getLevel = ->
  Logger.__level

# instance log level can overwrite global log level
# only if level is severer than global log level
Logger::setLevel = (level) ->
  levels = Logger.__loglevels
  level = levels[level]
  if level? and levels.OFF <= level <= levels.DEBUG
    @__level = level if level <= Logger.__level

Logger::getLevel = ->
  @__level

Logger::error = (msgs...) ->
  level = Math.min Logger.__level, @__level
  if console?.error? and level >= Logger.__loglevels.ERROR
    console.error @__header("ERROR"), msgs...

Logger::warn = (msgs...) ->
  level = Math.min Logger.__level, @__level
  if console?.warn? and level >= Logger.__loglevels.WARN
    console.warn @__header("WARN"), msgs...

Logger::info = (msgs...) ->
  level = Math.min Logger.__level, @__level
  if console?.info? and level >= Logger.__loglevels.INFO
    console.info @__header("INFO"), msgs...

Logger::debug = (msgs...) ->
  level = Math.min Logger.__level, @__level
  if console?.log? and level >= Logger.__loglevels.DEBUG
    console.log @__header("DEBUG"), msgs...

# export Logger
root = exports ? window
root.Logger = Logger