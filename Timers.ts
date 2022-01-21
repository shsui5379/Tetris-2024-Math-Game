// inspiration: https://stackoverflow.com/questions/3969475/javascript-pause-settimeout
class Timeout {
   //the timeout id
   #timeoutId: number;
   //timestamp when timeout was set
   #startTime: number;
   //ms remaining in timeout
   #timeRemaining: number;
   //the callback
   #callback: Function;
   //0: running, 1: paused, 2: cleared
   #state: 0 | 1 | 2;

   /**
    * Sets a timeout
    * @constructor
    * 
    * @param {Function} callback  The callback when timeout is reached
    * @param {number} time  The number of ms to timeout for
    */
   constructor(callback: Function, time: number) {
      this.#startTime = Date.now();
      this.#timeRemaining = time;
      this.#timeoutId = setTimeout(callback, time);
      this.#callback = callback;
      this.#state = 0;
   }

   /**
    * Clears this timeout
    */
   clear(): void {
      clearTimeout(this.#timeoutId);
      this.#state = 2;
   }

   /**
    * Pauses this timeout
    */
   pause(): void {
      if (this.#state === 0 && Date.now() < this.#startTime + this.#timeRemaining) {
         this.#timeRemaining = this.#startTime + this.#timeRemaining - Date.now();
         clearTimeout(this.#timeoutId);
         this.#state = 1;
      }
   }

   /**
    * Resumes this timeout
    */
   resume(): void {
      if (this.#state === 1) {
         this.#startTime = Date.now();
         this.#timeoutId = setTimeout(this.#callback, this.#timeRemaining);
         this.#state = 0;
      }
   }
}

class Interval {
   //the interval id
   #intervalId: number;
   //timestamp when the callback was last called
   #lastCallTime: number;
   //ms remaining until next call
   #timeToNextCall: number;
   //the callback
   #callback: Function;
   //the interval duration
   #duration: number;
   //0: running, 1: paused, 2: cleared
   #state: 0 | 1 | 2;
   //true if a timeout is running to resume a partial duration
   #resumeTimeout: boolean;


   /**
    * Sets an interval
    * @constructor
    * 
    * @param {Function} callback  The callback used by the interval
    * @param {number} time  The number of ms to wait for
    */
   constructor(callback: Function, time: number) {
      this.#lastCallTime = Date.now();
      this.#timeToNextCall = time;
      this.#intervalId = window.setInterval(this.#proxyCallback.bind(this), time);
      this.#callback = callback;
      this.#duration = time;
      this.#state = 0;
      this.#resumeTimeout = false;
   }

   #proxyCallback(): void {
      console.log(this.#intervalId + " calling");
      this.#timeToNextCall = this.#duration;
      this.#lastCallTime = Date.now();
      this.#callback();
   }

   /**
    * Clears this interval
    */
   clear(): void {
      if (this.#resumeTimeout) {
         clearTimeout(this.#intervalId);
      } else {
         clearInterval(this.#intervalId);
         console.log(this.#intervalId + "cleared");
      }
      this.#state = 2;
   }

   /**
    * Pauses this interval
    */
   pause(): void {
      if (this.#state === 0) {
         this.#timeToNextCall = this.#lastCallTime + this.#timeToNextCall - Date.now();
         if (this.#resumeTimeout) {
            clearTimeout(this.#intervalId);
         } else {
            clearInterval(this.#intervalId);
         }
         this.#state = 1;
      }
   }

   /**
    * Resumes this interval
    */
   resume(): void {
      if (this.#state === 1) {
         this.#lastCallTime = Date.now();
         this.#intervalId = window.setTimeout(this.#proxyCallbackResume.bind(this), this.#timeToNextCall);
         this.#state = 0;
         this.#resumeTimeout = true;
      }
   }

   #proxyCallbackResume(): void {
      this.#proxyCallback();
      this.#intervalId = window.setInterval(this.#proxyCallback.bind(this), this.#timeToNextCall);
      this.#resumeTimeout = false;
   }
}