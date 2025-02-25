const fs = require('fs');
const path = require('path');
const Trie = require('./trie');

// Create a new instance of the Trie data structure
const trie = new Trie();
// Define the file path to the airports data file
const dataPath = path.join(__dirname, '../data/airports.json');

/**
 * load airport data from the JSON file and insert it into the Trie
 */
function loadAirports() {
    try {
        // Read the contents of the airports data file
        const rawData = fs.readFileSync(dataPath);

        // Parse the JSON data from the file
        const airports = JSON.parse(rawData);

        // Iterate over each airport in the data
        airports.forEach((airport) => {
            // Insert the airport data into the Trie
            trie.insert({
                name: airport.name,
                city: airport.city,
                country: airport.country,
                iata_code: airport.iata_code,
            });
        });
    } catch (error) {
        // Log any errors that occur during the loading process
        console.error('Error loading airports:', error);
    }
}

loadAirports();

module.exports = trie;