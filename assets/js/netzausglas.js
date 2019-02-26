// console.log fallback
if (typeof console === 'undefined') {
  window.console = {
    log: function() {}
  };
}

// jquery main events
$(document).ready(function() {
    
    // fieldsets filetype/website search should be hidden by start, included via bootstrap studio export by now
    
    // EVENTS
    
    // Search input field is changed - user types something
    // 2DO: use bindWithDelay or something else in production for keyup events https://stackoverflow.com/questions/1909441/how-to-delay-the-keyup-handler-until-the-user-stops-typing 
    $('#search-input').on('propertychange keyup input cut paste', function(){
        console.log('search input change event');
        
        // show fieldsets
        $("#fieldset-filetype-search").show();
        $("#fieldset-website-search").show();
        
        // create the search queries and urls
        changeAllSearchLinks();
    }); // eo search input event
    
    $("#file-type-checkboxes input").change(function(){
        changeAllSearchLinks(); // 2DO: only change fileType search link, inefficent right now
    })
    
    // File types checboxes are selected/deselected
    
    // beware - quick & dirty ;-)
    // just one function now, can be more effective later
    var changeAllSearchLinks = function(){
        
        var searchInputValue = $('#search-input').val();
        
        // FILE TYPE SEARCH
        
        // change the google link for file type search procedure:
        
        // check which checboxes for file types are selected
        var fileTypeSearchQuery = searchInputValue;
        $.each($('#file-type-checkboxes input:checked'), function() {
            var checkboxValue = $(this).val();
            console.log('checkbox value',checkboxValue);
            // append
            fileTypeSearchQuery += ' '+ 'filetype:'+checkboxValue+' OR';
            console.log('update filetypesearch query',fileTypeSearchQuery)
        }); // eo check which checkboxes
        
        var fileTypeSearchUrl = 'https://www.google.de/search?as_q='+ encodeURI(fileTypeSearchQuery);
        
        // replace link
         var fileTypeSearchLinkElement = $("#file-type-search-link");

        console.log('new file type search link',fileTypeSearchUrl);
         fileTypeSearchLinkElement.attr('href',fileTypeSearchUrl);
        // EO FILE TYPE SEARCH
        
        // WEBSITE SEARCH
        
        // replace all links based on search-input
        // works with data-attributes: <a href="#" data-search-operator="facebook.com"><span>  Facebook</span></a>
        
          $.each($('#website-search-list a'), function() {
              
              var searchOperator = $(this).data('search-operator');
              console.log('replacing link for search operator',searchOperator,$(this));
              
              var websiteSearchQuery = searchInputValue + ' ' + 'site:'+searchOperator;
              console.log('new query for item generated',websiteSearchQuery);
              
              var newSearchUrlForListItem = 'https://www.google.de/search?as_q='+ encodeURI(websiteSearchQuery);
              console.log('new url generated for item', newSearchUrlForListItem);
              $(this).attr('href',newSearchUrlForListItem);
              
          }); // eo each
            
        
    } // eo changeAllSearchLinks
    


// Automatic testing - edit out later
// $("#search-input").val('Jürgen Handke').trigger('keyup');

    
}); // eo jquery