use admin
db.createUser(
  {
    user: "m ",
    pwd: "password",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)


mongo --port 27017 -u "user" -p "password" \ --authenticationDatabase "admin"

db.Products.insert()
db.Products.insert([
    { "name": "Magic Missile", "description": "The Magic Missile is a magic weapon that has a chance to be found in the Dungeon's locked Gold Chests. It can also be found in the Golden Lock Boxes found in Dungeon Crates. It fires a projectile that can be controlled by holding the ⚒ Use / Attack button and moving the cursor. If the ⚒ Use / Attack button is released mid-drag, the missile will be flung in that direction. If the cursor is stationary on release, it continues along the angle formed from the player. The projectile also emits a good deal of light.", "price": "200", "category": "Controlled" },
    { "name": "Amethyst Staff", "description": "The Amethyst Staff is a phenomenal starting magic weapon given its low mana cost, high damage, and simple crafting recipe. It shoots a single bolt. It has slow speed and low knockback, but with your starting base Mana of 20, this can be used to devastating effect during your first few nights, especially if you get a good Modifier.", "price": "150", "category": "Direct" },
    { "name": "Vilethorn", "description": "The Vilethorn is a magic weapon that extends a 15 tile-long spear-like projection from the player's position. It extends through blocks, piercing multiple enemies, and scores a rapid succession of up to 7 hits per enemy. Its total effect lasts roughly 1.5 seconds. It is one of the possible drops from destroying a Shadow Orb in the Corruption, but it can also be obtained from Corrupt Crates, which are caught from fishing in the Corruption.", "price": "200", "category": "Area Effect" },
    { "name": "Crimson Rod", "description": "The Crimson Rod is a magic weapon that launches a reddish rain cloud towards the cursor, where it rains blood droplets downward onto enemies below. The cloud projectile does not pass through terrain, instead stopping if it hits a surface before it reaches its target location. As well, its coverage area is rather narrow, making it difficult to use in open areas or against agile foes. The droplets pass through all enemies, and the droplets fall for around 20 blocks or until they hit a solid object. Thus, it can be used to great effect against larger foes and clustered enemies, if you can lure them into the rainfall and attack them with another weapon while they are still taking rain damage.", "price": "200", "category": "Area effect" },
    { "name": "Bee Gun", "description": "The Bee Gun is a magic weapon that fires 1-4 homing bee projectiles that can ricochet up to three times before dissipating, and homes in on enemies within close enough range and latches on to them, dealing constant damage. Despite having a base damage of only 9, the Bee Gun can easily overwhelm enemies if the right gear is used. The bees shot from this weapon do not deal any knockback. It has a 33% chance to be dropped by Queen Bee.", "price": "3000", "category": "Homing" },
    { "name": "Flamelash", "description": "The Flamelash is a magic weapon that launches a controllable ball of fire, similar to the Magic Missile, which also emits light and produces sparks that fall through blocks. When the attack button is released, the ball keeps its course until it hits something. The ball can be controlled for up to one minute before dissipating. The Flamelash is obtained from Shadow Chests in The Underworld.", "price": "250", "category": "Controlled" }
])

db.Products.insert([
    { "name": "Amethyst Staff", "description": "The Amethyst Staff is a phenomenal starting magic weapon given its low mana cost, high damage, and simple crafting recipe. It shoots a single bolt. It has slow speed and low knockback, but with your starting base Mana of 20, this can be used to devastating effect during your first few nights, especially if you get a good Modifier.", "price": "150", "category": "Direct" },
])


FUNCIONA
mutation {
    editProduct(
        _id: "5cadfc935595ee5adf0f35c2", name: "$asdsdafs", description: "fdfdf", price: "135", category: "fasdff"
    ) {
        _id
        name
        category
        description
        price
    }
}

FUNCIONA
query {
    product(_id: "5cadc8eb788ec233ba030061") {
        _id
        name
        category
        description
        price
    }
}

db.Products.findOneAndUpdate({ _id: ObjectId("5cadd7baa46bd618843c307f") }, { $set: { name: "sdafs", description: "fdfdf", price: "135", category: "fasdff" } })