import axios from "axios";

// GET - Retrieve data
axios.get('/api/players')  
// Used for: 
// - Fetching data
// - Reading resources
// - No body in request
// Example: Getting a list of players

// POST - Create new data
axios.post('/api/players', { name: 'LeBron James' })  
// Used for:
// - Creating new resources
// - Submitting data
// - Has body in request
// Example: Adding a new player

// PUT - Update/Replace data
axios.put('/api/players/1', { name: 'LeBron James', team: 'Lakers' })  
// Used for:
// - Updating existing resources (complete replacement)
// - Has body in request
// Example: Updating all player info

// PATCH - Partial Update
axios.patch('/api/players/1', { team: 'Lakers' })  
// Used for:
// - Partial updates to resources
// - Has body in request
// Example: Updating just one field of player info

// DELETE - Remove data
axios.delete('/api/players/1')  
// Used for:
// - Removing resources
// - Usually no body in request
// Example: Deleting a player