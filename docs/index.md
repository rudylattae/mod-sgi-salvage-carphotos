# Mod SGI Salvage - Car Photos

UX tweaks to the SGI Salvage, bonus JS api is unintended.

## Latest release

Bookmarklet: <a href="javascript:var%20carPhotos%3Dfunction()%7B%22use%20strict%22%3Bfunction%20t(t)%7Bvar%20n%3Dthis%3Bn.init%3Dfunction()%7Bt.attr(%22data-mod-ready%22)%7C%7C(t.find(%22thead%20tr%22).prepend('%3Cth%20class%3D%22header%22%3E%26nbsp%3B%3C%2Fth%3E')%2Ct.find(%22tbody%20tr%22).each(function(t%2Cn)%7Be(n).prepend('%3Ctd%20class%3D%22js-mods%22%3E%3C%2Ftd%3E')%7D)%2Ct.attr(%22data-mod-ready%22%2C!0))%7D%2Cn.install%3Dfunction(i)%7Bt.find(%22tbody%20tr%22).each(function(t%2Ce)%7Bi.install(e%2Cn)%7D)%7D%2Cn.findStockNumberColumn%3Dfunction()%7Bvar%20n%3D0%3Breturn%20t.find(%22thead%20tr%20th%22).each(function(t%2Ci)%7Breturn%22Stock%20Number%22%3D%3Di.innerText%3F(n%3Dt%2C!1)%3Avoid%200%7D)%2Cn%7D%7Dfunction%20n()%7Bvar%20t%2Cn%3Dthis%2Ci%3D%22%2Fimages%2Fsalvage_images%2F%7BstockNumber%7D%2Fmain%2F1.jpg%22%2Cr%3D'%3Cdiv%20class%3D%22mod--thumbnail%22%20target%3D%22_blank%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cimg%20alt%3D%22loading...%22%20src%3D%22%7Bsrc%7D%22%20width%3D%22245%22%2F%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E'%3Bn.install%3Dfunction(n%2Cd)%7Bif(!(e(%22.js-mods%20.mod--thumbnail%22%2Cn).length%3E0))%7B%22undefined%22%3D%3Dtypeof%20t%26%26(t%3Dd.findStockNumberColumn())%3Bvar%20o%3De(%22td%3Aeq(%22%2Bt%2B%22)%22%2Cn).text()%2Cs%3Da(i%2C%7BstockNumber%3Ao%7D)%2Cu%3Da(r%2C%7Bsrc%3As%7D)%3Be(%22.js-mods%22%2Cn).append(u)%7D%7D%2Cn.uninstall%3Dfunction()%7Bthrow%20new%20Error(%22Not%20implemented%22)%7D%7Dfunction%20i()%7Bif(!r)%7Bvar%20i%3De(%22%23bid_items%22).length%3E0%3Fe(%22%23bid_items%22)%3Ae(%22%23bid_results%22)%2Ca%3Dnew%20t(i)%2Cd%3Dnew%20n%3Ba.init()%2Ca.install(d)%2Cr%3D!0%7D%7Dvar%20e%3DjQuery%2Cr%3D!1%2Ca%3Dfunction(t%2Cn)%7Breturn%20t.replace(%2F%7B%20*(%5B%5E%7D%20%5D%2B)%20*%7D%2Fg%2Cfunction(t%2Ci)%7Breturn%20t%3Dn%2Ci.replace(%2F%5B%5E.%5D%2B%2Fg%2Cfunction(n)%7Bt%3Dt%5Bn%5D%7D)%2Ct%7D)%7D%3Breturn%20i()%2C%7BItemsTableModManager%3At%2CItemThumbnailMod%3An%2Cinit%3Ai%7D%7D()%3B">Car Photos | SGI Salvage</a>

To use just drag the link above into your bookmarks toolbar.

Copyright &copy; 2013-2014 Rudy Lattae

