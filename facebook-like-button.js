(function(doc) {
    var myClass = 'facebook-like-button';
    function addLikeButton($ires) {
        var liSS =  doc.evaluate(
                    ($ires ? "" : "id('ires')/")
                        + "ol/li[contains(@class, 'w0')]",
                    $ires || doc,
                    null,
                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                    null
                ),
        $li,
        aSS,
        $iframe,
        i,
        l;


        for (i=0, l=liSS.snapshotLength; i<l; ++i) {
            $li = liSS.snapshotItem(i);

            if ($li.lastChild.className === myClass) {
                continue;
            }

            aSS = doc.evaluate(
                    "div/span/h3/a",
                    $li,
                    null,
                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                    null
            );
        
            $iframe = doc.createElement('iframe');
            $iframe.className = myClass;
            $iframe.src = [
                'http://www.facebook.com/plugins/like.php?href=%%URL%%'
                    .replace('%%URL%%', encodeURIComponent(aSS.snapshotItem(0).href)),
                'layout=standard',
                'show_faces=true',
                'width=450',
                'action=like',
                'colorscheme=light',
                'height=80'
            ].join('&amp;');
            $iframe.scrolling = 'no';
            $iframe.frameBorder = 0;
            iframeStyle = $iframe.style;
            iframeStyle.border = 'none';
            iframeStyle.overflow = 'hidden';
            iframeStyle.width = '450px';
            iframeStyle.height = '80px';
            
            $li.appendChild($iframe);
        }
    }

    doc.body.addEventListener('AutoPagerize_DOMNodeInserted', function(evt){
        var $ires = evt.target;

        if ($ires.id === 'ires') {
            addLikeButton($ires);
        }
    }, false);

    addLikeButton()

})(document);
