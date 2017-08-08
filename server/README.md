# API Routing Documentation

## Stores
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/stores | POST | Add new store | null | null |
| /api/stores | GET | Get all store | null | null |
| /api/stores/:id | GET | Get specific store | null | null |
| /api/stores/:id | DELETE | Delete specific store | null | null |
| /api/stores/:id | PUT | Update specific store | null | null |

## Goods
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/goods | POST | Add new good | null | null |
| /api/goods | GET | Get all goods | null | null |
| /api/goods/:id | PUT | Update specific new good | null | null |
| /api/goods/:id | DELETE | Delete specific good | null | null |
| /api/goods/:id/buy | PUT | Decrease quantity number by one | null | null |
| /api/goods/:id/restock | PUT | Increase quantity number by request | null | null |

## Comparison (or goods list)
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/carts | POST | Add new goods list | null | null|
| /api/carts | GET | Get all goods list | null | null|
| /api/carts/:session_id | GET | Get all good list to compare in one session | null | null|
| /api/carts/:session_id | DELETE | Delete all good list in one session | null | null|

Session id using Firebase Auth or Chance (?)

## Carts
| Routes | Methods | Purpose |Usages | Returns |
| :--- | :---: | :--- |:--- | :---|
| /api/carts | POST | Add new cart | null | null |
| /api/carts | GET | Get all carts | null | null |
| /api/carts/:id | GET | Get specific cart | null | null |
| /api/carts/:id | PUT | Update specific cart | null | null |
| /api/carts/:id | DELETE | Delete specific cart | null | null |

## Users (Tentative)
## Drivers (Tentative)
