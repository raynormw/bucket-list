# API Routing Documentation

## Stores
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/stores | POST | Add new store | Send form-urlencoded with name and lat_long as attribute | Created store |
| /api/stores | GET | Get all store | Just send request | All created store |
| /api/stores/:id | GET | Get specific store | Replace :id with store_id | Specific store |
| /api/stores/:id | DELETE | Delete specific store | Replace :id with store_id  | Success message if deleted |
| /api/stores/:id | PUT | Update specific store | Send form-urlencoded with name and lat_long as attribute |  |

## Stores_Goods
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/stores/:store_id/addgoods | POST | Add new goods in a store | Send form-urlencoded with good_id and price as attribute  | Return created store goods |
| /api/stores/:store_id/getgoods | GET | Get all goods list in a store | Just send request | All goods in a store |
| /api/stores/:store_id/:good_id | DELETE | Delete a goods in a store | Replace :good_id with goods_id and :store_id with store_id | Success messsage if deleted |
| /api/stores/:store_id/:good_id/pricing | PUT | Edit price to specific item on specific store| Send form-urlencoded with price as attribute | Updated price in goods store |

## Search Store (MVP), Development
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/stores/nearbystore | POST | Search nearby store  | Send form-urlencoded with location and items as attribute  | Route to store with calculation |

## Goods
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/goods | POST | Add new good | Send form-urlencoded with name and url_pict as attribute | Return created goods |
| /api/goods | GET | Get all goods | Just send request | All goods created |
| /api/goods/:id | PUT | Update specific good | Send form-urlencoded with name and url_pict as attribute | Return updated goods |
| /api/goods/:id | DELETE | Delete specific good | Replace :id with goods_id | Return succes message if deleted |

## Search Goods (MVP), Development
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/goods/searchgoods | POST | Search goods with query  | Send form-urlencoded with query as attribute  | Route goods matched with query |

## Baskets_Item
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/baskets/additem | POST | Add goods to basket | Send form-urlencoded with basket_id , goods_id and quantity as attribute  | Created basket |
| /api/baskes/getitems/:basket_id | GET | Get all items in a basket | Set params with correct basket_id  | Get all goods in a basket |
| /api/baskets/removeitem | DELETE | Remove item from basket | Send form-urlencoded with basket_id , goods_id as attribute  | Success message  |

## Baskets
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/baskets/createbasket | POST | Create basket | Send form-urlencoded with member_id as attribute  | Created basket |

## Cart_Items
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/carts/:cart_id/addgoods | POST | Add new item to a cart | Send form-urlencoded with good_id and store_id as attribute | Return created cart item |
| /api/carts/:cart_id/removegoods | DELETE | Delete an item to a cart | Send form-urlencoded with good_id and store_id as attribute | Succes message |
| /api/carts/:cart_id/:store_id/:goods_id/quantity | PUT | Edit goods quantity in cart | Send form-urlencoded with quantity attributes  | Return updated cart |

## Carts
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/carts | POST | Add new cart | Post form-urlencoded with member_id as attributes | Created cart |
| /api/carts | GET | Get all carts | Just send request | All cart created |
| /api/carts/:id | GET | Get id specific cart | Specific :id with cart_id  | Specific cart, if not found will return message |
| /api/carts/:user_id | GET | Get user specific cart | Specific :user_id with user_id | Specific cart, if not found will return message |
| /api/carts/:id | DELETE | Delete specific cart | Specific :id with cart_id | If success, will return success message  |

## Members (Tentative)
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/members/signup | POST | Add new user (Sign up) | Post form-urlencoded with name, email and password as attributes  | Created member |
| /api/members/signin | POST | Verify user (Sign in)| Post form-urlencoded with email and password | If correct, return token with member_id value, if nomatch or not found will return message |

## Drivers (Tentative)
