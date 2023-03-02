(function(){
    if (window.myBookmarklet !== undefined){
        myBookmarklet();
    }
    else {
        document.body.appendChild(document.createElement('script')
            ).src='https://7a17-85-175-20-86.eu.ngrok.io/static/js/bookmarklet.js?r=' +
                Math.floor(Math.random()*99999999999999999999);
    }
})();