class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.airports = [];
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(airport) {
        const keys = [
            airport.name.toLowerCase(),
            airport.city.toLowerCase(),
            airport.country.toLowerCase(),
            airport.iata_code.toLowerCase()
        ];

        for (const key of keys) {
            for (let i = 0; i < key.length; i++) {
                for (let j = i + 1; j <= key.length; j++) {
                    const substring = key.substring(i, j);
                    let node = this.root;
                    for (const char of substring) {
                        if (!node.children[char]) {
                            node.children[char] = new TrieNode();
                        }
                        node = node.children[char];
                    }
                    node.isEndOfWord = true;

                    // Use a Set to avoid duplicate insertions
                    if (!node.airports.some(a => a.iata_code === airport.iata_code)) {
                        node.airports.push(airport);
                    }
                }
            }
        }
    }

    search(prefix) {
        let node = this.root;
        // Normalize input
        prefix = prefix.toLowerCase();

        for (const char of prefix) {
            if (!node.children[char]) {
                // No match found
                return [];
            }
            node = node.children[char];
        }
        return this._collectAirports(node);
    }

    _collectAirports(node) {
        let results = [];

        function dfs(currentNode) {
            if (currentNode.isEndOfWord) {
                results = results.concat(currentNode.airports);
            }
            for (const child in currentNode.children) {
                dfs(currentNode.children[child]);
            }
        }

        dfs(node);
        // limit result count to 5
        return this._getUniqueAirports(results).slice(0, 5);
    }

    _getUniqueAirports(airports) {
        let uniqueAirports = [];
        let airportMap = new Map();

        airports.forEach(airport => {
            if (!airportMap.has(airport.iata_code)) {
                airportMap.set(airport.iata_code, airport);
                uniqueAirports.push(airport);
            }
        });

        return uniqueAirports;
    }
}

module.exports = Trie;
