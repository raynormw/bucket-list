# API Routing Documentation

## Stores
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/stores | POST | Add new store | null | null |
| /api/stores | GET | Get all store | null | null |
| /api/stores/:id | GET | Get specific store | null | null |
| /api/stores/:id | DELETE | Delete specific store | null | null |
| /api/stores/:id | PUT | Update specific store | null | null |
| /api/stores/:id_store/:id_good/pricing | PUT | Add price to specific item on specific store| null | null |

## Goods
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/goods | POST | Add new good | null | null |
| /api/goods | GET | Get all goods | null | null |
| /api/goods/:id | PUT | Update specific new good | null | null |
| /api/goods/:id | DELETE | Delete specific good | null | null |

## Carts
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/carts | POST | Add new cart | null | null |
| /api/carts | GET | Get all carts | null | null |
| /api/carts/:id | GET | Get specific cart | null | null |
| /api/carts/:id | PUT | Update specific cart | null | null |
| /api/carts/:id | DELETE | Delete specific cart | null | null |

## Members (Tentative)
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/members/signup | POST | Add new user (Sign up) | null | null |
| /api/members/signin | POST | Verify user (Sign in)| null | null |

## Drivers (Tentative)
