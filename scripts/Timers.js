"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Timeout_timeoutId, _Timeout_startTime, _Timeout_timeRemaining, _Timeout_callback, _Timeout_state, _Interval_instances, _Interval_intervalId, _Interval_lastCallTime, _Interval_timeToNextCall, _Interval_callback, _Interval_duration, _Interval_state, _Interval_resumeTimeout, _Interval_proxyCallback, _Interval_proxyCallbackResume;
// inspiration: https://stackoverflow.com/questions/3969475/javascript-pause-settimeout
class Timeout {
    /**
     * Sets a timeout
     * @constructor
     *
     * @param {Function} callback  The callback when timeout is reached
     * @param {number} time  The number of ms to timeout for
     */
    constructor(callback, time) {
        //the timeout id
        _Timeout_timeoutId.set(this, void 0);
        //timestamp when timeout was set
        _Timeout_startTime.set(this, void 0);
        //ms remaining in timeout
        _Timeout_timeRemaining.set(this, void 0);
        //the callback
        _Timeout_callback.set(this, void 0);
        //0: running, 1: paused, 2: cleared
        _Timeout_state.set(this, void 0);
        __classPrivateFieldSet(this, _Timeout_startTime, Date.now(), "f");
        __classPrivateFieldSet(this, _Timeout_timeRemaining, time, "f");
        __classPrivateFieldSet(this, _Timeout_timeoutId, setTimeout(callback, time), "f");
        __classPrivateFieldSet(this, _Timeout_callback, callback, "f");
        __classPrivateFieldSet(this, _Timeout_state, 0, "f");
    }
    /**
     * Clears this timeout
     */
    clear() {
        clearTimeout(__classPrivateFieldGet(this, _Timeout_timeoutId, "f"));
        __classPrivateFieldSet(this, _Timeout_state, 2, "f");
    }
    /**
     * Pauses this timeout
     */
    pause() {
        if (__classPrivateFieldGet(this, _Timeout_state, "f") === 0 && Date.now() < __classPrivateFieldGet(this, _Timeout_startTime, "f") + __classPrivateFieldGet(this, _Timeout_timeRemaining, "f")) {
            __classPrivateFieldSet(this, _Timeout_timeRemaining, __classPrivateFieldGet(this, _Timeout_startTime, "f") + __classPrivateFieldGet(this, _Timeout_timeRemaining, "f") - Date.now(), "f");
            clearTimeout(__classPrivateFieldGet(this, _Timeout_timeoutId, "f"));
            __classPrivateFieldSet(this, _Timeout_state, 1, "f");
        }
    }
    /**
     * Resumes this timeout
     */
    resume() {
        if (__classPrivateFieldGet(this, _Timeout_state, "f") === 1) {
            __classPrivateFieldSet(this, _Timeout_startTime, Date.now(), "f");
            __classPrivateFieldSet(this, _Timeout_timeoutId, setTimeout(__classPrivateFieldGet(this, _Timeout_callback, "f"), __classPrivateFieldGet(this, _Timeout_timeRemaining, "f")), "f");
            __classPrivateFieldSet(this, _Timeout_state, 0, "f");
        }
    }
}
_Timeout_timeoutId = new WeakMap(), _Timeout_startTime = new WeakMap(), _Timeout_timeRemaining = new WeakMap(), _Timeout_callback = new WeakMap(), _Timeout_state = new WeakMap();
class Interval {
    /**
     * Sets an interval
     * @constructor
     *
     * @param {Function} callback  The callback used by the interval
     * @param {number} time  The number of ms to wait for
     */
    constructor(callback, time) {
        _Interval_instances.add(this);
        //the interval id
        _Interval_intervalId.set(this, void 0);
        //timestamp when the callback was last called
        _Interval_lastCallTime.set(this, void 0);
        //ms remaining until next call
        _Interval_timeToNextCall.set(this, void 0);
        //the callback
        _Interval_callback.set(this, void 0);
        //the interval duration
        _Interval_duration.set(this, void 0);
        //0: running, 1: paused, 2: cleared
        _Interval_state.set(this, void 0);
        //true if a timeout is running to resume a partial duration
        _Interval_resumeTimeout.set(this, void 0);
        __classPrivateFieldSet(this, _Interval_lastCallTime, Date.now(), "f");
        __classPrivateFieldSet(this, _Interval_timeToNextCall, time, "f");
        __classPrivateFieldSet(this, _Interval_intervalId, window.setInterval(__classPrivateFieldGet(this, _Interval_instances, "m", _Interval_proxyCallback).bind(this), time), "f");
        __classPrivateFieldSet(this, _Interval_callback, callback, "f");
        __classPrivateFieldSet(this, _Interval_duration, time, "f");
        __classPrivateFieldSet(this, _Interval_state, 0, "f");
        __classPrivateFieldSet(this, _Interval_resumeTimeout, false, "f");
    }
    /**
     * Clears this interval
     */
    clear() {
        if (__classPrivateFieldGet(this, _Interval_resumeTimeout, "f")) {
            clearTimeout(__classPrivateFieldGet(this, _Interval_intervalId, "f"));
        }
        else {
            clearInterval(__classPrivateFieldGet(this, _Interval_intervalId, "f"));
            console.log(__classPrivateFieldGet(this, _Interval_intervalId, "f") + "cleared");
        }
        __classPrivateFieldSet(this, _Interval_state, 2, "f");
    }
    /**
     * Pauses this interval
     */
    pause() {
        if (__classPrivateFieldGet(this, _Interval_state, "f") === 0) {
            __classPrivateFieldSet(this, _Interval_timeToNextCall, __classPrivateFieldGet(this, _Interval_lastCallTime, "f") + __classPrivateFieldGet(this, _Interval_timeToNextCall, "f") - Date.now(), "f");
            if (__classPrivateFieldGet(this, _Interval_resumeTimeout, "f")) {
                clearTimeout(__classPrivateFieldGet(this, _Interval_intervalId, "f"));
            }
            else {
                clearInterval(__classPrivateFieldGet(this, _Interval_intervalId, "f"));
            }
            __classPrivateFieldSet(this, _Interval_state, 1, "f");
        }
    }
    /**
     * Resumes this interval
     */
    resume() {
        if (__classPrivateFieldGet(this, _Interval_state, "f") === 1) {
            __classPrivateFieldSet(this, _Interval_lastCallTime, Date.now(), "f");
            __classPrivateFieldSet(this, _Interval_intervalId, window.setTimeout(__classPrivateFieldGet(this, _Interval_instances, "m", _Interval_proxyCallbackResume).bind(this), __classPrivateFieldGet(this, _Interval_timeToNextCall, "f")), "f");
            __classPrivateFieldSet(this, _Interval_state, 0, "f");
            __classPrivateFieldSet(this, _Interval_resumeTimeout, true, "f");
        }
    }
}
_Interval_intervalId = new WeakMap(), _Interval_lastCallTime = new WeakMap(), _Interval_timeToNextCall = new WeakMap(), _Interval_callback = new WeakMap(), _Interval_duration = new WeakMap(), _Interval_state = new WeakMap(), _Interval_resumeTimeout = new WeakMap(), _Interval_instances = new WeakSet(), _Interval_proxyCallback = function _Interval_proxyCallback() {
    console.log(__classPrivateFieldGet(this, _Interval_intervalId, "f") + " calling");
    __classPrivateFieldSet(this, _Interval_timeToNextCall, __classPrivateFieldGet(this, _Interval_duration, "f"), "f");
    __classPrivateFieldSet(this, _Interval_lastCallTime, Date.now(), "f");
    __classPrivateFieldGet(this, _Interval_callback, "f").call(this);
}, _Interval_proxyCallbackResume = function _Interval_proxyCallbackResume() {
    __classPrivateFieldGet(this, _Interval_instances, "m", _Interval_proxyCallback).call(this);
    __classPrivateFieldSet(this, _Interval_intervalId, window.setInterval(__classPrivateFieldGet(this, _Interval_instances, "m", _Interval_proxyCallback).bind(this), __classPrivateFieldGet(this, _Interval_timeToNextCall, "f")), "f");
    __classPrivateFieldSet(this, _Interval_resumeTimeout, false, "f");
};
//# sourceMappingURL=Timers.js.map