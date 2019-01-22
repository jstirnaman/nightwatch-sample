# Setup
`yarn install`

# Running Tests
End-to-end tests use NightwatchJS with:
  * Geckodriver for Firefox,
  * Chromedriver for Chrome
The e2e command runs tests only in Firefox by default.
`yarn e2e`
Add the -e flag to specify the browser driver.
`yarn e2e -e chrome`

# Notes about the tests, bugs, etc.
## General
I tried to rely on CSS selectors as much as possible since they are less likely to break due to changes over time and faster than XPath. However, imgur.com rarely applies HTML ID attributes so I was forced to rely on CLASS attributes. 

## post.e2e.js
I attempted to test the file-browse-upload feature and the URL-paste feature. I chose to test both scenarios to see how far I could get with using Nightwatch.

I use an XPath expression to locate and invoke the OS file browser since it is hidden. Enabling the legacy setting moz:webdriverClick did not make the input accessible.
moz:webdriverClick capability is a workaround to unhide file type inputs which are often hidden for design reasons. See https://github.com/mozilla/geckodriver/issues/1173

As noted in the code, the upload by URL paste test is unreliable in Chrome at best and does not work in Firefox. Specifically, the problem is with using keys() to select and copy a value into the OS clipboard that can then be pasted. This is ultimately where I spent most of my time. With time and effort, I could write alternative solutions for each.

I verify the result by checking for the headin and the input containing the new post URL.

## search.e2e.js
I tested two search scenarios: 1) submitting text by clicking the spy glass button and 2) matching and clicking a pre-defined hashtag. I just assert that the expected term is present in the results view heading.

## random.e2e.js
I tested one scenario, that clicking "Random" in the righthand sort menu would return different results. To verify the results, I compare the concatenated text nodes within the gallery before and after selecting "Random".