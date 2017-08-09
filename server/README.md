# API Routing Documentation

## Stores
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/stores | POST | Add new store | null | null |
| /api/stores | GET | Get all store | null | null |
| /api/stores/:id | GET | Get specific store | null | null |
| /api/stores/:id | DELETE | Delete specific store | null | null |
| /api/stores/:id | PUT | Update specific store | null | null |

## Stores_Goods
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/stores/:store_id/addgoods | POST | Add new goods in a store | null | null |
| /api/stores/:store_id | GET | Get all goods list in a store | null | null |
| /api/stores/:store_id/:good_id | DELETE | Delete a goods in a store | null | null |
| /api/stores/:store_id/:good_id/pricing | PUT | Edit price to specific item on specific store| null | null |

## Goods
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/goods | POST | Add new good | null | null |
| /api/goods | GET | Get all goods | null | null |
| /api/goods/:id | PUT | Update specific good | null | null |
| /api/goods/:id | DELETE | Delete specific good | null | null |

## Cart_Items
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/carts/:cart_id/addgoods | POST | Add new item to a cart | null | null |
| /api/carts/:cart_id/removegoods | DELETE | Delete an item to a cart | null | null |
| /api/carts/:cart_id/:store_id/:goods_id/quantity | PUT | Edit goods quantity in cart | null | null |

## Carts
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/carts | POST | Add new cart | null | null |
| /api/carts | GET | Get all carts | null | null |
| /api/carts/:id | GET | Get id specific cart | null | null |
| /api/carts/:user_id | GET | Get user specific cart | null | null |
| /api/carts/:id | DELETE | Delete specific cart | null | null |

## Members (Tentative)
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/members/signup | POST | Add new user (Sign up) | null | null |
| /api/members/signin | POST | Verify user (Sign in)| null | null |

## Drivers (Tentative)
