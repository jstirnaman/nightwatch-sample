/*
 * Search: make sure you can search, and that the results are tied to your query.
*/

module.exports = {
  
    'Search term returns term results when button clicked' : function(browser) {
        browser.url('https://imgur.com')
          .setValue('.Searchbar-form input[type=text]', 'costa')
          .click('.Searchbar-form button')
        browser.expect.element('.search-sentence').text.to.match(/Found.*results for.*costa/);
        browser.expect.element('.search-term-text').text.to.equal('costa');
        browser.end();
    },

    'Search tag returns tag results when tag clicked' : function(browser) {
        browser.url('https://imgur.com')
          .setValue('.Searchbar-form input[type=text]', 'costa')
          .waitForElementVisible('.Suggestion')
          .click('.tags a[title="costa rica"].Suggestion-item');
        browser.expect.element('.Cover-name').text.to.contain('costa');
        browser.end();
    }
}