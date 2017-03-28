"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cp = require("child_process");
var fs = require("fs-extra");
var path = require("path");
function buildProject(callback) {
    var projectPath = process.cwd();
    executeCommand("tsc", ["-p", projectPath], callback);
}
exports.buildProject = buildProject;
function buildEngine(callback) {
    var projectPath = process.cwd();
    // let configFile = path.join(projectPath, "engine.json");
    // let config = fs.readJSONSync(configFile);
    // let enginePath = config.engine;
    var enginePath = "H:\wangze\newStart\engine";
    executeCommand("tsc", ["-p", enginePath], function () {
        var source = path.join(enginePath, "out");
        var target = path.join(projectPath, 'engine');
        fs.copy(source, target, callback);
    });
}
exports.buildEngine = buildEngine;
function executeCommand(command, args, callback) {
    var child_process = cp.exec(command, args);
    child_process.stdout.addListener("data", function (data) {
        console.log(data.toString());
    });
    child_process.stderr.addListener("data", function (data) {
        console.log(data.toString());
    });
    child_process.addListener("close", function () {
        callback();
    });
}
function buildAll() {
    buildEngine(function () {
        buildProject(function () {
        });
    });
}
exports.buildAll = buildAll;
//# sourceMappingURL=build.js.map