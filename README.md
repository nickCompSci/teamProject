# Dual Ascent: Tower of Cards
## 1. The Premise
The tower stood tall and proud, its ebony stone walls weathered by wind and rain. It was a silent sentinel watching over the land below, the cities sprawling at its foundation like vines spreading through the undergrowth. The citizens within didn't know who built or why, it had been there since their birth, was there for their father and his father before them. It would most certainly be there after them as well.

Despite its age, the tower remained steadfast and unyielding, its secrets locked away behind thick stone doors and high walls. Locals whispered tales of ancient magic and the eerie cries and crunches that rang out within its walls. 

During its first sighting, the legend was that the world pitted itself against the foreign entity. After all, it just appeared out of nowhere. Factions with weaponry beyond compare to the current age stormed the tower. However despite the advanced technology, the tower stood tall. The same could not be said for the invaders. 

The tower produced creatures of horror, an abomination of twisted metal and flesh. Rumours had it that these creatures used to be separate from their cybernetic parts aeons ago and roamed the land outside the tower. Now, they are doomed to remain inside the tower, locked up inside as an amalgamation. Perhaps this was the tower's way of repaying the attack, the very entities that attacked the tower are now its denizens.

Over the ages, the tower transformed from a forbidden land to a land of opportunity. Adventurers flocked towards the tower after one had culled one of the denizens and from it, dropped a card. These cards offer a way to fight back, to relive the days before. In doing so, it also offers these same adventurers to become legends.

Now, two adventurers set out to explore the tower, determined to uncover its secrets that it has withheld for aeons. Unbeknownst to them, they were not the first to try and ascend the tower. And they will not be the last.

## 2. The Aim of the Game
Dual Ascent: Tower of Cards is a multiplayer, turn-based card game where two players compete in a race to the top of the tower, collecting cards along the way. At the top, they battle each other to claim the throne and become the victor.

Upon connecting to another player and initiating a game, both players are transported to the map screen shown below in figure 1.1:

![[images/map_screen.png]]
Figure 2.1 - The map screen of the game

On the map screen, the player's goal is to reach the left-most room with the arrow to ascend to the next floor of the tower. Each player starts on floor 1 with the goal being to defeat the boss enemy at the end of floor 3 which rewards them with the most powerful card and ascend to floor 4 which triggers the final player vs. player battle. On each floor, there are 12 rooms, each of which (excluding the start and end rooms) holds an encounter for the player to engage with and earn cards from to build their deck of cards. Cards received as rewards become more powerful as the player ascends the tower, thus the player needs to balance racing the other player to reach the top first and claim the most powerful card with building their deck along the way to have more cards at their disposal.

The ? or random encounter leads to either a chest or battle screen randomly. Both screens are described in greater detail below.

The battle encounter, denoted by the two cards icon, takes players to the battle screen as pictured below in figure 1.2 where the goal is to defeat the Non-Player Character (NPC) enemies by depleting their health to 0 using the cards in their deck. Winning a battle will reward the player with a choice of two cards which become more powerful as the tower is ascended. Enemies also become more powerful as the tower is ascended so the better rewards are matched with a greater level of challenge! If instead a *player's* health is to reach 0, the player loses randomising the map floor they are on again and starting them at the beginning of the floor.

![[battle_screen.png]]
Figure 2.2 - The battle screen of the game

The chest screen pictured in figure 1.3 below is denoted by a chest icon on the map and upon entering it, the player is rewarded with 1-3 random cards of any rarity. Each floor only has 1 chest encounter and these encounters serve as a valuable way for the player to increase their deck's power for not much time.

![[chest_screen.png]]
Figure 2.3 - The chest screen of the game

The shop screen pictured below in figure 1.4 allows the player to trade 2 cards of a lower rarity in their current deck for 1 card of a higher rarity. To purchase a blue rarity card, the player must sacrifice 2 white rarity cards, while to purchase a purple rarity card, the player must sacrifice 2 blue rarity cards. Each floor also only has 1 shop encounter with these serving as a risk-reward way to increase the power of the player's deck while sacrificing the over-all amount of cards in their deck.

![[shop_screen.png]]
Figure 2.4 - The shop screen of the game

Upon defeating the boss in the last room of floor 3 and obtaining the most powerful card in the game, the player ascends to the top of the tower and pulls the other player up to them to initiate a battle between both players pictured below in figure 1.5. The flow of this final battle is much the same as a regular battle encounter, with each player taking turns to play cards to whittle the opponent's health to 0. Upon completion of this ultimate goal, when 1 player's health reaches 0, the game concludes with the final player standing as the victor and claiming the throne of the tower!

![[finalbattle_screen.png]]
Figure 2.5 - The final battle screen of the game

## 3. Game Mechanics & Technical Game Information
### 3.1 The Map
The implementation of the map makes use of the following 5 components:
- Map Scene (Phaser Class)
- Map Class
- Door Class
- Room Class
- Shuffle Class

The Map Scene implements the Classes and deals with the actual flow of the player traversing the map and the transitioning between the Map Scene and the Scenes for each of the encounters. Most logic is dealt with in these other classes outside of the scene. The scene is what implements all event listeners and handles the display of the information to the player.

The Map Scene handles images/sprites, sound and interactivity

#### 3.1.1 Map Randomisation
When the Map Scene is first called it initializes an instance of the Map class which handles and stores all information dealing with player location, rooms/encounters and doors. 

When the map is first initialized it creates:

- 11 instances of the Door Class.
- 12 instances of the Room Class. 

It also randomly assigns the locations of the encounters through the use of the Shuffle Class. The Shuffle Class is used for most of the randomisation needed.  It randomly shuffles a list of items that are passed to it. Finally it calls a function that returns rooms which are currently adjacent to the player. This function is explained in detail later, as an explanation of the other classes are necessary to understand how the function operates.

