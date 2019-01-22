/**
 * New Post: make sure you can upload an image and that it takes you to that page after
Include a readme.md explaining your test choices. If any tests fail your expectations,
please note them as well.
*/
module.exports = {
  before : function(browser) {
    var path = require("path");
    browser.globals.localImage = path.resolve('./resources/test.png');
    browser.globals.localPage = 'file://' + path.resolve('./resources/test.html').replace(/\\/g, '/');
  },

  'New Post uploads image from Browse button' : function (browser) {
    browser
      .url('http://imgur.com')
      .assert.containsText('.Navbar a.upload', 'New post')
      .click('.Navbar a.upload');
    browser.expect.element('#global-files-button').to.be.an('input');
    // Hack to make file input visible.
    // Mozilla won't work without it, even when moz:webdriverClick is set to false.
    browser.execute(
      "document.getElementById('global-files-button').style.display='block';"
    );
    // SendKeys equivalent needed for OS interaction with file type input
    browser.setValue('input#global-files-button', browser.globals.localImage)
    browser.expect.element('.post-title').to.have.attribute('placeholder').which.contains('Give your post a title');
    browser.expect.element('.post-saving-container').to.be.present;
    browser.end();     
  },

  'New Post uploads image by pasting URL' : function (browser) {
    // Keys behavior is flappy in Chrome.
    // Will not work in Firefox as is due to https://github.com/mozilla/geckodriver/issues/665.
    browser.url(browser.globals.localPage)
      .click('#url-for-copy') 
      .keys([browser.Keys.CONTROL, "a"])
      .keys([browser.Keys.CONTROL, "c"])
    browser.url('http://imgur.com');
    browser.assert.containsText('.Navbar a.upload', 'New post')
      .click('.Navbar a.upload')
      .keys([browser.Keys.CONTROL, "v"]);
    browser.waitForElementPresent('div.post-image', 10000);
    browser.expect.element('.post-title').to.have.attribute('placeholder').which.contains('Give your post a title');
    browser.expect.element('.post-saving-container').to.be.present;
    browser.end();     
  },

  'New Post uploads image by dragging' : 'pending'+ function (browser) {}

};