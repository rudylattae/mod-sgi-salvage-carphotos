var carPhotos = (function() {
    "use strict";

    // imports
    var $ = jQuery;


    // flag if global initialization has been completed
    var ready = false,
        tofu = function(a,c){return a.replace(/{ *([^} ]+) *}/g,function(b,a){b=c;a.replace(/[^.]+/g,function(a){b=b[a]});return b})};


    function StarItemMod( table ) {
        var self = this,
            doc = $(document),
            styles = 
                '<style> \
                    .star { color: #ff9; font-size: 2.2em; float: right; position: relative; top: -180px; margin-right: 0.5em; cursor: pointer;} \
                        .star:hover { color: #ff0; } \
                    .starred-items { margin-bottom: 1em; } \
                    .starred-item { display: inline-block; margin-right: 0.5em; width: 245px; border: 1px solid #ccc; } \
                </style>',
            starredItemTemplate =
                '<div class="starred-item"> \
                    <img alt="loading..." src="{thumbnailUrl}" width="100%"/> \
                    <span class="stock-number">{stockNumber}</span> \
                </div>';

        self.init = function() {
            if ( doc.attr('data-mod-ready') ) return;

            doc.find('head').append(styles);
            doc.find('.main_container').prepend('<div class="js-starred-items starred-items"><h2>Starred Items</h2></div>')

            doc.attr('data-mod-ready', true);
        };


        self.install = function install() {
            table.on('click', '.js-star-item', function() {
                var stockNumber = $(this).attr('data-stock-number'),
                    thumbnailUrl = $(this).attr('data-thumbnail-url'),
                    starredItem = tofu( starredItemTemplate, { thumbnailUrl: thumbnailUrl, stockNumber: stockNumber } );
                doc.find('.js-starred-items').append(starredItem);
            });
        };

        self.uninstall = function uninstall() {
            throw new Error('Not implemented');
        };
    }


    function ItemsTableModManager( table ) {
        var self = this;

        self.init = function init() {
            // setup table for mod
            if ( table.attr('data-mod-ready') ) return;

            table.find('thead tr').prepend('<th class="header">&nbsp;</th>');
            table.find('tbody tr').each(function(i, row) {
                $(row).prepend('<td class="js-mods"></td>'); 
            });

            table.attr('data-mod-ready', true);
        };

        self.install = function install( mod ) {
            table.find('tbody tr').each(function(i, row) {
                mod.install( row, self );
            });
        };

        self.findStockNumberColumn = function findStockNumberColumn() {
            var found = 0;

            table.find('thead tr th').each(function(i, cell) {
                if ( cell.innerText == "Stock Number" ) {
                    found = i;
                    return false;
                }
            });
            return found;
        };
    }


    function ItemThumbnailMod() {
        var self = this,
            mainPhotoUrlTemplate = '/images/salvage_images/{stockNumber}/main/1.jpg',
            itemPhotoTemplate =
                '<div class="mod--thumbnail" target="_blank"> \
                    <img alt="loading..." src="{thumbnailUrl}" width="245"/> \
                    <span class="js-star-item star" data-stock-number="{stockNumber}" \
                        data-thumbnail-url="{thumbnailUrl}" title="Star item #{stockNumber}">&#x02605;</span> \
                </div>',
            stockNumberColumn;

        self.install = function install( row, tableManager ) {
            if ( $('.js-mods .mod--thumbnail', row).length > 0 ) return;

            if ( typeof stockNumberColumn === 'undefined') stockNumberColumn = tableManager.findStockNumberColumn();

            var stockNumber = $('td:eq(' + stockNumberColumn + ')', row).text(),
                thumbnailUrl = tofu( mainPhotoUrlTemplate, {stockNumber: stockNumber} ),
                component = tofu( itemPhotoTemplate, { thumbnailUrl: thumbnailUrl, stockNumber: stockNumber } );

            $('.js-mods', row).append( component ); 
        };

        self.uninstall = function uninstall() {
            throw new Error('Not implemented');
        };
    }


    // perform global initialization
    function init() {
        if ( ready ) return;

        var itemsTable = $('#bid_items').length > 0 ? $('#bid_items') : $('#bid_results'),
            tableManager = new ItemsTableModManager( itemsTable ),
            thumbnailMod = new ItemThumbnailMod(),
            starItemMod = new StarItemMod( itemsTable );

        tableManager.init();
        tableManager.install( thumbnailMod );
        starItemMod.init();
        starItemMod.install();
        ready = true;
    }

    init();

    return { 
        ItemsTableModManager: ItemsTableModManager,
        ItemThumbnailMod: ItemThumbnailMod,
        init: init
    };
})();