The Door Class handles the randomisation of their respective positions. Each door contains a list of between 1 and 3 positions depending on the door. These positions also contain values pertaining to rooms that are adjacent on either side of that particular door position.

The Room Class contains an encounter and logs whether or not that encounter has been yet completed. It also randomly generates enemies and rewards. Both the enemies and rewards that are generated scale with the ascension of the tower's floors becoming more challenging and powerful respectively.

The setAdjacent function iterates through the list of doors and checks the player location against values of the rooms that are adjacent to the doors and then adds these adjacent rooms to list if they match.  This list of values is then used while iterating through the list of rooms and the rooms that match these are added to a list of adjacent rooms. This function is called every time the player location is updated.

The Map Class has another function that re-randomises all door and encounter/rooms in a sense resetting the object.

The Map Scene uses and implements all of this functionality.

#### 3.1.2 Encounters
The Map Scene generates 4 type of encounters: the battle encounter, the chest encounter, the random encounter and the vendor encounter pictured below isolated in figure 2.1 and embedded in the map scene in figure 2.2.

![[encounters.png]]
Figure 3.1 - the encounter icons when not embedded in the map

![[map_screen.png]]
Figure 3.2 - The map scene with encounters on it

The random encounter, denoted by the ? icon, has a 50% chance of either leading to a battle or to a chest.

The Extra Scene deals with all of the encounter types that aren't the Battle Scene.
This includes implementation for the following:
- Chest Scene
- Vendor Scene

The Chest Scene, denoted by the chest icon, rewards the player with between 1-3 cards randomly with 1 and 3 being the least common. 
It also randomly chooses cards to reward the player with.  The less rare the card is the more common it is.
- White rarity - 65%
- Blue rarity - 25%
- Purple rarity - 10%

This also is implemented with the use of the Shuffle function.

The Vendor Scene, denoted by the dollar icon, allows the player to purchase either a blue or purple rarity card by trading to cards of a lower rarity.
- Blue rarity cards cost two white rarity cards
- Purple rarity cards cost two blue rarity cards

To facilitate these Scenes a deck of all cards in the game is loaded.  The player deck is also passed in to allow for the necessary additions and subtractions of cards from their deck.

One of the main functions of this scene is the function getRarityCards which is passed a rarity type and either the players deck or the deck containing all cards and returns all cards of that rarity from the specified deck. This is used to display the necessary cards for when the player is choosing what card they would either like to trade or purchase. The cards displayed here are made scrollable through the use of a camera function.

The Battle Scene, denoted by the 2 cards icon, will be discussed later on in greater detail but this is where the player will fight Non Player Characters (NPCs) and can gain cards as rewards for beating these enemies.

#### 3.1.3 Scene Transitions
A huge part of the game coming together and working as a cohesive system and not a disconnected set of scenes was integrating the game scenes together. This mattered most when it came to the map and the encounters. The primary scene of the game is the map. The map is kept persistent when other scenes are launched and the map holds all data that is passed into the other scenes to be dynamically created. As mentioned above, the map generates enemies and rewards for use in the battle scene but it also creates and persists the player object and keeps the data available to be transferred into all other scenes. The map scene also holds the data pertaining to the level the player is in the tower which directly impacts the rewards and enemies generated.

When a player clicks on the icon of an encounter that is in an adjacent room on the map, the map scene is paused and data necessary to that scene is passed in. For instance, in the battle scene, the player object, the network object, the list of enemies and the list of rewards are all passed in and are used by that scene in its dynamic creation. As Phaser allows game objects to only apply to one scene, this means that upon launching of the new scene from the map, all game objects must be recreated to apply to the newly launched scene, essentially needing to be reconstructed for use in a new scene. This, however, is balanced out by the fact that upon stopping of the scene and resumption the map scene, Phaser will also clean-up all objects of the stopped scene; this is why the map scene is paused when exiting it but new scenes are stopped when exiting them allowing for the freeing up of memory and storage to improve game performance.

