var carPhotos = (function() {
    "use strict";

    // imports
    var $ = jQuery,
        tofu = function(a,c){return a.replace(/{ *([^} ]+) *}/g,function(b,a){b=c;a.replace(/[^.]+/g,function(a){b=b[a]});return b})},
        nsls =function(e){"use strict";function t(e,t){return e+"-"+t}function r(r,n){if(!r||""===r)throw new Error("You must provide a non-empty namespace");n=n||{};var o=n.storageAdapter||e.localStorage,m={setItem:function(e,n){o.setItem(t(r,e),n)},getItem:function(e){return o.getItem(t(r,e))},removeItem:function(e){o.removeItem(t(r,e))}};return m.set=m.setItem,m.get=m.getItem,m.remove=m.removeItem,m}return r}(window);


    var ready = false,                  // flag if global initialization has been completed
        ls = nsls('mod-sgi-cars');      // namespaced localStorage wrapper
        
    
    var db = {
        _items: [],

        init: function() {
            if (this._items.length === 0) {
                var data = JSON.parse( ls.get('items') );
                this._items = data || [];
            }
        },

        all: function() {
            return this._items;
        },

        add: function ( item ){
            this._items.unshift( item );
            ls.set('items', JSON.stringify( this._items ));
        },

        has: function( item ) {
            var i = 0,
                z = this._items.length;
            for (; i < z; i++) {
                if (this._items[i].stockNumber == item.stockNumber) 
                    return true;
            }
            return false;
        }
    };
    db.init();


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
                    <a href="{detailsUrl}" target="_blank"><img alt="loading..." src="{thumbnailUrl}" width="100%"/></a> \
                    <span class="stock-number">{stockNumber}</span> \
                </div>';

        self.init = function() {
            if ( doc.attr('data-mod-ready') ) return;

            doc.find('head').append(styles);
            doc.find('.main_container').prepend('<div class="js-starred-items starred-items"><h2>Starred Items</h2></div>')

            doc.attr('data-mod-ready', true);
        };


        self.install = function install() {
            var all = db.all(),
                i = 0,
                z = all.length;

            for(; i < z; i++) {
                self.showStarredItem( all[i], { append: true } );
            }

            table.on('click', '.js-star-item', function() {
                var item = {
                        'stockNumber': $(this).attr('data-stock-number'),
                        'thumbnailUrl':$(this).attr('data-thumbnail-url'),
                        'detailsUrl':$(this).attr('data-details-url')
                    };

                if ( !db.has(item) ) {
                    db.add( item );
                    self.showStarredItem( item );    
                }
            });
        };

        self.showStarredItem = function install( item, options ) {
            if (!item) return;
            var starredItem = tofu( starredItemTemplate, item );
            if (options && options.append)
                doc.find('.js-starred-items').append(starredItem);
            else
                doc.find('.js-starred-items').prepend(starredItem);
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
                if ( cell.textContent == "Stock Number" ) {
                    found = i;
                    return false;
                }
            });
            return found;
        };

        self.findStoreNameColumn = function findStoreNameColumn() {
            var found = 0;

            table.find('thead tr th').each(function(i, cell) {
                if ( cell.textContent == "Branch" ) {
                    found = i;
                    return false;
                }
            });
            return found;
        };
    }


    function ItemThumbnailMod() {
        var self = this,
            detailsTemplate = '/lcgi/salvage_bid_site/comp_details.cgi?stock_num={stockNumber}&store={storeName}',
            mainPhotoUrlTemplate = '/images/salvage_images/{stockNumber}/main/1.jpg',
            itemPhotoTemplate =
                '<div class="mod--thumbnail" target="_blank"> \
                    <a href="{detailsUrl}" target="_blank"><img alt="loading..." src="{thumbnailUrl}" width="245"/></a> \
                    <span class="js-star-item star" data-stock-number="{stockNumber}" data-details-url="{detailsUrl}" \
                        data-thumbnail-url="{thumbnailUrl}" title="Star item #{stockNumber}">&#x02605;</span> \
                </div>',
            stockNumberColumn,
            storeNameColumn;

        self.install = function install( row, tableManager ) {
            if ( $('.js-mods .mod--thumbnail', row).length > 0 ) return;

            if ( typeof stockNumberColumn === 'undefined') stockNumberColumn = tableManager.findStockNumberColumn();
            if ( typeof storeNameColumn === 'undefined') storeNameColumn = tableManager.findStoreNameColumn();

            var stockNumber = $('td:eq(' + stockNumberColumn + ')', row).text(),
                storeName = $('td:eq(' + storeNameColumn + ')', row).text(),
                detailsUrl = tofu( detailsTemplate, {stockNumber: stockNumber, storeName: storeName} ),
                thumbnailUrl = tofu( mainPhotoUrlTemplate, {stockNumber: stockNumber} ),
                component = tofu( itemPhotoTemplate, { thumbnailUrl: thumbnailUrl, stockNumber: stockNumber, detailsUrl: detailsUrl } );

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