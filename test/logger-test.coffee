run_tests = ->
  logger = new Logger("Foo")
  logger.error 42, 2, "hello error", [1, 2]
  logger.warn [42, 2], 3, "foo warn"
  logger.info "hello", "world", "info"
  logger.debug "logger", "debug", 42, {a: 1, b: 2}

  logger.setLevel Logger.INFO

  logger.error 42, 2, "hello error", [1, 2]
  logger.warn [42, 2], 3, "foo warn"
  logger.info "hello", "world", "info"
  logger.debug "logger", "debug", 42, {a: 1, b: 2}

run_tests()

Logger.setLevel Logger.WARN
run_tests()

