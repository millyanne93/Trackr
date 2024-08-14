const mongoose = require('mongoose');
const connectDB = require('../../config/database');

describe('Database Connection', () => {
  it('should connect to the database successfully', async () => {
    const mockConnect = jest.spyOn(mongoose, 'connect').mockResolvedValue({});
    await connectDB();
    expect(mockConnect).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
    mockConnect.mockRestore();
  });

  it('should handle connection errors', async () => {
    const mockConnect = jest.spyOn(mongoose, 'connect').mockRejectedValue(new Error('Connection failed'));
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

    await connectDB();

    expect(mockConnect).toHaveBeenCalled();
    expect(mockExit).toHaveBeenCalledWith(1);

    mockConnect.mockRestore();
    mockExit.mockRestore();
  });
});
