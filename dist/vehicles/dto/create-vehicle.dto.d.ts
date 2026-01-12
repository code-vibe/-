export declare class CreateVehicleDto {
    vin: string;
    make: string;
    model: string;
    year: number;
    mileage?: number;
    condition?: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    fuelType?: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG' | 'LPG';
    transmission?: 'Manual' | 'Automatic' | 'CVT';
    engineSize?: number;
    color?: string;
    doors?: number;
    bodyType?: 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Convertible' | 'Wagon' | 'Truck' | 'Van';
    features?: string[];
    location?: string;
    currentOwner?: string;
    previousOwners?: number;
    hasAccidentHistory?: boolean;
    hasServiceHistory?: boolean;
    registrationStatus?: 'Active' | 'Expired' | 'Suspended' | 'Unknown';
    insuranceStatus?: 'Insured' | 'Uninsured' | 'Unknown';
}
