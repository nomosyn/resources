/**
 * In Charge:
 *   fullname: <Your full name>, contact: <your email>
 *
 *
 * Author:
 *   fullname: <Your full name>, contact: <your email>
 *
 *
 * Contributors:
 *   fullname: <Your full name>, contact: <your email>
 *
 *
 ********************************************************************************
 *
 *
 * - Informal specification
 *   - <SOMEONE> _expects_ <SOME FEATURE TO BE IMPLEMENTED> _so that_ <SOMEONE GAINS SOMETHING>
 *       - Ex: Team _expects_ the isoBrowser class to detect users
 *         browsers _so that_ it's possible for the team to write browser
 *         specific code.
 *
 *
 *
 * - Formal specification
 *   - isoBrowser
 *     - (def 554a) Given an dictionnary of functions, returns a function `f` so
 *                  that executing `f(x)` on Chrome | Firefox will call Chrome |
 *                  Firefox specific code.
 *       - (def 86d7) Given a browser id, returns a boolean indicating if the
 *                    corresponding browser is executing this function.
 *
 *     - (def 3955) <description> ...
 *
 */


/*global isoBrowser:true, R, utils*/

isoBrowser = null;

(function () {
    'use strict';


    /** Class imports */

    var genericError = utils.genericError;
    var contains = R.contains;
    var rPartial = R.rPartial;
    var map = R.map;
    var head = R.head;
    var toPairs = R.toPairs;
    var last = R.last;
    var filter = R.filter;
    var compose = R.compose;
    // ...



    /** Class implementation */

    /** (ref 554a)
     *
     * browserName -> boolean | Error
     *   Error raised if input not in expected list of names.
     */
    var detectBrowser =
            (function () {
                var cachedBrowserInfo = { /* some info computed from executing browser */ };
                var validNames = ['chrome', 'firefox', 'opera'];
                var isValidName = rPartial(contains, validNames);

                return function (browserName) {
                    isValidName(browserName) ||
                        genericError('browserName should have been one of: `'+validNames+'`');

                    return cachedBrowserInfo.name === browserName;
                };
            }());



    /** (ref 554a)
     *
     *  { browserName: Function, ... } -> Error | last([browserName, Function]) such
     *  that browserName matches current browser.
     *
     *  Raises an error if 0 or more than 1 function is defined for the current
     *  browser.
     */
    var selectFunction =
            function (fDic) {

                var candidatesFunctions =
                        compose(
                            filter(function (e) { return e !== null; })
                            , map(function (pair) { return detectBrowser(head(pair)) ? last(pair) : null; })
                            , toPairs)(fDic);

                return candidatesFunctions.length === 0 ?
                    genericError('no function is defined for this browser')
                    : (candidatesFunctions.length > 1 ?
                       genericError('Too many functions are defined for this browser')
                       : head(candidatesFunctions));
            };



    /** (ref 3955)
     *
     * some input -> some output
     *  side effects
     */
    var someFunction = function () {};



    /** Class api */

    isoBrowser =
        {
            /** (ref 554a) */
            'selectFunction': selectFunction

            /** (ref 3955) */
            , 'someFunction': someFunction
        };


}());
