/**
 * “Random Mode” function: test that the random button works and takes you to a new
   page without errors.
 */

module.exports = {
    'Random Mode option returns new items without errors when clicked' : function(browser) {
        var galleryTextBefore;
        var galleryTextAfter;

        browser.url('https://imgur.com')
        .getText('.Grid-column', function(result) {
            galleryTextBefore = JSON.stringify(result.value);
        });
        browser.expect.element('.NewCover-change-sort-wrapper .Dropdown.sort').text.to.contain('NEWEST');
        browser.click('.NewCover-change-sort-wrapper .Dropdown.sort')
        .elements('css selector', '.Dropdown-option', function(result) {
            console.log(result.value);
            result.value.forEach(function(element) {
                browser.elementIdText(element['ELEMENT'], function(t) {
                   if(t.value === 'RANDOM') {
                     browser.elementIdClick(element['ELEMENT']);    
                   }
                });
            });
        });
        browser.expect.element('.NewCover-change-sort-wrapper .Dropdown.sort').text.to.contain('RANDOM');
        browser.getText('.Grid-column', function(result) {
          galleryTextAfter = JSON.stringify(result.value);
          this.assert.notEqual(JSON.stringify(galleryTextBefore, galleryTextAfter));
        });
        browser.end();
    }
 }