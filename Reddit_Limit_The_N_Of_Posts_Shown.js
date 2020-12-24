// ==UserScript==
// @name        Reddit Limit The Nº Of Posts Shown
// @namespace   https://gist.github.com/Dilxe
// @version     1
// @include     https://www.reddit.com/r/*
// @include     https://www.reddit.com/r/*/hot/
// //@exclude     https://www.reddit.com/r/*/*/*/
// @author      Dilxe
// @run-at      document-end
// ==/UserScript==


(function detectUrlChangeTimed()
{
    var currentURL = window.location.pathname;
	
    //Check if it's a post or a subreddit link; if subreddit (has three '/' (shorter url)), use limiter.
    if (window.location.pathname.split("/").length - 1 == 3)
    {
        postsLimiter();
    }
  
    setTimeout(
    function detectUrlChangeClick()
    {
        document.querySelectorAll('.XEkFoehJNxIH9Wlr5Ilzd._2MgAHlPDdKvXiG-Qbz5cbC').forEach(elm=> 
        {
            elm.addEventListener('click', function()
            {
                if (elm.pathname == currentURL)
                {
                    //alert('igual');
                    detectUrlChangeClick();
                }

                else
                {
                    //alert('deferente');
                    detectUrlChangeTimed();
                }
            });
        });
    }, 5000);
})();


function postsLimiter()
{
    setTimeout(scrollToGetPosts, 5000);

    function scrollToGetPosts()
    {
        window.scrollTo(0,document.body.scrollHeight);
        setTimeout(hidePosts, 3000);
    }

    function hidePosts()
    {
        window.scrollTo(0,0);

        //alert(document.getElementsByClassName("rpBJOHq2PR60pnwJlUyP0")[0].childNodes.length)

        var posts = document.getElementsByClassName("rpBJOHq2PR60pnwJlUyP0")[0];
        let children = posts.childNodes;

        for (let i = 25; i < children.length; i++)
        {
            children[i].style.visibility = "hidden";
        }
    }
}
