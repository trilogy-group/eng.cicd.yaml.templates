/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 151:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 989:
/***/ ((module) => {

module.exports = eval("require")("@actions/exec");


/***/ }),

/***/ 866:
/***/ ((module) => {

module.exports = eval("require")("duration-js");


/***/ }),

/***/ 595:
/***/ ((module) => {

module.exports = eval("require")("semver");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nccwpck_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__nccwpck_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__nccwpck_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ../../../../../../../usr/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?@actions/core
var core = __nccwpck_require__(151);
// EXTERNAL MODULE: ../../../../../../../usr/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?duration-js
var _notfoundduration_js = __nccwpck_require__(866);
var _notfoundduration_js_default = /*#__PURE__*/__nccwpck_require__.n(_notfoundduration_js);
// EXTERNAL MODULE: ../../../../../../../usr/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?@actions/exec
var exec = __nccwpck_require__(989);
;// CONCATENATED MODULE: external "path"
const external_path_namespaceObject = require("path");
;// CONCATENATED MODULE: external "os"
const external_os_namespaceObject = require("os");
// EXTERNAL MODULE: ../../../../../../../usr/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?semver
var _notfoundsemver = __nccwpck_require__(595);
;// CONCATENATED MODULE: ./curl.js






async function curl(
  url,
  { maxAttempts, retryDelaySeconds, retryAll, followRedirect, timeOut }
) {
  const options = ["--fail", "-sv"];
  if (maxAttempts > 1) {
    options.push(
      "--retry",
      maxAttempts,
      "--retry-delay",
      retryDelaySeconds,
      "--retry-connrefused"
    );
  }
  if (followRedirect) {
    options.push("-L");
  }
  if (retryAll) {
    options.push("--retry-all-errors");
  }

  if (timeOut) {
    options.push("--connect-timeout", timeOut);
  }

  options.push(url);

  core.info(`Checking ${url}`);
  core.debug(`Command: curl ${options.join(" ")}`);

  return (0,exec.exec)("curl", options);
}

async function isVersion(atLeast) {
  const curlVersionOutput = await (0,exec.getExecOutput)("curl --version");
  const rawVersion = curlVersionOutput.stdout.match(/curl (\d+\.\d+\.\d+)/)[1];
  const installed = _notfoundsemver.clean(rawVersion);
  return _notfoundsemver.gte(installed, atLeast);
}

async function upgrade() {
  const upgrader = {
    linux: {
      exec: async () => {
        const binDir = external_path_namespaceObject.join(external_os_namespaceObject.homedir(), ".bin");
        const curlPath = external_path_namespaceObject.join(binDir, "curl");
        // From https://curl.se/download.html#Linux
        const curlUrl = `https://github.com/moparisthebest/static-curl/releases/download/v7.78.0/curl-amd64`;
        await (0,exec.exec)("mkdir", ["-p", binDir]);
        await (0,exec.exec)("wget", ["-O", curlPath, curlUrl]);
        await (0,exec.exec)("chmod", ["+x", curlPath]);
        core.addPath(binDir);
      },
    },
    win32: {
      exec: async () => {
        await (0,exec.exec)("choco", ["install", "curl"]);
      },
    },
    darwin: {
      exec: async () => {
        await (0,exec.exec)("brew", ["install", "curl"]);
      },
    },
  };

  const platformUpgrader = upgrader[process.platform];
  if (!platformUpgrader) {
    throw new Error(
      `Unsupported platform: ${
        process.platform
      }, supported platforms: ${Object.keys(upgrader).join(", ")}`
    );
  }

  await platformUpgrader.exec();
}

;// CONCATENATED MODULE: ./index.js




async function run() {
  const urlString = core.getInput("url", { required: true });
  const maxAttemptsString = core.getInput("max-attempts");
  const timeoutString = core.getInput("timeout");
  const retryDelay = core.getInput("retry-delay");
  const followRedirect = core.getBooleanInput("follow-redirect");
  const retryAll = core.getBooleanInput("retry-all");

  const urls = urlString.split("|");
  const retryDelaySeconds = _notfoundduration_js_default().parse(retryDelay).seconds();
  const maxAttempts = parseInt(maxAttemptsString);
  const timeout = _notfoundduration_js_default().parse(timeoutString).seconds();

  if (retryAll) {
    const isUpToDate = await isVersion("7.71.0");
    if (!isUpToDate) {
      core.warning(
        "The installed version of curl does not support retry-all-errors. " +
          "It will be upgraded automatically. If you don't want this to happen, you need to either " +
          "upgrade it manually, or turn off retry-all."
      );
      await upgrade();
    }
  }

  for (const url of urls) {
    // We don't need to do it in parallel, we're going to have to
    // wait for all of them anyway
    await curl(url, {
      maxAttempts,
      retryDelaySeconds,      
      retryAll,
      followRedirect,
      timeout
    });
  }

  core.info("Success");
}

run().catch((e) => {
  core.setFailed(e.message);
});

})();

module.exports = __webpack_exports__;
/******/ })()
;