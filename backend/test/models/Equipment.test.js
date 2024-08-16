const Equipment = require('../../models/Equipment');

describe('Equipment Model', () => {
  it('should save a valid equipment item', async () => {
    const equipment = new Equipment({ name: 'Projector', serialNumber: '12345' });
    await equipment.save();
    expect(equipment.name).toEqual('Projector');
  });

  // Additional tests for validations and relationships
});