#### 3.1.4 Ascending the Tower
Ascending the floors in the tower is achieved by clicking on the red arrow in the left-most room of each floor of the tower. Clicking this arrow, re-randomises the map, increments your current map level (pictured up the top left-hand corner on the map scene in figure 3.2) and also sends your new current map level to the other player (with the other player's map level displayed up the top right-hand corner on the map scene as shown in figure 3.2). Ascending a floor in the tower also increases the player's max-health by 10 and fully heals their health back to its max value; this is done to stream-line the game so the player dying is the fault of the player and not through the fault of an inability to heal sufficiently between tower floors.

The player begins on floor 1 of the tower with the final floor being floor 3. On floor 3, the final room is given the encounter of an NPC "boss" enemy to fight. Clicking the red arrow in the final room of floor 3 after defeating the "boss enemy" leads into the final player versus player battle which is described later in this game manual.

### 3.2 The Battle
#### 3.2.1 Cards
Traditionally in turn based battle games, there are limited options for the player during their turn. They can usually only do a basic attack, defend, use magic or an item from their inventory. We've decided to replace this formula with cards that serve as the main gameplay for the player during the battle scene. 

Before going into the options that the cards bring, we need to go into further depth on the components present on every card. Based on the image below, every card has 4 primary components:
- **Effect** - Denoted by the text in the middle of the card
- **Cost** - Denoted by the text in the top left number in the yellow hexagon
- **Rarity** - Denoted by the color of the diamond in the middle. There are 4 rarities in descending order.
	- Overloaded (Orange)
	- High Caliber (Purple)
	- Loaded (Blue)
	- Shell (White)
- **Category** - Denoted by the color of the strip in the middle

![[card_components.png]]
Figure 3.3 - The main components of every card

To delve further into the category matter, there are currently 4 categories that each card can belong to. The category of a card is simply an umbrella term for a collection of cards with a similar effect. The names of them can explain the card's effect intuitively and they can fall into 4 categories, seen in Figure 3.4:
- **Damage
- **Healing 
- **Reload**
- **Combo**

Damage cards's effects can target a single enemy, all enemies or can hit x times against a randomly chosen enemy each time. The reload category serves as the only way for players to recover their action points, enabling them to play other cards. The combo cards are activated specifically to boost other card's effect such as doubling a card's amount of damage. Lastly, healing cards recover the player's health or make them gain armour which serves as an additional health pool for the player while also providing damage reduction. 

![[categories.png]]
Figure 3.4 - All card categories

Furthermore, the majority of the cards have additional effects that can greatly help the player such as drawing additional card(s) or hinder the player by sacrificing their health or discarding random card(s). These extra effects add to the potential complexity of the game, allowing players to synergise their cards together while not sacrificing the simplistic nature of the mechanics. 

There are 30 cards available to the player during the game which expands greatly on the traditional battle formula of turn based battle games. It also adds replayability to the game due to the player unlikely being able to collect all teh cards. The options available to the player are enhanced while keeping an intuitive nature of activating them through a simple **drag and drop** in the battle scene.
Overall these cards achieved their goal of harmonising simplicity and complexity for the player during battle and allow the player to strive for certain cards or combos during their runs. 

#### 3.2.2 Player and Enemy Statistics
Each player and enemy holds numerous bits of information that pertain to them. These bits of information, for this section described as character statistics or "stats" for short, are used in the battle scene to allow its function. Players have these following stats:
- Max Health
- Health (Displayed as the red bar with a number in figure 3.3)
- Max Armour
- Armour
- Max Action Points (AP)
- Action Points
- Card Deck
- Discard Pile
- Card Hand

##### Max Health
Max health is a number ascribed to the player object and describes the maximum a player's health can be. If a player's health would be pushed over this value, it is instead set to this value thus limiting player health. It is also used in the creation of the healthbar pictured in figure 3.3 as the calculation to show the health accurately uses max health to calculate the percentage of pixels to show on the healthbar.

##### Health
Health is the player's vitality and must be kept above 0 or else the player dies. The player's health is displayed in battle as a red healthbar pictured below in figure 3.3. The healthbar shows the value of the player's health along with the visual indication from the healthbar as to their percentage of health. 

![[healthbar.png]]
Figure 3.5 - Health as displayed in battle

##### Max Armour
Max armour much like max health, is a number ascribed to the player object and describes the maximum a player's armour can be. If a player's armour would be pushed over this value, it is instead set to this value thus limiting player armour. It is also used in the creation of the armourbar which overlays the healthbar pictured in figure 3.4 as the calculation to show the armour accurately uses max armour to calculate the percentage of pixels to show on the healthbar.

##### Armour
The armour value of a player is an extra health value the player can have above their max health. Armour is not persisted between like battles like health is and comes with a damage reducing effect, lowering the damage a player takes when attacked. Armour is displayed on the armourbar which is overlayed on top of the health bar. pictured in figure 3.4 The armourbar shows the value of the player's armour along with the visual indication from the armourbar as to their percentage of armour.

![[healthbar_with_armour.png]]
Figure 3.6 - Health with armour as displayed in battle

##### Max Action Points (AP)
Max AP is the value which limits the amount of AP a player can have at any one time. This value is set in the player object and is never increased except for certain card effects. The value of this is a constant 6 AP and whenever a battle begins, the player's starting AP will be set to this value, starting them with full AP for each battle.

##### Action Points (AP)
AP is the running value of AP a player has at the moment. This value is affected by the cost of cards and is displayed as a different sprite for each amount of AP as pictured below in figure 3.6. From left to right in figure 3.6, shows all AP values with the first image denoting any value above 6 and the next 7 sprites showing 6 AP - 0 AP from left to right. AP is one of the most important resources for a player in a battle as it limits the cards they can play each turn. AP is regained through the use of reload cards.

![[actionPointsSprites.png]]
Figure 3.7 - Player Action Points (AP) Sprites 

##### Card Deck
The card deck i holds a list of all cards in the player's deck. In battle, cards are removed from this and put into the discard pile and hand when necessary but in the map, the deck always holds all cards. When a battle starts, all cards are in the card deck until the initial 5 card are drawn. The card deck is located at the bottom left of figure 3.7 below and a number displays the amount of cards in the card deck at current.

##### Card Discard Pile
The card discard pile holds a working list of all cards that the player has discarded and thus are not in the player's deck. The discard pile is located at the bottom left of figure 3.7 below and a number displays the amount of cards in the discard pile at current. The discard pile can also be viewed as a separate scene as described later in section 3.2.4 Quality of Life.

##### Card Hand
The card hand is displayed as the cards in the card tray (which uses this [public domain image](https://opengameart.org/content/2048-stylized-tileable-metal-panel) created by user "txturs" on opengameart.org) pictured in figure 3.7 and holds a list of all cards currently in the player's hand and thus the cards that are usable by the player on their turn. The card hand always has 5 cards at the start of every turn and any unused/unkept cards at the end of the turn are discarded from the card hand and are redrawn up to a maximum of 5 cards at the end of the turn. The card hand can have more cards than 5 through the use of card effects but a number of cards above 7 is very unlikely. Cards are also discarded from the hand when used after the card's effect has been carried out. As a result of holding the cards, the card hand stat is directly responsible for what actions a player is able to perform on their given turn.

![[battle_screen.png]]
Figure 3.8 - Player and Enemy statistics shown in the battle scene.

The enemy NPCs also share max armour, max health, armour and health statistics but do not utilise cards or AP. Enemies as a result have statistics that correspond to the damage ranges that they use to calculate the amount of damage they will do on their turn. As a result, every enemy has a minimum damage and a maximum damage that they can achieve on any one turn. The enemy also holds information about the level it currently on as the enemy's damage also adds 2x(current map level) in the damage calculation.

The damage calculation of enemies is shown below ((Math.floor(Math.random() * (this.maxDamage - this.minDamage + 1)) + this.minDamage) here is the way in which you get a value in given range in javascript with the level + 1 added to the randomly acquired value.
```
((Math.floor(Math.random() * (this.maxDamage - this.minDamage + 1)) + this.minDamage) + (this.level + 1));
```


#### 3.2.3 Battle Flow
The flow of any given battle is given by the below list of steps:
1. The player's turn starts
2. The player draws cards into their hand until they have 5 cards
3. The player plays cards, discarding them from their hand and using AP denoted by the card cost in the process
4. The player clicks keep cards to select up to 1 card they would like to have carry into their next turn
5. The player discards all remaining cards in their hand
6. The player's turn ends
7. The enemy's turn starts
8. The enemy combatants perform their own actions (attacking for NPC enemies and using cards as in step 2 for the other player in the final battle scene)
9. The enemy's turn ends

The above cycle is repeated constantly in the battle scene and describes how a battle progresses. This flow of steps is very important and deliberate giving the player different performable actions such as drawing cards, using cards, keeping cards and discarding cards at the appropriate stages in the cycle.

#### 3.2.4 Quality of Life 
The battle scene's flow has been designed in such a manner that several quality of life (qol) features are embedded into the scene, allowing for several important features and functionality to be done automatically for the player.

Firstly, the keeping of cards functionality for the player allows the player to retain a single card in their hand for the next turn. The player after clicking the button can click a card in their hand to keep, tinting it to indicate to the player that they've made their selection, as you can see below. If the player makes a mistake, they can re-click it to choose another card.  Furthermore to confirm their choice, the user has to click the end turn button. This allows the player to remember that this option of retention is available to them every time they want to end their turn due to having to trigger this functionality first. This prevents the player from forgetting or accidental mistakes.

![[keep_cards.png]]
Figure 3.9 - A player keeping a card

Secondly, the discarding and drawing of cards is completely automatic. The cards in the hand that are not kept by the player at the end of turn are automatically moved into the discard pile. Additionally the player will then continue to draw cards until they have reached 5 in the their hand when their turn begins. This keeps the battle flow smooth where the player only has to worry about their next move rather than non-gameplay related features such as drawing and discarding. This autonomous nature also extends to cards that force the player to discard or draw cards too.

When cards are in the discard pile, they are viewable through clicking the discard pile sprite (right picture). This gives an insight to the player to the cards that they've currently played and what is left in their deck. Tying in with drawing and discarding, the deck also resets itself automatically; all the cards from the  discard pile are moved back into the deck, shuffled and the player resumes drawing seamlessly. This adds to the seamless nature of functionality running automatically for the players.

![[deck_and_discard.png]]
Figure 3.10 - Deck and discard pile icons

![[discard_pile.png]]
Figure 3.11 - The discard pile scene

Lastly, tints have been added as visual indicators to tell the player of certain effects. For example, cards in hand automatically tint themselves **red** in Figure 3.13 when the player doesn't have sufficient action points to play them. As well as that, a **green** tint is visible in the drop zone for the card, blue tint in Figure 3.12 for cards that have been used with combo cards and gray tint for keeping.

![[combo.png]]
Figure 3.12 - Blue combo card tint

![[unplayable_cards.png]]
Figure 3.13 - Prevention of card activation shown as a red tint

#### 3.2.5 Winning and Losing
The player's objective in a battle is to deplete all enemy health values to 0, in turn killing the enemies, clearing the battle encounter and receiving a reward. The opposite can happen however where a player's health is depleted fully and the player dies and receives a punishment instead.

Victory in battle is achieved when all enemy health values are depleted completely. After this occurs, the rewards for the battle will appear on the screen with the player getting an option of one of the two cards. These rewards as described in section 3.1.1 Map Randomisation are randomly generated with each encounter and scale to be more powerful as the player ascends the tower. An example of a choice between two rewards is captured in figure 3.8 below

![[rewards.png]]
Figure 3.14 - The choice of rewards a player gets after a battle

Dying in battle when the player's health is depleted completely leads to a death screen as shown in figure 3.9 below. The punishment for death is to reset the player back to the start of the current floor they are on with a new randomisation. This slows the player down and is an apt punishment for dying while trying to race to the top of the tower.

![[player_death.png]]
Figure 3.15 - The death message a player receives upon losing a battle

### 3.3 Player Versus Player Duel
The Player vs Player (PVP) duel was the last scene to be finished and also a collaborative effort between the two sub teams to completely flesh it out from an ideal scenario to a realistic ending. Members from the network team and design team came together to work on this scene together as it involved both teams' work heavily. This PVP battle allows for the players to interact for the final time, and represents the culmination of their efforts up to this point. The game ends after this battle, with the survivor winning the game.

#### 3.3.1 Networking
The PVP scene is comprised of a typical battle scene, with the opponent as the enemy. To achieve this, specific event listeners are set up in the network. When a turn is taken, the player sends the card they are playing to their opponent. This information is received and is parsed by the opponent, who calculates the damage/health effects locally. This reduces the amount of data needed to be sent across our network. The opponent is also notified when the current player's turn is over, at which point it displays that it is now their turn, and it allows them to play cards as normal. 

#### 3.3.2 Gameplay
After the boss fight, the player can start the last scene. When initiated, the other player is forced into this battle, stopping whatever they're doing and teleported into the scene. To make it fair, both players are put to full health with a value of 80 but the player who arrived at the top is still at an advantage due to having more cards from rewards.

This battle is unique due to the delay in player's ending turns. The final battle scene when it is the current player's turn is pictured below in figure 3.10. Players have to wait for one another to play cards, their turns being completely different from the rest of the enemies in the tower. During the enemy player's turn, the other player cannot interact with any of their cards. As well as that, they can see cards that are being played as it is displayed largely on their screen.

In terms of transmitting the card's effect, only the bare minimum of data is transferred over to the other player in order to recreate the effect. For example, damage cards transfer over the amount of damage as well as the image,damage calculations are applied on the other's player own player,  **running locally** on the other player's system. The same is for healing cards where the health and armour are applied for the enemy locally as well. For the rest of the cards, only the image is transferred.

![[finalbattle_screen.png]]
Figure 3.16 - The final battle scene between two players

## 4. Networking and Non-Gameplay Features
### 4.1 Menus and Features
One of the main aspects that the design team focused on during the development phase was the main menu. The main menu serves as the central hub for players for navigating through the different features of our game. The menu consists of four main components:

- The *Play Game* component allows users to create a game or connect to an existing one
- The *Profile* component allows user to view their player profile and also contains the *Friends* component
- The *Options* component provides a setting which allows the player to turn on or off the soundtrack
- The *Credits* component provides information about the developers and contributors who worked on the game

The below image shows the current implementation of the main menu:

![[MainMenu.png]]
Figure 4.1 - Main menu of the game

#### 4.1.1 Play Game
The play game feature is a central component of our application that both allows players to create games or connect to existing ones. The play game feature consists of two main functionalities: create game and join game. 

#### 4.1.2 Create Game
When a user clicks on create game, they essentially create an empty game lobby where other players can have a chance to connect. A player has two options to connect to a lobby:

- They can connect through the friends page by clicking on a friend who is currently tagged as waiting in lobby.
- Or they can enter the Join Game code that is sent to them by the host.

The join game code is generated using the function below, which will be explained in more detail:

```js
if (this.host == true) {  
    this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.40, `Host: ${this.playerUsername}`, { fontFamily: 'font1', fill: '#ffffff', fontSize: '40px' })  
        .setDepth(1)  
        .setOrigin(0.5)  
    let joinCode = this.network.peer.id;  
    addJoinCodeToUserNode(joinCode, addJoinCodeToUserNodeCallback);  
}
```

The function first checks to see if the user is the host of the game. If they are the host, it then creates a text object which displays the players username on the screen.

The code then generates a unique join code by using the ID of the peer that is hosting the game session. This unique ID is the hash of the host's username and the time they logged into their account. The join code is then passed to the addJoinCodeToUserNode function, which sends a request to the server route to update the user's join code relationship. The addJoinCodeToUserNode function then establishes a connection to the MongoDB database, where it executes a write query to create a unique JOIN_CODE relationship between the current user and all of their friends in the database using the provided join code:

```js
const writeQuery = `  
    MATCH (a:Person {username: $currentUsername})-[r:JOIN_CODE]->(n:Person)  
    DELETE r`;
```

Thus setting up the ability to connect to the players lobby. 

![[CreateGame.png]]
Figure 4.2 - Create game page where a player can create a game

#### 4.1.3 Join Game
The join game feature is a key component that allows users the alternative to enter a join code and join an existing game session. When a user chooses to join a game, they will be prompted to enter the join code provided by the host of the game session.

![[JoinGame.png]]
Figure 4.3 - Join game page where a player can enter a code to join a game

When the user clicks join game, a function is called which sends an AJAX POST request to the server with the join code entered by the user. The server does several checks to see if the code is valid and that the lobby is still not full. If the code is valid and all previous checks are complete, the user is connected to the hosts lobby:

```js
thisScene.network.connect(code.value);  
thisScene.scene.start(CST.SCENES.LOBBY, { networkObj: thisScene.network, playerUsername: thisScene.playerUsername, joinee: "joinee", playerToJoin: otherUsername });
```

#### 4.1.4 Lobby Scene
Once two players have connected to the lobby scene, the host can then go ahead and start the game when they are ready. Once the start game button is clicked, the game session in initiated and the map scene is launched. The game session is held between both players throughout the game. 

![[Lobby.png]]
Figure 4.4 - Lobby page where both players wait before starting the game

In the event of the host leaving the game, a detectingJoineeLeaveInterval variable is set to setInterval to repeatedly check if the other player has left. Inside the interval, an AJAX POST request is sent to the '/checkIfHostLeft' endpoint with the host's and other player's usernames as data. If the result of the request indicates that the host has left

```js
(result.hostLeft == "true")
```

the interval is cleared, and a temporary alert is displayed to inform the player that the other player has left and they will be sent back to the main menu. This ensures that the game session is ended gracefully if either player leaves unexpectedly.

#### 4.1.5 Profile 
The profile page provides the user to view information about themselves in the game. Users can see their avatar and username on the page, as well as pre-generated facts about their character. They can also access their friends page from here.

![[Profile.png]]
Figure 4.5 - Profile page used for displaying information about the player

If there was more time to develop this feature, a section could be added to show the number of enemies defeated or the number of games won. This would provide more detailed statistics about the user's performance in the game.

### 4.2.Network Architecture
We identified a peer-to-peer network model to be most suitable for our game, as it maximises possible concurrent games, and is not as dependent on a central game server. The potential of lag caused by a user having slow upload speeds wouldn't be an issue for our game as it is turn-based and doesn't require high latency. The slight reduction in security is also negligible due to the lack of sensitive data in our game, as well as the scale. 

However, we would still need this central server to serve the game to the player, as well as handling account creation and log-in, and to implement the friends features. We researched different options and elected to use [PeerJS](https://www.peerjs.com). PeerJS is an open-source Javascript framework that wraps browsers' WebRTC implementation. It handles NAT configuration by dealing with STUN/TURN and signalling servers, leaving its user with a simple API to set up peer-to-peer networks. PeerJS provides a "peer server" - a signalling server for peer-to-peer networks - which is free to use and runs well. If the game were to be released in a professional capacity we would need our own signalling server. This is only used for negotiating the initial connection, and resetting or closing it when needed, so would not affect the scalability of this approach

![How WebRTC works](webrtc_overview.png)
Figure 4.6 - Overview of the WebRTC process.

With this API, we were able to create player nodes and connect them, and send and receive data. We used event listeners to handle receiving specific data events such as a card played in the final battle, or exceptional events like a network interruption, and called the corresponding game logic required.

| Network/Data Event | Corresponding Function |
| ------------- | -------------- |
| Player starts up game | Network peer is establish and ID is assigned |
| Player joins Host | Update host to display joined user's username |
| Host starts game | Both players begin game |
| Player moves up a level | Opponent's screen displays this level |
| Player begins final battle | Opponent is brought to final battle scene |
| Player plays card | Opponent displays this card being played |
| Player ends turn | Opponent is prompted to take their turn |
| Player disconnects | Opponent is informed of this and returned to menu |

We created network ID's for players by hashing some of their info (username and time logged in). We stored this id and corresponding username in our MongoDB. This was a reliable way of creating unique ID's, so that there would be no risk of clashes causing network issues.

We had some issues when developing the network side, primarily when the server provided by PeerJS for NAT functionality (STUN and TURN) was down. We overcame this by running local peer servers during this period, which was reasonably simple using the peer npm package.  We also tried to use the player's username alone to set their network ID, but this caused issues when they reloaded the game and tried to reconnect with an already taken ID. This issue is why we also incorporated the time in forming their ID. 

### 4.3 Environment
#### 4.3.1 Node.js
Dual Ascent is built in a **Node.js** server using **Express**. **Node.js** is used to develop the server-side web applications. It provides an **efficient** and **scalable** platform for building web applications which can handle a huge number of **concurrent connections** which is critical because Dual Ascent is a multiplayer game. The use of real-time applications that need **low latency** and **high throughput** for multiplayer games like Dual Ascent is one of Node.js's **key strengths**. Node.js also provided us a rich set of modules and libraries which can be smoothly incorporated into the game as **dependencies**. For example, the command ```npm --save install mongoose``` can effortlessly add a MongoDB connector/schema module as a **dependency** for Node.js which, among many others, we used.

#### 4.3.2 Express
**Express** is a popular web framework for Node.js that provided us a easy-to-learn and robust mechanism for defining **routes** for the application. It acts as a middleware and serves a user **static** files such as HTML and CSS. It was used to define ubiquitous routes consisting of the **HTTP** methods **GET** and **POST** for each unique route. Express also has seamless database integration including **MongoDB** and **Neo4j**, both of which are used in Dual Ascent. 

##### Routes
**Routes** in Express define the **paths** on how various HTTP requests in different parts of Dual Ascent respond to client requests. Our server requires a way of understanding how to handle a certain request made by the player. For example, what does the server do when a player calls the ```/logout``` route? This is the **role** of routes provided by Express. They come in the form of ```router.post("/logout", (request, response) => {}``` with all the logic **inside** the _curly braces_ being applied when a user calls that particular route. The full route could then look like ```localhost:3000/logout```. Since we have many routes it made sense for us to **bundle** all these routes into a single file and use it as an Express **Router**, which can manage a variety of unique routes.

Each route typically contains a **request** as a part of its parameters which is the HTTP request. How do these routes **interpret** the HTTP request? This was resolved via the use of the ```body-parser``` middleware package for node. This allowed us to parse an incoming HTTP request and extract the required data from the request and process the data.

### 4.4 Databases
### 4.4.1 MongoDB
**MongoDB Atlas** is a cloud-based database service that administers a fully managed **MongoDB** database-as-a-service (DaaS) platform for **NO-SQL** databases. This allowed Dual Ascent to deploy a MongoDB database in the cloud with ease without worrying about the underlying _infrastructure_ and _maintenance_. No-SQL databases gave us a more **flexible** and **scalable** solution for managing large and diverse data sets **not** requiring a **fixed schema**. MongoDB was used for **storing accounts** for players in Dual Ascent at the registration page.

#### 4.4.2 Neo4j
**Neo4j Aura** is also a a cloud-based database-as-a-service  platform. It enabled us as developers to create an **extensible** and **high-performance graph** database. We chose a Neo4j graph database as it provides a more **natural** and **competent** method to model and query **complex** and highly **connected** data. This is possible due to a graph databases use of **nodes** and **relationships** which can be up to  "1000x Faster Than Relational Databases" when it comes to data queries that have a **high degree**. An example of this would be querying a lot of relationships between users rather than multiple _join_ statements in **traditional** databases. In regards to Dual Ascent, Neo4j was used for creating relationships between players such as ```FRIENDS_WITH``` and ```IN_LOBBY_WITH```.

![Neo4j graph image for Dual Ascent](neo4j.png)
Figure 4.7 - Neo4j graph image from Dual Ascent with multiple relationships

### 4.5 Account System
#### 4.5.1 Registration
User registration is an important aspect of Dual Ascent and since it is at the most granular level, a [route](#routes), it leverages Express. It allows the game to have an account system for storing details about a player and lends the ability further down the line to join other players that they may be friends with.  For example the [route](#routes): ```route.post("/registration")``` will send a HTTP **POST** request to the Node.js server. This will **validate** the users credentials to see if they conform to standards using a node module called ```mongoose```. Mongoose grants us the ability to define a **schema** with regulations on the registration form data fields, for example: ```email : {unique : true}```, which means no **duplicate** emails may register.

Upon successful validation, the [route](#routes) will create an entry in our [MongoDB](#mongodb) database using the _pre-defined_ model mentioned above with the necessary fields including **hashing** a players password using the ```bcrypt``` module to match today's security standards. Furthermore the registration route will open up a connection to our [Neo4j](#neo4j) cloud instance to create the newly registered player as a **node** with some default **properties**.

#### 4.5.2 Login
Once a user has an account registered, they will be able to login with their credentials. The [route](#routes): ```/login``` will **sanitize** and **validate** a user by verifying the presence of the user's email and validating their password. However the login also contains other vital components. 

Upon a successful login, a **JSON web token** (JWT) with the users email and id as a **payload** will be created. This is achieved by the ```jsonwebtoken``` node module. The JWT is then inserted as part of a **cookie** simultaneously with a refresh JWT, these will expire after _five minutes_ and _one day_ respectively. These are also stored on the server **locally** to be used in validation. In conjunction JWT's yield a very simple but vital method of **authenticating** a user while they are logged in. A ```/token``` route is called that will **decode** a user's JWT and **compare** its payload with the locally stored version. If a change is detected or they **fail** to match, that user is labelled **unauthorized** and sent to the login menu. This acts as a **security** mechanism and will also **never** allow someone who does not have a _valid_ JWT cookie from accessing the game.

To **logout**, a player will have a logout button in the **options scene** in the main menu in Dual Ascent. The 
[route](#routes): ```/logout``` double checks if the users cookies and JWT are **valid** and not fraudulently tampered with. A Successful check **deletes** the cookie from the user and the locally stored version in the server.

#### 4.5.3 Friends Feature
Using the **profile** scene, a player can access the **friends** scene. Neo4j is a graph database that is used by this functionality. Here, gamers can look up **other** players' usernames and send friend requests to them. The friends feature is made possible by the efficient storage and retrieval of complicated relationships between players made possible by the Neo4j graph database. When someone searches for a username, a route is invoked to build a cipher query (Neo4j query syntax) and determine whether the requested username exists. The user can then decide whether or not they want to send the request or input the username again if the first one is invalid.

An area to the player's right of the friends scene allows them to view both their **current friends** and any pending **friend requests** in separate tabs. Depending on their **current** behavior, friends might either be **"waiting in lobby,"** **"in game,"** or **"offline"** on a person's friends list. When a player is waiting in lobby, other players can use the join game icon on their friends list to join that lobby. This is accomplished by establishing a ```JOIN CODE``` relationship between each player's friends in the lobby. Similar to this, if a player's Neo4j node's ```inGame``` attribute is set to ```true```, we know they are actively playing a game. All of these are taken into consideration while **loading** a user's friends list, and the server will process them all before returning the results to Javascript. After that, we created **HTML list** components in various colors and added players in accordance with the aforementioned areas. [Font Awesome](https://fontawesome.com/) icons were used for these list components. They offer the user a number of options, including the ability to **accept** or **reject** friend requests as well as **delete** or **join** friends. All icons include helpful **tooltips** to provide more _clarification_, and they all have click **alerts** to **confirm** that you meant to click that specific icon.

Moreover, a helpful **refresh button** can be found underneath the friends list. Depending on which tab is selected, you may use this icon to **reload** either the friend list or the list of open requests for a player.

![The friends scene](friends.png)
Figure 4.8 - Friends scene

### 5. Assets, Music and Technologies 
#### 5.1 Asset Creation
The  assets used in the battle scene was designed by members of the design team. We quickly decided on a gun/bullet theme for the game and realised that custom assets were necessary. This was due to the lack of suitable thematic sprites available online and it also allowed us to get creative with sprites to match the narrative of the game. All card assets were done on [Figma](https://www.figma.com) and the sprites were made using [PixilArt](https://www.pixilart.com/) and [Krita](https://krita.org/en/). 

You can see the initial process of the card design from inception to finalisation in Figure 5.1 (left to right).  It was a process of the entire design team agreeing on a suitable card design that would visually pleasing while being intuitive to understand. The initial concept had a lot of text for the card to explain but due to the resolution of the game and constraints of the card's size, it was found that the card was hard to understand for new players. However, we kept some concepts of it such as the rarity colour and cost of the card and moved onto the next design; Less words and using the font of the game to tie everything in. This once again proved difficult to read and the aesthetics of the cards was in a debatable situation. To utilise the best of both worlds, we decided that a clear font was best while also using clear indicators such as colors to relay information to the player (category colour strip, rarity diamond colour etc) and ended up with the finalised version. It provides clear information to the player at a small size while being aesthetically pleasing. Using this design, there are now 30 distinct cards available in game, as seen in Figure 5.2.

![[cards.png]]
Figure 5.1 - Progression of card creation

![[all_cards.png]]
Figure 5.2 - All cards in game

In Figure 5.3, for the player sprites themselves, the narrative of the players ascending up the tower being mirror images of each other was the main driving theme behind the visuals besides the main gun theme. The player sprites themselves are simply mirror images of each other with their colours being reversed. As well as that, the deck and discard pile sprite are also mirrors of each other to indicate the opposite functionality of them. The action points indicator for the player is a bullet that hollows out as the player consumes them to play cards.

For the enemies, due to the time crunch, it was essential that the enemies weren't too complicated to extend, hence the idea of animals bearing weapons. To further the narrative of a gun themed ascension, you can see some animal sprites being fused with their weaponry such as the snake and scorpion; perhaps a cruel misfortune of being inside the tower. 

![[all_sprites.png]]
Figure 5.3 - All sprites used in battle scene

With the boss, we made use of the mirror images of the player to design the boss for the penultimate fight. The minigun card was already made so it was a simple matter of the boss being the amalgamation of the two players fused with the minigun, similar to how the animals in the tower were affected.

![[Boss.png]]
Figure 5.4 - The boss enemy sprite

Lastly, the ending screen in Figure 5.5 after the final fight between the players was the knot to try and tie everything together, inspiring the creation of the Fuse card, the throne after the boss fight and the throne afterwards - a result of the fuse card activating to merge everything into one and resetting the tower for the next ascendants.

![[ending.png]]
Figure 5.5 - The ending assets

#### 5.2 Music Creation
5 different themes were created for the games soundtrack:

- Main Menu Theme
- Battle Theme
- Boss Theme
- Map Theme
- Vendor/Chest Theme 

They were created with the use of FL Studio.

![Fl project](Flproject.png)
Figure 5.6 - The main project for the battle theme

Figure 5.6 above showcases the main project view of the Battle Theme. You can see the different key rolls of each instrument laid out as they take place in the song. Note the different instruments are labeled accordingly.

![Fl keys](Flkeys.png)
Figure 5.7 - The midi key roll of a loop for the synthesizer

In figure 5.7 above, you can see the midi key roll of a loop for the synthesizer shown. You can see where each note is played and can edit them if need be.  
For example: 
- change the length of time the note rings out.
- where exactly the note hits
- add/remove notes
- edit the velocity of the note

These instruments can also be played by using the keyboard of a computer or laptop like a midi keyboard. (Z key on computer maps to C on piano ect.)

![Fl mixer](Flmixer.png)
Figure 5.8 - The FL Studio Mixer

In figure 5.8, you can see the sound mixer. This allows you to change the mix of the project, allowing:
- raising and lowering of the volumes of instruments 
- adding of effects 
- panning of instruments
- balancing of audio to achieve the desired sound

#### 5.3 Technologies Used
Apart from tools and technologies used that have been mentioned in above sections when appropriate, two other technologies were used in the creation of the game these being: the  [Phaser](https://phaser.io/) game framework for javascript and the [DALL-E](https://www.dall-e2ai.com/) AI image generator.

Phaser was used as the framework which supported every aspect of the frontend of the game specifically allowing us to work with Phaser defined game objects, sprites, scenes, data control and object management. It was pivitol in the completion of our game picking up some of the slack of how javascript works allowing us to focus on game logic and connecting two players.

DALL-E's use was minor but still worth noting that images were created in DALL-E which serve as the background for battles both against NPCs and against the other players. These background images were then pixelated to fit better with the game's aesthetic and embedded into Phaser to load them as the background within battle scenes. 

## 6. Division of Work and Reflections
To divide the work of making this game between team members in a more even and streamlined fashion, the workload was divided amongst two sub-groups in the team: the networking group and the game design group. The networking group focused on the networking and menu features of the game while the game design group focused on the game mechanics, asset creation and game design. Each group helds its own meetings, had its own set of tasks and goals and worked semi-autonomously from the other. This is not to say, however, that the groups were wholly disconnected, through the use of [Trello](https://blog.trello.com/what-is-trello-used-for), our project management software of choice, and through weekly, full-team meetings, both groups continued to communicate with each other, sharing tasks, progress and obstacles with each other. This allowed each group to have a deeper understanding of the tasks and goals which they were focusing on while still having a good overview and understanding of the other half of the project.

### 6.1 Project Management with Trello
As mentioned above, Trello was our team's project management software of choice and served as our main resource for sharing information and keeping track of tasks asynchronously. Pictured below in figure 6.1 is a snapshot of our trello board towards the end of the project and shows the columns of cards we used to track everything for the project. Each card corresponds to a task with each task allowing different bits of information such as checklists, attatchments, comments and member assignment.

![[trello.png]]
Figure 6.1 - The trello board towards the end of the project

### 6.2 Reflections
As a group, our main reflections upon this project are on two aspects of our working together. These two aspects are communication and goal-setting. We had already learned as individuals the importance of communication through other group work settings but agree that this time around, we learned the importance of the efficacy of the communication and not just that you are communicating at all. At times, communicating the abstract ideas made manifest as game features was incredibly difficult and led to many differing interpretations and desires. Our communication then, required robustness which allowed us to unify and clarify our ideas and make progress at the quick pace required for this project. The second aspect of our group work that demands reflection is our goal setting. We made the plan for our project a priority at the beginning of the project and yet, through set-backs, vague task setting and sheer ambition, our plans had to change to suit the progress we were making and also to fit the evolving ideas we had as the project progressed. We feel from this experience, we have learned that goal setting is important but the way in which those goals are achieved are just as if not more important and that is valuable experience to walk away from a group project with.

### 6.3 Credits
| Name | Contribution |
| ------------- | -------------- |
| Jack O'Meara | Backend - Networking |
| James Kirkby | Designed and implemented the main menu, and the base create and join game features |
| Nicholas Shapovalov | Designed the login and registration logic and design, Implemented the Node.js, Express and database infrastructure, Designed the friends scene and logic, and improved user experience for main menu buttons with sounds and visual effects, implemented the join game logic |
| Eoin Schuch | Soundtrack Design, chest + vendor and map scene randomisation and implementation, some sprites and backgrounds for these scenes |
| Kevin Jones Saleh | Main editor of documentation, battle scene and map integration, battle HUD layout, enemy and reward randomisation, battle calculations and player and enemy object design and implementation   |
| Zhi Jie Chen | Main designer of sprites for battle scene, designer of cards, logic behind cards and events, online hosting, code modularisation, main battle scene methods, battle scene sound effects, logo and profile scene designer | 
