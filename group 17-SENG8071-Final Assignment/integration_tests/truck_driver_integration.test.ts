
    import { getRepository } from 'typeorm';
    import { Truck } from '../entities/Truck';
    import { Driver } from '../entities/Driver';

    describe('Integration Test: Truck and Driver', () => {
        it('should assign a driver to a truck', async () => {
            const truckRepo = getRepository(Truck);
            const driverRepo = getRepository(Driver);
            const truck = await truckRepo.save({ brand: 'Scania', load: 1200 });
            const driver = await driverRepo.save({ name: 'John', surname: 'Doe' });
            
            truck.driver = driver;
            const updatedTruck = await truckRepo.save(truck);
            expect(updatedTruck.driver.id).toEqual(driver.id);
        });
    });
    