/**
 * This is your application's main script file. It is written in JavaScript.
 * This scripting establishes all of the interactivity in your user interface.
 */

/**
 * This next line loads jQuery. jQuery has been the cornerstone of front-end
 * development for a very long time, and it continues to be a useful tool
 * for scripting basic interactivity, rudimentary animation, and building
 * clients for sending and receiving data from servers. 
 *
 * We load jQuery into the global scope mainly because that's what Bootstrap,
 * loaded later, requires us to do. It's also a useful library to have available
 * in the JavaScript console of your browser.
 */
window.jQuery = require('jquery');

/**
 * Tether, by comparison, is a much simpler library. It's used to implement
 * "sticky" user interface components that are anchored to specific locations
 * on the screen as well as to other elements.
 *
 * Like jQuery, Tether is also loaded into the global scope, also because 
 * Bootstrap requires us to do so. Unlike jQuery, you will not have a direct
 * use for Tether—it does its job completely behind the scenes.
 */
window.Tether = require('tether');

/**
 * Bootstrap is a collection of user interface layout and components tools
 * that can provide for the vast majority of application use cases. It is 
 * the first library we're loading that has complex dependencies—it won't
 * work unless we load jQuery and Tether first. Unlike those other libraries,
 * it does not get loaded into the global scope, rather, it adds features
 * to jQuery.
 */
require('bootstrap');


/**
 * The last and most complex library we're loading is Vue. Vue is the basis
 * for developing "reactive" user interfaces, meaning that the changes we
 * see in the presentation to the user are mostly automatic, triggered by
 * changes in data. 
 */
window.Vue = require('vue');

/**
 * Here we create a Vue instance to wrap the entire user interface. This 
 * makes every HTML element on the page part of our application, and capable
 * of being influenced by the data we store in the object. We're assigning
 * the Vue instance to a global variable named "app", which means that you
 * can access the instance via the JavaScript console in your browser.
 */
window.app = new Vue({

  /**
   * This configuration variable tells Vue which HTML element it should be
   * attached to. It uses an ID-type selector, corresponding to an HTML element
   * with an attribute id="app". If this element is not present when the
   * script loads, an error will appear in your JavaScript console.
   */
  el: '#app',

  /**
   * This configuration variable establishes the data that can and will 
   * change during the operation of your application. Although using a 
   * function here is not technically necessary, it is a pattern that is
   * required when building Vue components, which we will explore later, so
   * we begin our practice here of using functions to establish data.
   */
  data: function() {

    /**
     * We return a single object literal. Each property of the object
     * literal establishes a new data variable in the Vue. Vue will 
     * "watch" each of these variables, and will "react" to any changes
     * it detects there. This is the key power of Vue: you change the data
     * and Vue updates the "view"—while there are exceptions to this behavior,
     * embracing this behavior will both save you time and result in code
     * that is easier to maintain.
     */
    return {

      /**
       * Our application is very simple: it uses several different kinds
       * of UI to report the progress of some unknown task. Because we are
       * assigning our Vue instance to a global variable, you can modify
       * this variable from your JavaScript console, e.g., "app.progress = 95;".
       */
      progress: 0

    }
  },

  /**
   * A view's methods provides an interface through which a user's interactions
   * can result in changes to the view's data. It is not necessary to have
   * methods for every one of your view's variables—in fact, you can modify
   * view data directly. Instead, methods should be thought of as describing
   * more complex relationships between behavior and data. Because our
   * application deals in reporting progress, we have two simple methods for
   * interacting with that data or "state".
   */
  methods: {

    /**
     * This method advances the recorded progress by 1. 
     * Unlike modifying the progress variable directly, this method prevents
     * its users from advancing progress beyond 100.
     * 
     * @return {[type]} [description]
     */
    advance: function() {

      /**
       * The Math.min function accepts two arguments, and returns the
       * argument that is the smaller of the two. The result is assigned
       * to our data variable "progress". Because one of the two arguments
       * is set to 100, progress can never be advanced beyond 100.
       */
      this.progress = Math.min(this.progress + 1, 100);

      /*
      
      Another more explicit way to express the above would be:

      if (this.progress + 1 < 100) {
        this.progress++;
      } else {
        this.progress = 100;
      }

      And another:

      if (this.progress < 100) {
        this.progress + 1;
      }

      Here's another way:

      this.progress++;
      if (this.progress > 100) {
        this.progress = 100;
      }

      The problem with the second approach is that it does in fact allow
      our progress variable to exceed 100, if for only a view microseconds.
      I've given you these examples as a means of explaining both that 
      there are many ways to solve a single programming problem and that
      sometimes, there are ways to solve a problem that seem OK but are in
      fact flawed.

      So why do it the way we did it above on line 22? Well, it allows
      for the value 1 to be replaced by a variable. For example:

      this.progress = Math.min(this.progress + input, 100);

      In this way, "input" could be an argument for our advance function,
      like this:

      advance: function(input) {
        this.progress = Math.min(this.progress + input, 100);
      }

      This is the least complex way to solve this problem—it is easy
      to read, it's forard-thinking, and it does exactly what we need it
      to do. Practice makes perfect.

       */
    },

    /**
     * This method reduces the recorded progress by 1.
     * Progress is not allowed to retreat below 0.
     * 
     * @return {[type]} [description]
     */
    retreat: function() {
      this.progress = Math.max(this.progress - 1, 0);
    }

  }


});