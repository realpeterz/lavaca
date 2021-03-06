/*
Lavaca 1.0.3
Copyright (c) 2012 Mutual Mobile

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function(Lavaca, $) {

/*
// Uncomment this section to use hash-based browser history instead of HTML5 history.
// You should use hash-based history if there's no server-side component supporting your app's routes.

Lavaca.net.History.overrideStandardsMode();
*/

/**
 * @class app
 * @super Lavaca.mvc.Application
 * Global application-specific object
 */
window.app = new Lavaca.mvc.Application(function() {
  // Setup offline AJAX handler
  Lavaca.net.Connectivity.registerOfflineAjaxHandler(app.onOfflineAjax);
  // Initialize the models cache
  app.models.init();
  // Initialize the routes
  app.router.add({
    '/': [app.net.ExampleController, 'home'],
    '/lang': [app.net.ExampleController, 'lang']
  });
  // Initialize the loading indicator
  app.loadingIndicator = Lavaca.ui.LoadingIndicator.init();
});

/**
 * @method showErrors
 * Shows the errors dialog
 *
 * @param {Array} errors  A list of error messages
 * @return {Lavaca.util.Promise}  A promise
 */
app.showErrors = function(errors) {
  return this.viewManager.load(null, app.ui.views.ErrorsView, {errors: errors}, 900);
};

/**
 * @method onOfflineAjax
 * Handles attempts to make an AJAX request when the application is offline
 */
app.onOfflineAjax = function() {
  plugins.notification.alert(Lavaca.util.Translation.get('error_offline'));
};

})(Lavaca, Lavaca.$);