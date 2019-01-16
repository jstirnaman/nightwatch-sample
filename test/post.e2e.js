/**
 * New Post: make sure you can upload an image and that it takes you to that page after
 * Search: make sure you can search, and that the results are tied to your query
 * “Random Mode” function: test that the random button works and takes you to a new
page without errors.
Include a readme.md explaining your test choices. If any tests fail your expectations,
please note them as well.
**/
module.exports = {
  before : function(browser) {
    var path = require("path");
    browser.globals.localImage = path.resolve('./resources/test.png');
    browser.globals.localPage = path.resolve('./resources/test.html');
  },

  'New Post uploads image from Browse button' : function (browser) {
    browser
      .url('http://imgur.com')
      .assert.containsText('.Navbar a.upload', 'New post')
      .click('.Navbar a.upload')
    browser.expect.element('#global-files-button').to.be.an('input')
    browser.useXpath()
    // Hack to make file input visible.
    // Mozilla won't work without it, even when moz:webdriverClick is set to false.
      .execute(
      "document.getElementById('global-files-button').style.display='block';"
    )
    // SendKeys equivalent needed for OS interaction with file type input
    // For Remote, use setFileDetector instead.
    browser.setValue('//input[@id="global-files-button"]', browser.globals.localImage)
      .useCss();
    browser.expect.element('.post-title').to.have.attribute('placeholder').which.contains('Give your post a title')
    browser.expect.element('.post-saving-container').to.be.present;
    browser.end();     
  },

  'New Post uploads image by URL' : function (browser) {
    browser.url(browser.globals.localPage)
      .click('#url-for-copy') 
      .keys([browser.Keys.CONTROL, "a"])
      .keys([browser.Keys.CONTROL, "c"])
      .pause(3000)
      .url('http://imgur.com')
      .assert.containsText('.Navbar a.upload', 'New post')
      .click('.Navbar a.upload')
      .click('#paste-url-input')
      .keys([browser.Keys.CONTROL, "v"])
      .pause(3000)
    browser.expect.element('div.post-image').to.be.present;
    browser.expect.element('.post-title').to.have.attribute('placeholder').which.contains('Give your post a title');
    browser.expect.element('.post-saving-container').to.be.present
    browser.end();     
  },

  'New Post uploads image by dragging' : 'pending'+ function (browser) {}

};