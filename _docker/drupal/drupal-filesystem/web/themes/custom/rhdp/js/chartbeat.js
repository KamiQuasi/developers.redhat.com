(function () {
    /** CONFIGURATION START **/
    var _sf_async_config = window._sf_async_config = (window._sf_async_config || {});
    var taxonomy_topics = document.querySelectorAll('meta[name="rhd:taxonomy-topic"]');
    var taxonomy_topics_array = Array.prototype.slice.call(tax_topics).reduce(function(a,c) { return a + c.getAttribute('content')+','}, []).split(',')
    var topics = tax_topics.length > 0 ? 
    var authors = drupalSettings && drupalSettings.sections ? drupalSettings.sections : '';
    var sections = drupalSettings && drupalSettings.authors ? drupalSettings.authors : '';

    _sf_async_config.uid = 65972;
    _sf_async_config.domain = 'developers.redhat.com';
    _sf_async_config.useCanonical = true;
    _sf_async_config.useCanonicalDomain = true;
    _sf_async_config.sections = sections;  //CHANGE THIS TO YOUR SECTION NAME(s)
    _sf_async_config.authors = authors;    //CHANGE THIS TO YOUR AUTHOR NAME(s)
    /** CONFIGURATION END **/
    function loadChartbeat() {
        var e = document.createElement('script');
        var n = document.getElementsByTagName('script')[0];
        e.type = 'text/javascript';
        e.async = true;
        e.src = '//static.chartbeat.com/js/chartbeat.js';
        n.parentNode.insertBefore(e, n);
    }
    loadChartbeat();
})();