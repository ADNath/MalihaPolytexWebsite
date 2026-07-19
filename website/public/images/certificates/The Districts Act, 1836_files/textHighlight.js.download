/*$(function() {
    $(document).on('click','.search-click',function () {
        var search_value1=$('#search-click').val().length;
        alert(search_value1);

        //var splt=url.split(/[\/.]+/);
        // alert(splt[splt.length-2]);
        // alert(splt[1]);
        // alert(splt[2]);

        //var paths = "http://ip:8080"+url;//"file:///E:/LAW/Districts.html";
        //var paths = "file:///E:/LAW/Districts.html";
        //console.log(paths);
        //var paths="http://ip:8080/act-1/section-24127.html";

        if($('#search-click').val().length !== 0){
            $('.searchable').each(function(){
                var search_value = $("#search-click").val();
                var search_regexp = new RegExp(search_value, "g");
                $(this).html($(this).html().replace(search_regexp,"<span class = 'highlight'>"+search_value+"</span>"));
            });
        }


    });
});*/

/*
$(function() {
    // find tags and remove
    // remove empty p tag
    $('p').each(function () {
        var $this = $(this);
        if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
            $this.remove();
    });
    $('br').next().remove();
});*/


/*
$('#search-click').keyup(function () {
    if($('#search-click').val().length !== 0) {
        // store search key on local storage
        localStorage.setItem("search_key", $("#search-click").val());
    }else {
        alert('Please enter a keyword to search.');
        $('#search-click').focus();
    }
})
*/


function highlightSearch() {
    if($('#search-click').val().length !== 0) {
        // store search key on local storage
        localStorage.setItem("search_key", $("#search-click").val());
    }else {
        //alert('Please enter a keyword to search.');
        $('#search-click').focus();
    }
}
$(function () {
    // get search key from local storage
    var search_key = localStorage.getItem("search_key");


    // search each word on content and highlight matching text.
    $('.searchable').each(function(){
        // var search_value = $("#search").val();
        var search_value = localStorage.getItem("search_key");
        var search_regexp = new RegExp(search_value, "g");
        $(this).html($(this).html().replace(search_regexp,"<span class = 'highlight'>"+search_value+"</span>"));
    });
})