Why bother another Javascript Logging library?
==================
Most Javascript logging libraries log to a separate windows or HTML control. This is very inconvenient in my opinion. There're a few libraries log to browser console. I don't know all of them, but I know some libraries keep history of logs. This may consume a significant amount of memory if you log a lot. So here comes my own `Logger`. It does nothing other than logging to browser console.

How to use?
--------
It's incredibly simple!

In .HTML:

    <script type="text/javascript" src="../lib/logger.js"></script>

In .js:

    var logger = new Logger("MainModule"); // logger name is optional
    logger.debug("hello", "world", 42, [42, 37], {foo: 42});
    logger.info("hello", "world", 42, [42, 37], {foo: 42});
    logger.warn("hello", "world", 42, [42, 37], {foo: 42});
    logger.error("hello", "world", 42, [42, 37], {foo: 42});

    // logging level defaults to DEBUG
    // you can change logging level
    // use Logger.OFF to turn off logging
    logger.setLevel(Logger.INFO); // set logging level to INFO for this instance
    Logger.setLevel(Logger.WARN); // set global loggin level
    // other logging levels: Logger.DEBUG, Logger.ERROR

    // you might need current logging level
    logger.getLevel(); // get instance logging level
    Logger.getLevel(); // get global longging level

Sample output:

    INFO Foo 22:39:44:  hello world info

Features
--------
+ Named logger, meaning you can give distinct names to your loggers for separate modules.
+ Logging level: `OFF, ERROR, WARN, INFO, DEBUG`. You can set logging level globally or set instance specific logging level for individual loggers. Instance logging level will overwrite global logging level.

Build from source
-------------
**Source code is written in CoffeeScript, the Javascript files are automatically generated. You shouldn't edit Javascript files directly.**

You need Node.js and `coffee-script` to compile CoffeeScript.

Run `cake build` to compile CoffeeScript to Javascript. There're two more tasks:

+ `cake test`, compile the tests.
+ `cake all`, compile src and tests.

Supported browsers
-------------
I have tested it on Chrome 21, Firefox 14, and Internet Explorer 9 with all possible browser mode and document mode combinations.
Older versions of these browsers should work as well.

Know Issues:
---------
Internet Explorer's support for logging object/array is not very good. You have to convert your object/array to string manually before logging them to console if you want better output.