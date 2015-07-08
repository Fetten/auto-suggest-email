var autoSuggestEmail;
autoSuggestEmail = function (inputElement, options) {

    'use strict';

    // cutting the mustard
    // (http://responsivenews.co.uk/post/18948466399/cutting-the-mustard)
    var supports = !!document.querySelector && !!window.addEventListener;
    if (!supports) {
        return;
    }

    var self = this;
    self.inputElement = inputElement;
    self.options = options || {};

    var i;

    // set default options
    var defaultOptions = {
        domains: [
            'aol.com',
            'facebook.com',
            'gmail.com',
            'googlemail.com',
            'hotmail.com',
            'hotmail.co.uk',
            'icloud.com',
            'live.com',
            'me.com',
            'mail.com',
            'msn.com',
            'outlook.com',
            'yahoo.com',
            'yahoo.co.uk',
            'ymail.com'
        ],
        priority: [
            'gmail.com',
            'icloud.com',
            'hotmail.com',
            'facebook.com',
            'outlook.com',
            'yahoo.com'
        ]
    };

    // check if options have been set
    var opt;
    for (opt in defaultOptions) {
        if (defaultOptions.hasOwnProperty(opt) && !self.options.hasOwnProperty(opt)) {
            self.options[opt] = defaultOptions[opt];
        }
    }

    // if no input field has been defined or could not been found,
    // we check for a standard id 'email' in any form on the page
    if (self.inputElement === 'undefined' || self.inputElement === null) {
        self.inputElement = document.querySelector('form input#email');
    }

    // no input field has been found, giving up!
    if (self.inputElement === null) {

        return false;
    }

    // Create the container for the auto suggest drop down list
    self.listContainer = document.createElement('ul');
    self.listContainer.style.display = 'none';
    self.listContainer.style.position = 'absolute';
    self.listContainer.id = 'asm-autolist';
    self.listContainer.className = 'asm-dropdown';
    self.inputElement.parentNode.insertBefore(self.listContainer, self.inputElement.nextSibling);


    /*
     * Main Logic
     *
     * Checks for auto-suggestions after each key input in the e-mail field.
     *
     */
    self.inputElement.addEventListener('keydown', function (event) {
        // if user clicks enter, prevent submitting the form
        if (13 === event.keyCode) {
            event.preventDefault();
        }
    });

    self.inputElement.addEventListener('keyup', function (event) {

        // if user clicks enter, fill in the form
        if (13 === event.keyCode) {
            if (document.getElementsByClassName('is-highlighted')) {
                event.preventDefault();
                var selected = document.getElementsByClassName('is-highlighted')[0];
                self.inputElement.value = selected.textContent;
                self.listContainer.style.display = 'none';
            }
        }

        // if user hits left or right arrow or backspace, hide the list. The user is likely to correct an error
        else if (37 === event.keyCode || 39 === event.keyCode || 8 === event.keyCode) {
            self.listContainer.style.display = 'none';
        }

        // if user hits down or up arrow, select next or previous item in the list
        else if (40 == event.keyCode || 38 == event.keyCode) {
            var newHighlight;

            if (typeof document.getElementsByClassName('is-highlighted') !== 'undefined') {
                // down arrow
                if (40 == event.keyCode) {
                    newHighlight = document.getElementsByClassName('is-highlighted')[0].nextSibling;
                }
                // up arrow
                else if (38 == event.keyCode) {
                    newHighlight = document.getElementsByClassName('is-highlighted')[0].previousSibling;
                }
            }

            if (newHighlight) {
                // remove highlight state from all siblings
                for (i = 0; i < newHighlight.parentNode.childNodes.length; i += 1) {
                    newHighlight.parentNode.childNodes[i].classList.remove('is-highlighted');
                }

                // add highlight state to current list item
                addClass(newHighlight, 'is-highlighted');
            }
        } else { // user types in characters
            var exactMatches = [];
            var errorMatches = [];

            // empty the list container
            while (self.listContainer.firstChild) {
                self.listContainer.removeChild(self.listContainer.firstChild);
            }
            self.listContainer.style.display = 'none';

            var emailSplit = self.inputElement.value.trim().split('@');
            if (emailSplit.length < 2 || emailSplit[0] === '') {

                return;
            }

            //get the text after @
            var emailDomain = emailSplit[1];

            if (emailDomain.length === 0) {
                for (i = 0; i < self.options.priority.length; i += 1) {
                    exactMatches.push(self.options.priority[i]);
                }


            } else {
                var testString;
                for (i = 0; i < self.options.domains.length; i += 1) {
                    testString = self.options.domains[i].substr(0, emailDomain.length);

                    if (emailDomain === testString) {
                        exactMatches.push(self.options.domains[i]);
                    } else if (getEditDistance(emailDomain, testString) < 2 && emailDomain.length > 1) {
                        errorMatches.push(self.options.domains[i]);
                    }
                }
            }

            var subStr;
            var li;

            if (exactMatches.length > 0) {
                for (i = 0; i < exactMatches.length; i += 1) {

                    // take first domain match for autocomplete
                    subStr = exactMatches[i].substr(emailDomain.length, exactMatches[i].length);

                    // insert exact match into list
                    li = document.createElement('li');
                    li.innerHTML = self.inputElement.value + '<strong>' + subStr + '</strong>';
                    self.listContainer.appendChild(li);
                }
                addListListeners();

            } else if (errorMatches.length > 0) {
                for (i = 0; i < errorMatches.length; i += 1) {
                    // take first domain match for autocomplete
                    subStr = errorMatches[i].substr(emailDomain.length, errorMatches[i].length);

                    // insert error corrected match into list
                    li = document.createElement('li');
                    li.innerHTML = emailSplit[0] + '@' + '<strong>' + errorMatches[i] + '</strong>';
                    self.listContainer.appendChild(li);
                }
                addListListeners();
            }

        } // end of else statement

    }, false); // end Main Logic


    /*
     * Add Event Listeners to the list
     *
     * creates event listeners on each list element for click and mouseenter
     * and handles the highlight style
     *
     * @return void
     * @access private
     */
    function addListListeners() {
        var results = self.listContainer.querySelectorAll('li');

        // add highlight class to first result
        addClass(results[0], 'is-highlighted');

        // run through each result, add some style and
        // add an event listener to each
        var i;
        for (i = 0; i < results.length; i += 1) {

            // add some style
            results[i].style.cursor = 'pointer';

            // event listener for click event
            results[i].addEventListener('click', function () {
                self.inputElement.value = this.textContent;
                self.listContainer.style.display = 'none';
            }, false);

            // event listener for mouseenter event
            results[i].addEventListener('mouseenter', function () {

                // remove highlight state from all siblings
                for (i = 0; i < this.parentNode.childNodes.length; i += 1) {
                    this.parentNode.childNodes[i].classList.remove('is-highlighted');
                }

                // add highlight state to current list item
                addClass(this, 'is-highlighted');

            }, false);
        }

        self.listContainer.style.display = '';
    } // end addListListeners


    /*
     * Add class
     *
     * Helper function. Add a css class to an element
     *
     * @param  element   obj
     * @param  className string
     * @return void
     * @access private
     */
    function addClass(element, className) {
        if (element.classList) {
            element.classList.add(className);
        } else {
            element.className += ' ' + className;
        }
    }


    /*
     * Get edit distance
     *
     * Compute the edit distance between the two given strings
     * based on the Levenshtein distance algorithm
     *
     * Copyright 2011 Andrei Mackenzie
     * License: MIT License (https://gist.github.com/andrei-m/982927)
     *
     * @param  a        string
     * @param  b        string
     * @return distance int
     * @access private
     */
    function getEditDistance(a, b) {
        if (a.length === 0) {
            return b.length;
        }
        if (b.length === 0) {
            return a.length;
        }

        var matrix = [];

        // increment along the first column of each row
        var i;
        for (i = 0; i <= b.length; i += 1) {
            matrix[i] = [i];
        }

        // increment each column in the first row
        var j;
        for (j = 0; j <= a.length; j += 1) {
            matrix[0][j] = j;
        }

        // Fill in the rest of the matrix
        for (i = 1; i <= b.length; i += 1) {
            for (j = 1; j <= a.length; j += 1) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                        Math.min(matrix[i][j - 1] + 1,                // insertion
                            matrix[i - 1][j] + 1));                   // deletion
                }
            }
        }

        return matrix[b.length][a.length];
    }

};