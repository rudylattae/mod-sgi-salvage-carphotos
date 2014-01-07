var carPhotos = (function( $ ) {
    "use strict";


    // flag if global initialization has been completed
    var ready = false,
        tofu = function(a,c){return a.replace(/{ *([^} ]+) *}/g,function(b,a){b=c;a.replace(/[^.]+/g,function(a){b=b[a]});return b})};


    function ItemsTableModManager( el ) {
        var self = this;

        self.init = function init() {
            // setup table for mod
            if ( el.attr('data-mod-ready') ) return;

            el.find('thead tr').prepend('<th class="header">&nbsp;</th>');
            el.find('tbody tr').each(function(i, row) {
                $(row).prepend('<td class="js-mods"></td>'); 
            });

            el.attr('data-mod-ready', true);
        };

        self.install = function install( mod ) {
            el.find('tbody tr').each(function(i, row) {
                mod.install( row );
            });
        };

        self.findStockNumberColumn = function findStockNumberColumn() {
            var found = 0;

            el.find('thead tr th').each(function(i, cell) {
                if ( cell.innerText == "Stock Number" ) {
                    found = i;
                    return false;
                }
            });
            return found;
        };
    }


    function ItemThumbnailMod( stockNumberColumn ) {
        var self = this,
            mainPhotoUrlTemplate = '/images/salvage_images/{stockNumber}/main/1.jpg',
            itemPhotoTemplate = 
                '<div class="mod--thumbnail" target="_blank"> \
                    <img alt="loading..." src="{src}" width="245"/> \
                </div>';

        self.install = function install( row ) {
            if ( $('.js-mods .mod--thumbnail', row).length > 0 ) return;

            var stockNumber = $('td:eq(' + stockNumberColumn + ')', row).text(),
                thumbUrl = tofu( mainPhotoUrlTemplate, {stockNumber: stockNumber} ),
                component = tofu( itemPhotoTemplate, { src: thumbUrl } );

            $('.js-mods', row).append( component ); 
        };

        self.uninstall = function uninstall() {
            throw new Error('Not implemented');
        };
    }


    // perform global initialization
    function init() {
        if ( ready ) return;

        var itemsTableElement = $('#bid_items').length > 0 ? $('#bid_items') : $('#bid_results'),
            manager = new ItemsTableModManager( itemsTableElement ),
            stockNumberColumn = manager.findStockNumberColumn()
            thumbnailMod = new ItemThumbnailMod( stockNumberColumn ); 

        manager.init();
        // manager.install( thumbnailMod );
        ready = true;
    }

    return { 
        ItemsTableModManager: ItemsTableModManager,
        ItemThumbnailMod: ItemThumbnailMod,
        init: init
    };
})( jQuery );