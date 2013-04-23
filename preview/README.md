# Architecture

## Entity

All objects on the screen are entities

Entities have:

- Sprites

- Collision detection

- Collision methods (to be over-written)

### Hero

- Let's keep the hero's name generic (might change later on)

- Move methods (can be over-written)

- action methods (attacks, interacting with people/objects)

- transform method

### Friend

- Nice NPCs

- They have dialog with the hero

- Can give the hero quests

### Enemy

- Move methods

- Sequence (their A.I.)

#### Boss

- Derives from Enemy

- Can transform like the hero

### Objects (collectibles)

- Things the hero can interact with/pick up

### Terrain

- Pieces of the level that have specific collision patterns

- They can also initiate a level-transition

## Logic

### Inventory

- The player's collection of objects and currency

### Questlog

- Where we store which quests the player has accepted/completed

### Score

- Health and maybe some point-system

- Also the player's "level" (e.g. which shapes/characters has the player unlocked)

### Levels

- Levels have a collection of entities and portals to other levels

### State

- Stores level, score, and inventory
