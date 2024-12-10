
    import { getRepository } from 'typeorm';
    import { Truck } from '../entities/Truck';

    describe('Truck CRUD Operations', () => {
        it('should create a truck', async () => {
            const truckRepo = getRepository(Truck);
            const newTruck = truckRepo.create({ brand: 'Volvo', load: 1000 });
            const savedTruck = await truckRepo.save(newTruck);
            expect(savedTruck.id).toBeDefined();
            expect(savedTruck.brand).toEqual('Volvo');
        });
    });
    