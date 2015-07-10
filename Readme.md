# Auto-Suggest E-Mail
[![Auto-Suggest E-Mail on Bower](https://img.shields.io/bower/v/auto-suggest-email.svg) ](https://www.npmjs.com/package/bootstrap)

A little handy Javascript tool, that suggests auto-completion to your users, while they
 start typing their e-mail address in a form. It also has a spelling-correct feature.

![Auto-Suggest E-Mail Demo](http://fetten.github.io/auto-suggest-email/assets/img/auto-suggest-email-demo.gif)

## Demo
Checkout the [Demo Page](http://fetten.github.io/auto-suggest-email/) and try it for yourself.

## Usage
Auto-Suggest E-Mail is pure Vanilla-JS and *does not* rely on any third party libraries like jQuery.
To include the Javascript file in your project, you can either

* [Download the latest release](dist/auto-suggest-email.min.js)
* Install with [Bower](http://bower.io): `bower install auto-suggest-email`.

To get the script running, create an instance of it and tell Auto-Suggest E-Mail which input field to watch for inputs.

```html
<script src="auto-suggest-email.min.js"></script>
<script>
    var inputField = document.querySelector('form input#email');
    var ase = new autoSuggestEmail(inputField);
</script>
```
    
### With options

```html
<script src="auto-suggest-email.min.js"></script>
<script>
    var inputField = document.querySelector('form input#email');
    var ase = new autoSuggestEmail(inputField, {
        domains:  ["mail.ru", "gmail.com", "googlemail.com", "hotmail.com", "hotmail.co.uk", "yahoo.com", "yahoo.co.jp"],
        priority: ["mail.ru", "gmail.com", "hotmail.com", "yahoo.co.jp"]
    });
</script>
```

### Options
Auto-Suggest E-Mail comes with the international most commonly used e-mail domains build-in, but you can set your 
own list of domains, of course.


#### domains
Type: `Array`

The domains that will be suggested to the user. Overwrites the default options.

#### priority
Type: `Array`

The domains that will be shown immediately after the user types in the @ sign. These domains should also be included in
the `domains` option. Overwrites the default options.

#### Default Options
These domains are included by default.

```javascript
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
```

## Where should I use it?
I recommend to use Auto-Suggest E-Mail on any input form, where users need to enter their e-mail addresses. This could be:

* Registration forms
* Login forms
* Newsletter registration
* Contact forms

## Browser Support
Auto-Suggest E-Mail works in all modern web browsers, that support HTML5, including:

* IE9+
* Firefox 3.5+
* Opera 9+
* Safari 4+
* Chrome
* iPhone and iPad iOS1+
* Android phone and tablets 2.1+
* Blackberry OS6+
* Windows 7.5+ (new Mango version)

## Copyright and license
Copyright 2015 [Marcel Fetten](http://www.fetten-meier.com). Code released under [the MIT license](License.md).

Auto-Suggest E-Mail is based on the work of 
[Stuart Tayler](http://www.cxpartners.co.uk/cxblog/towards-an-easier-way-to-enter-email-addresses/). Thanks Stuart!

## Release History
* 2015/07/08 - v0.1.0 - Initial release.