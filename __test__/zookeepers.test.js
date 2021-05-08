const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require ("../lib/zookeepers.js");
const { zookeepers } = require('../data/zookeepers');
const { test } = require("@jest/globals");

jest.mock('fs');

test('Create a zookeeper', () => {
    const zookeeper = createNewZookeeper({
        "id": 'thisIsAnId',
        "name": "Kim"
    }, zookeepers)

    expect(zookeeper.name).toBe('Kim');
    expect(zookeeper.id).toBe('thisIsAnId');
})

test('Filter by query', () => {
    const startingZookeepers = [
        {
          id: "2",
          name: "Raksha",
          age: 31,
          favoriteAnimal: "penguin",
        },
        {
          id: "3",
          name: "Isabella",
          age: 67,
          favoriteAnimal: "bear",
        }
      ];
    const updatedZookeepers = filterByQuery({name : 'Raksha'},startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test('find By Id', () => {
    const startingZookeepers = [
        {
          id: "2",
          name: "Raksha",
          age: 31,
          favoriteAnimal: "penguin",
        },
        {
          id: "3",
          name: "Isabella",
          age: 67,
          favoriteAnimal: "bear",
        }
      ];

      const result = findById("2",startingZookeepers);
      expect(result.name).toBe('Raksha');
})


test('validate Zookeeper', () =>{
    const zooKeeper1 =  {
        id: "2",
        name: "Raksha",
        age: 31,
        favoriteAnimal: "penguin",
      }
    const zooKeeper2 = {
        id: "2",
        age: 31,
        favoriteAnimal: "penguin",
    }
    const result = validateZookeeper(zooKeeper1);
    const result2 = validateZookeeper(zooKeeper2);

    expect(result).toBe(true);
    expect(result2).toBe(false);
})