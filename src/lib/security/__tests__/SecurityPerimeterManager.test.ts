import { SecurityPerimeterManager, SecurityConfig } from '../SecurityPerimeterManager';

describe('SecurityPerimeterManager', () => {
  const mockConfig: SecurityConfig = {
    version: 1,
    providerId: 'provider-test-123',
    sourceOrigin: 'http://localhost:5173',
    maxLimit: { proportion: 0.64 },
    savedAt: '2026-10-03T21:24:27.442Z',
  };

  it('should initialize with the correct configuration', () => {
    const manager = new SecurityPerimeterManager(mockConfig);
    expect(manager.getConfig()).toEqual(mockConfig);
  });

  it('should update the configuration correctly', () => {
    const manager = new SecurityPerimeterManager(mockConfig);
    manager.updateConfig({ version: 2 });
    expect(manager.getConfig().version).toBe(2);
    expect(manager.getConfig().providerId).toBe('provider-test-123');
  });
});
